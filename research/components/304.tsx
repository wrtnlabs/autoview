import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FIND_DESIGNER_PROFILE = {
    type: "business";
    result: false;
    code: 4018;
    data: "\uB514\uC790\uC774\uB108\uC758 \uD504\uB85C\uD544\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
  };
  export namespace ResponseForm_lt_UserType {
    export type DetailProfileWithRelation_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.UserType.DetailProfileWithRelation;
    };
  }
  export namespace UserType {
    export type DetailProfileWithRelation = {
      followStatus: "follow" | "followUp" | "reverse" | "nothing";
      /**
       * 나 자신의 프로필인 경우에는 true, 아닌 경우에는 false로 나온다.
       */
      myself?: boolean;
      /**
       * 이름 칼럼으로 사용자의 이름을 의미
       */
      name: string;
      /**
       * 사용자의 별칭, 설정하지 않는 경우도 있다.
       */
      nickname: string;
      /**
       * 사용자의 이메일 주소로 로그인 시 필요
       */
      email: string;
      /**
       * 사용자의 생일을 의미하는 값
       */
      birth?: string | null;
      id: number;
      /**
       * 사용자의 프로필 이미지
       */
      profileImage?: string | null;
      /**
       * 사용자의 커버 이미지
       */
      coverImage?: string | null;
      introduce?: (string & tags.MaxLength<2000>) | null;
    };
  }
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FIND_DESIGNER_PROFILE
  | AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfileWithRelation_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = value.result === false;
  // For profile card
  const profile = !isError ? value.data : null;
  const formattedBirth = profile?.birth
    ? new Date(profile.birth).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const coverSrc =
    profile?.coverImage ||
    "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover";
  const avatarPlaceholder = profile
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.name,
      )}&background=0D8ABC&color=fff`
    : "";
  // Map followStatus to icon, color, label
  const FollowStatusDisplay = (() => {
    if (!profile) return null;
    switch (profile.followStatus) {
      case "follow":
        return (
          <div className="flex items-center text-green-600 text-sm">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            <span>Following</span>
          </div>
        );
      case "followUp":
        return (
          <div className="flex items-center text-amber-600 text-sm">
            <LucideReact.Clock size={16} className="mr-1" />
            <span>Requested</span>
          </div>
        );
      case "reverse":
        return (
          <div className="flex items-center text-blue-600 text-sm">
            <LucideReact.ArrowLeftRight size={16} className="mr-1" />
            <span>Mutual</span>
          </div>
        );
      case "nothing":
      default:
        return (
          <div className="flex items-center text-gray-500 text-sm">
            <LucideReact.UserPlus size={16} className="mr-1" />
            <span>No Connection</span>
          </div>
        );
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    return (
      <div className="p-6 flex flex-col items-center justify-center bg-white rounded-lg shadow-md max-w-sm mx-auto">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-4 text-center text-gray-600">{value.data}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
      {/* Cover Photo */}
      <div className="w-full h-32 bg-gray-200 overflow-hidden">
        <img
          src={coverSrc}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover";
          }}
        />
      </div>
      <div className="px-6 pb-6 pt-0 relative">
        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -mt-12">
          <img
            src={profile?.profileImage || avatarPlaceholder}
            alt={profile?.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = avatarPlaceholder;
            }}
          />
        </div>
        {/* Name & Tags */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {profile?.name}
            {profile?.myself && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs ml-2 px-2 py-1 rounded-full">
                You
              </span>
            )}
          </h2>
          <p className="text-gray-500 truncate">{profile?.nickname}</p>
        </div>
        {/* Contact & Details */}
        <div className="mt-4 space-y-2 text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-1">
            <LucideReact.Mail size={16} />
            <span className="truncate">{profile?.email}</span>
          </div>
          {formattedBirth && (
            <div className="flex items-center justify-center gap-1">
              <LucideReact.Calendar size={16} />
              <span>{formattedBirth}</span>
            </div>
          )}
        </div>
        {/* Introduction */}
        {profile?.introduce && (
          <p className="mt-4 text-gray-700 text-sm line-clamp-3">
            {profile.introduce}
          </p>
        )}
        {/* Follow Status */}
        <div className="mt-4 flex justify-center">{FollowStatusDisplay}</div>
      </div>
    </div>
  );
}
