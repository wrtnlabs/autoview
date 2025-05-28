import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace Try_lt_UserType {
        export interface Retuation_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.UserType.Retuation;
        }
    }
    export namespace UserType {
        export interface Retuation {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.Try_lt_UserType.Retuation_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { question, answer, adopted, writing, likes } = value.data;
  const acceptanceRate = answer > 0 ? (adopted / answer) * 100 : 0;
  const formattedAcceptanceRate = acceptanceRate.toFixed(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Activity Summary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.HelpCircle className="text-blue-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Questions</span>
            <span className="block text-lg font-bold text-gray-900">{question}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.MessageSquare className="text-green-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Answers</span>
            <span className="block text-lg font-bold text-gray-900">{answer}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.CheckCircle className="text-purple-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Accepted</span>
            <span className="block text-lg font-bold text-gray-900">{adopted}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.Edit2 className="text-yellow-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Posts</span>
            <span className="block text-lg font-bold text-gray-900">{writing}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.Heart className="text-red-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Likes</span>
            <span className="block text-lg font-bold text-gray-900">{likes}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
          <LucideReact.Percent className="text-indigo-500" size={20} aria-hidden="true" />
          <div>
            <span className="block text-sm text-gray-500">Accept Rate</span>
            <span className="block text-lg font-bold text-gray-900">
              {formattedAcceptanceRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
