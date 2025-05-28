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
  // Hook states to handle image load errors
  const [coverError, setCoverError] = React.useState<boolean>(false);
  const [avatarError, setAvatarError] = React.useState<boolean>(false);

  // 1. Error case: display a friendly message when profile is not found
  if (!value.result) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg"
      >
        <LucideReact.AlertTriangle className="text-red-500" size={48} />
        <p className="mt-4 text-red-700 text-center">{value.data}</p>
      </div>
    );
  }

  // 2. Profile case: destructure profile data
  const profile = value.data;
  // Fallback cover image
  const coverSrc: string =
    !profile.coverImage || coverError
      ? "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover"
      : profile.coverImage;
  // Fallback avatar image
  const avatarSrc: string =
    !profile.profileImage || avatarError
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.name
        )}&background=0D8ABC&color=fff`
      : profile.profileImage;
  // Format birth date if available
  const birthDate: string | null =
    profile.birth != null
      ? new Date(profile.birth).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  // 3. Render profile card
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <div className="h-32 bg-gray-200">
          <img
            src={coverSrc}
            alt="Cover image"
            className="w-full h-full object-cover"
            onError={() => setCoverError(true)}
          />
        </div>
        {/* Avatar */}
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full ring-4 ring-white overflow-hidden bg-gray-200">
            <img
              src={avatarSrc}
              alt="Profile image"
              className="w-full h-full object-cover"
              onError={() => setAvatarError(true)}
            />
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="pt-16 pb-6 px-6 text-center">
        {/* Name & Myself Indicator */}
        <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
          {profile.name}
          {profile.myself && (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              role="img"
              aria-label="Your Profile"
            />
          )}
        </h2>
        {/* Nickname */}
        <p className="text-gray-600 truncate">{profile.nickname}</p>

        {/* Contact & Birth */}
        <div className="mt-4 space-y-2 text-left">
          <div className="flex items-center gap-2 text-gray-700">
            <LucideReact.Mail size={16} className="text-gray-500" />
            <span className="truncate">{profile.email}</span>
          </div>
          {birthDate && (
            <div className="flex items-center gap-2 text-gray-700">
              <LucideReact.Calendar size={16} className="text-gray-500" />
              <span>{birthDate}</span>
            </div>
          )}
        </div>

        {/* Introduction */}
        {profile.introduce && (
          <p className="mt-4 text-gray-700 text-left line-clamp-3">
            {profile.introduce}
          </p>
        )}
      </div>
    </div>
  );
}
