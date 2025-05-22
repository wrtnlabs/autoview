import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type ALREADY_CREATED_EMAIL = {
    type: "business";
    result: false;
    code: 4001;
    data: "\uC774\uBBF8 \uC0DD\uC131\uB41C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4.";
  };
  export type ALREADY_CREATED_PHONE_NUMBER = {
    type: "business";
    result: false;
    code: 4013;
    data: "\uC774\uBBF8 \uC0DD\uC131\uB41C \uC804\uD654\uBC88\uD638\uC785\uB2C8\uB2E4.";
  };
  export type ResponseForm_lt_DecodedUserToken_gt_ = {
    result: true;
    code: 1000;
    requestToResponse?: string;
    data: AutoViewInputSubTypes.DecodedUserToken;
  };
  export type DecodedUserToken = {
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
  };
}
export type AutoViewInput =
  | AutoViewInputSubTypes.ALREADY_CREATED_EMAIL
  | AutoViewInputSubTypes.ALREADY_CREATED_PHONE_NUMBER
  | AutoViewInputSubTypes.ResponseForm_lt_DecodedUserToken_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isError = !value.result;
  // Handle error cases (business validation failures)
  if (isError) {
    const { code, data: message } = value as
      | AutoViewInputSubTypes.ALREADY_CREATED_EMAIL
      | AutoViewInputSubTypes.ALREADY_CREATED_PHONE_NUMBER;
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
        <div className="flex items-center text-red-700">
          <LucideReact.AlertTriangle size={20} className="mr-2 flex-shrink-0" />
          <span className="font-medium">Error {code}</span>
        </div>
        <p className="mt-2 text-red-700">{message}</p>
      </div>
    );
  }

  // Handle successful user-token response
  const response =
    value as AutoViewInputSubTypes.ResponseForm_lt_DecodedUserToken_gt_;
  const user = response.data;
  const fullName = user.name;
  const nickname = user.nickname ? user.nickname : null;
  const formattedBirth =
    user.birth && !["", null].includes(user.birth)
      ? new Date(user.birth!).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName,
  )}&background=0D8ABC&color=fff&size=128`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden mx-auto p-6 flex flex-col items-center text-gray-800">
      <div className="w-24 h-24 mb-4">
        <img
          src={avatarUrl}
          alt={`Avatar of ${fullName}`}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/100x100/e2e8f0/1e293b?text=User";
          }}
        />
      </div>
      <h2 className="text-xl font-semibold truncate">{fullName}</h2>
      {nickname && (
        <p className="text-gray-500 text-sm truncate">@{nickname}</p>
      )}
      <div className="mt-4 w-full space-y-2">
        <div className="flex items-center text-gray-600">
          <LucideReact.Mail size={16} className="mr-2 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        {formattedBirth && (
          <div className="flex items-center text-gray-600">
            <LucideReact.Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{formattedBirth}</span>
          </div>
        )}
      </div>
    </div>
  );
}
