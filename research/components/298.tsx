import LucideReact from "lucide-react";
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
    export type DetailProfile_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.UserType.DetailProfile;
    };
  }
  export namespace UserType {
    export type DetailProfile = {
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
  | AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfile_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if the input is an error response
  const isError = !value.result;

  if (isError) {
    // Render error message card
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
        <LucideReact.AlertTriangle className="text-red-500" size={20} />
        <span className="text-red-700 font-medium">
          {(value as AutoViewInputSubTypes.CANNOT_FIND_DESIGNER_PROFILE).data}
        </span>
      </div>
    );
  }

  // It's a successful detail profile response
  const profile = (
    value as AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfile_gt_
  ).data;

  // Derived display values
  const displayName = profile.nickname
    ? `${profile.nickname} (${profile.name})`
    : profile.name;
  const formattedBirth = profile.birth
    ? new Date(profile.birth).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  // Image URLs with fallbacks
  const coverUrl =
    profile.coverImage ??
    "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover";
  const avatarUrl =
    profile.profileImage ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0D8ABC&color=fff`;

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="h-40 w-full">
        <img
          src={coverUrl}
          alt="Cover image"
          className="w-full h-full object-cover"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover")
          }
        />
      </div>

      {/* Profile Content */}
      <div className="relative p-4 pt-0">
        {/* Avatar */}
        <div className="absolute -top-10 left-4">
          <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-gray-100">
            <img
              src={avatarUrl}
              alt="Profile image"
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.name,
                  )}&background=0D8ABC&color=fff`)
              }
            />
          </div>
        </div>

        {/* Textual Information */}
        <div className="mt-10 ml-24">
          {/* Name and "You" Badge */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {displayName}
            </h2>
            {profile.myself && (
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                You
              </span>
            )}
          </div>

          {/* Email and Birth Date */}
          <div className="mt-2 space-y-1 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <LucideReact.Mail className="text-gray-400" size={16} />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <span>{formattedBirth}</span>
            </div>
          </div>

          {/* Introduction */}
          {profile.introduce && (
            <p className="mt-3 text-gray-700 text-sm line-clamp-3">
              {profile.introduce}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
