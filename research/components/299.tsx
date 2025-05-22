import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace Try_lt_UserType {
    export type Retuation_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.UserType.Retuation;
    };
  }
  export namespace UserType {
    export type Retuation = {
      /**
       * 지금까지 질문을 한 횟수로, 게시글과 무관하게 질문 횟수는 한 번 더 카운트해준다.
       */
      question: number;
      /**
       * 답변을 한 횟수
       */
      answer: number;
      /**
       * 최상위로 채택된 답변의 수로, 시간이 지남에 따라 변동될 수 있다
       */
      adopted: number;
      /**
       * 글을 작성한 수
       */
      writing: number;
      /**
       * 좋아요를 받은 수로, 게시글과 댓글 모두를 합한 것을 의미한다.
       */
      likes: number;
      id: number;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.Try_lt_UserType.Retuation_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { question, answer, adopted, writing, likes } = value.data;
  const totalContributions = question + answer + writing;
  const formatNumber = (num: number): string =>
    new Intl.NumberFormat().format(num);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        User Engagement Summary
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Questions Asked */}
        <div className="flex flex-col items-center">
          <LucideReact.HelpCircle
            size={24}
            className="text-blue-500 mb-1"
            aria-label="Questions asked"
          />
          <span className="text-lg font-medium text-gray-900">
            {formatNumber(question)}
          </span>
          <span className="text-sm text-gray-500">Questions</span>
        </div>

        {/* Answers Provided */}
        <div className="flex flex-col items-center">
          <LucideReact.MessageSquare
            size={24}
            className="text-indigo-500 mb-1"
            aria-label="Answers provided"
          />
          <span className="text-lg font-medium text-gray-900">
            {formatNumber(answer)}
          </span>
          <span className="text-sm text-gray-500">Answers</span>
        </div>

        {/* Adopted Answers */}
        <div className="flex flex-col items-center">
          <LucideReact.CheckCircle
            size={24}
            className="text-green-500 mb-1"
            aria-label="Adopted answers"
          />
          <span className="text-lg font-medium text-gray-900">
            {formatNumber(adopted)}
          </span>
          <span className="text-sm text-gray-500">Accepted</span>
        </div>

        {/* Posts Written */}
        <div className="flex flex-col items-center">
          <LucideReact.FileText
            size={24}
            className="text-yellow-500 mb-1"
            aria-label="Posts written"
          />
          <span className="text-lg font-medium text-gray-900">
            {formatNumber(writing)}
          </span>
          <span className="text-sm text-gray-500">Posts</span>
        </div>

        {/* Likes Received */}
        <div className="flex flex-col items-center">
          <LucideReact.ThumbsUp
            size={24}
            className="text-pink-500 mb-1"
            aria-label="Likes received"
          />
          <span className="text-lg font-medium text-gray-900">
            {formatNumber(likes)}
          </span>
          <span className="text-sm text-gray-500">Likes</span>
        </div>
      </div>

      {/* Optional summary */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
        <LucideReact.Users
          size={16}
          className="mr-1"
          aria-label="Total contributions"
        />
        <span>Total Contributions: {formatNumber(totalContributions)}</span>
      </div>
    </div>
  );
}
