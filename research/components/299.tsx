import React from "react";
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

  // Helper to abbreviate large numbers (e.g., 1500 -> "1.5K")
  const formatNumber = (num: number): string =>
    num >= 1000 ? `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K` : num.toString();

  // Total contributions (questions + answers + writings)
  const totalContributions = question + answer + writing;

  // Acceptance rate of answers (adopted/answer * 100)
  const acceptanceRate =
    answer > 0 ? `${((adopted / answer) * 100).toFixed(1)}%` : 'N/A';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Statistics</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-indigo-600">
            {formatNumber(question)}
          </div>
          <div className="text-sm text-gray-500">Questions</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-indigo-600">
            {formatNumber(answer)}
          </div>
          <div className="text-sm text-gray-500">Answers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-indigo-600">
            {formatNumber(writing)}
          </div>
          <div className="text-sm text-gray-500">Writings</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-indigo-600">
            {formatNumber(likes)}
          </div>
          <div className="text-sm text-gray-500">Likes</div>
        </div>
      </div>
      <div className="mt-4 border-t pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">Total Contributions</div>
        <div className="text-lg font-medium text-gray-800">
          {formatNumber(totalContributions)}
        </div>
      </div>
      <div className="mt-2 border-t pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">Acceptance Rate</div>
        <div className="text-lg font-medium text-gray-800">{acceptanceRate}</div>
      </div>
    </div>
  );
}
