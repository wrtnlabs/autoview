import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FIND_DESIGNER_PROFILE {
        type: "business";
        result: false;
        code: 4018;
        data: "\uB514\uC790\uC774\uB108\uC758 \uD504\uB85C\uD544\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
    }
    export namespace ResponseForm_lt_UserType {
        export interface DetailProfile_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.UserType.DetailProfile;
        }
    }
    export namespace UserType {
        export interface DetailProfile {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FIND_DESIGNER_PROFILE | AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfile_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if the response is an error
  const isError = value.result === false;

  if (isError) {
    // CANNOT_FIND_DESIGNER_PROFILE case
    const { code, data: message } = value as AutoViewInputSubTypes.CANNOT_FIND_DESIGNER_PROFILE;
    return (
      <div className="max-w-sm mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <LucideReact.AlertTriangle className="text-red-500" size={24} />
        <div>
          <h3 className="text-red-700 font-semibold">Error {code}</h3>
          <p className="text-red-600 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  // Successful DetailProfile case
  const profile = (value as AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfile_gt_).data;

  // Derived/fallback URLs
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name
  )}&background=0D8ABC&color=fff`;
  const coverFallback = `https://placehold.co/600x200/e2e8f0/1e293b?text=Cover`;

  // Format birth date if available
  const birthDate = profile.birth ? new Date(profile.birth).toLocaleDateString() : null;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover image (hidden on small screens) */}
      <div className="hidden md:block w-full h-32 bg-gray-200">
        <img
          src={profile.coverImage || coverFallback}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = coverFallback;
          }}
        />
      </div>

      {/* Avatar and basic info */}
      <div className="p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img
            src={profile.profileImage || avatarFallback}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
          />
        </div>
        <h2 className="mt-2 text-xl font-semibold text-gray-800">{profile.name}</h2>
        {profile.nickname && <p className="text-sm text-gray-500">@{profile.nickname}</p>}
        {profile.myself && (
          <span className="mt-1 inline-flex items-center text-sm text-green-600">
            <LucideReact.CheckCircle size={16} className="mr-1" />
            You
          </span>
        )}
      </div>

      {/* Contact & additional details */}
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.Mail size={16} />
          <span className="ml-1 truncate">{profile.email}</span>
        </div>
        {birthDate && (
          <div className="flex items-center text-gray-600 text-sm">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">{birthDate}</span>
          </div>
        )}
        {profile.introduce && (
          <p className="text-sm text-gray-700 line-clamp-3">{profile.introduce}</p>
        )}
      </div>
    </div>
  );
}
