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
        export interface DetailProfileWithRelation_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.UserType.DetailProfileWithRelation;
        }
    }
    export namespace UserType {
        export interface DetailProfileWithRelation {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FIND_DESIGNER_PROFILE | AutoViewInputSubTypes.ResponseForm_lt_UserType.DetailProfileWithRelation_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = value.result === false;
  const placeholderCover = "https://placehold.co/600x200/e2e8f0/1e293b?text=Cover";
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.result === true ? value.data.name : "User"
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isError) {
    // Error state presentation
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3 max-w-md mx-auto">
        <LucideReact.AlertTriangle className="flex-shrink-0 text-red-500" size={24} />
        <div>
          <h2 className="font-semibold">Error {value.code}</h2>
          <p className="mt-1 text-sm">{value.data}</p>
        </div>
      </div>
    );
  }

  // Success state: user profile presentation
  const profile = value.data;
  const formattedBirth = profile.birth
    ? new Date(profile.birth).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const statusMap = {
    follow: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      text: "Following",
    },
    followUp: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      text: "Requested",
    },
    reverse: {
      icon: <LucideReact.ArrowUpLeft className="text-blue-500" size={16} />,
      text: "Follows You",
    },
    nothing: {
      icon: <LucideReact.UserPlus className="text-gray-500" size={16} />,
      text: "Not Following",
    },
  } as const;

  const statusInfo = statusMap[profile.followStatus];

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gray-100">
        <img
          src={profile.coverImage || placeholderCover}
          alt="Cover Image"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderCover;
          }}
        />
      </div>

      <div className="p-4 flex flex-col items-center -mt-12">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100">
          <img
            src={profile.profileImage || placeholderAvatar}
            alt={profile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = placeholderAvatar;
            }}
          />
        </div>

        {/* Name & Nickname */}
        <h3 className="mt-4 text-lg font-semibold text-gray-900 truncate">{profile.name}</h3>
        {profile.nickname && (
          <p className="text-sm text-gray-500 truncate">@{profile.nickname}</p>
        )}

        {/* Email */}
        <div className="mt-3 flex items-center text-gray-600 text-sm">
          <LucideReact.Mail size={16} className="mr-1" />
          <span className="truncate">{profile.email}</span>
        </div>

        {/* Birth Date */}
        {formattedBirth && (
          <div className="mt-2 flex items-center text-gray-600 text-sm">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>{formattedBirth}</span>
          </div>
        )}

        {/* Follow Status */}
        <div className="mt-3 flex items-center text-sm">
          {statusInfo.icon}
          <span className="ml-1 text-gray-700">{statusInfo.text}</span>
        </div>

        {/* "Myself" Indicator */}
        {profile.myself && (
          <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            This is you
          </div>
        )}

        {/* Introduction */}
        {profile.introduce && (
          <p className="mt-4 text-sm text-gray-700 text-center line-clamp-3">
            {profile.introduce}
          </p>
        )}
      </div>
    </div>
  );
}
