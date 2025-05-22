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
  // Error view
  if (!value.result) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700 flex items-start gap-2">
        <LucideReact.AlertTriangle
          className="mt-1"
          size={20}
          color="currentColor"
        />
        <div>
          <p className="font-semibold">Error {value.code}</p>
          <p className="mt-1">{value.data}</p>
        </div>
      </div>
    );
  }

  // Successful profile view
  const profile = value.data;
  const profileImageFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name,
  )}&background=0D8ABC&color=fff`;
  const coverImageFallback =
    "https://placehold.co/600x200/E2E8F0/1E293B?text=Cover";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = profileImageFallback;
  };
  const handleCoverError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = coverImageFallback;
  };

  const formattedBirth = profile.birth
    ? new Date(profile.birth).toLocaleDateString()
    : null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden max-w-sm mx-auto">
      <div className="w-full h-32 overflow-hidden">
        <img
          src={profile.coverImage ?? coverImageFallback}
          alt={`${profile.name} cover`}
          onError={handleCoverError}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <div className="relative -mt-12">
            <img
              src={profile.profileImage ?? profileImageFallback}
              alt={profile.name}
              onError={handleImageError}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.name}
              </h2>
              {profile.myself && (
                <LucideReact.CheckCircle className="text-blue-500" size={18} />
              )}
            </div>
            {profile.nickname && (
              <p className="text-sm text-gray-500">@{profile.nickname}</p>
            )}
            {value.requestToResponse && (
              <p className="text-xs text-gray-400 mt-1">
                Req ID: {value.requestToResponse}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Mail className="text-gray-400 mr-2" size={16} />
            <span className="break-all">{profile.email}</span>
          </div>
          {formattedBirth && (
            <div className="flex items-center">
              <LucideReact.Calendar className="text-gray-400 mr-2" size={16} />
              <span>{formattedBirth}</span>
            </div>
          )}
          <div className="flex items-center">
            <LucideReact.User className="text-gray-400 mr-2" size={16} />
            <span>ID: {profile.id}</span>
          </div>
          {profile.introduce && (
            <div>
              <p className="text-gray-700 line-clamp-3">{profile.introduce}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
