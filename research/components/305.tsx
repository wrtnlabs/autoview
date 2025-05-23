import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface ALREADY_CREATED_EMAIL {
        type: "business";
        result: false;
        code: 4001;
        data: "\uC774\uBBF8 \uC0DD\uC131\uB41C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4.";
    }
    export interface ALREADY_CREATED_PHONE_NUMBER {
        type: "business";
        result: false;
        code: 4013;
        data: "\uC774\uBBF8 \uC0DD\uC131\uB41C \uC804\uD654\uBC88\uD638\uC785\uB2C8\uB2E4.";
    }
    export interface ResponseForm_lt_DecodedUserToken_gt_ {
        result: true;
        code: 1000;
        requestToResponse?: string;
        data: AutoViewInputSubTypes.DecodedUserToken;
    }
    export interface DecodedUserToken {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ALREADY_CREATED_EMAIL | AutoViewInputSubTypes.ALREADY_CREATED_PHONE_NUMBER | AutoViewInputSubTypes.ResponseForm_lt_DecodedUserToken_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  if (!value.result) {
    // Business error case
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
        <LucideReact.AlertTriangle
          className="text-red-500 flex-shrink-0"
          size={24}
          aria-label="Error"
        />
        <div>
          <h2 className="text-red-800 font-semibold">Error {value.code}</h2>
          <p className="text-red-700">{value.data}</p>
        </div>
      </div>
    );
  }

  // Success case: decoded user token
  const user = value.data;
  const displayName = user.nickname
    ? `${user.name} (${user.nickname})`
    : user.name;
  const formattedBirth =
    user.birth && user.birth !== null
      ? new Date(user.birth).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mx-auto">
      <div className="flex items-center space-x-4">
        <LucideReact.User
          className="text-gray-600 flex-shrink-0"
          size={32}
          aria-label="User"
        />
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {displayName}
          </h1>
          <div className="flex items-center space-x-1 text-gray-500 text-sm truncate">
            <LucideReact.Mail size={16} />
            <span className="truncate">{user.email}</span>
          </div>
        </div>
      </div>
      {formattedBirth && (
        <div className="mt-4 flex items-center space-x-2 text-gray-600 text-sm">
          <LucideReact.Calendar size={16} />
          <span>Born on {formattedBirth}</span>
        </div>
      )}
    </div>
  );
}
