import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CANNOT_FIND_ONE_REPLY_COMMENT {
        type: "business";
        result: false;
        code: 4012;
        data: "\uB2F5\uAE00\uC744 \uB2EC \uB313\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
    }
    export interface NOT_FOUND_ARTICLE_TO_COMMENT {
        type: "business";
        result: false;
        code: 4006;
        data: "\uB313\uAE00\uC744 \uC791\uC131\uD560 \uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
    }
    export interface TOO_MANY_REPORTED_ARTICLE {
        type: "business";
        result: false;
        code: 4007;
        data: "\uC2E0\uACE0\uAC00 \uC811\uC218\uB41C \uAC8C\uC2DC\uAE00\uC774\uB77C \uB313\uAE00 \uC791\uC131\uC774 \uBD88\uAC00\uB2A5\uD569\uB2C8\uB2E4.";
    }
    export interface CANNOT_FIND_IMAGE_TO_LEFT_COMMENT {
        type: "business";
        result: false;
        code: 4019;
        data: "\uB313\uAE00\uC744 \uB0A8\uAE38 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
    }
    export namespace ResponseForm_lt_CommentType {
        export interface CreateResponse_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.CommentType.CreateResponse;
        }
    }
    export namespace CommentType {
        export interface CreateResponse {
            id: number;
            /**
             * 작성자의 아이디
            */
            writerId: number & tags.Type<"int32">;
            /**
             * 게시글 내용
            */
            contents: string;
            /**
             * 이미지의 아이디로 없을 수도 있다.
             * 없는 경우에는 그 게시글에 달린 것으로, xPosition, yPosition을 무시한다.
            */
            imageId?: number | null;
            /**
             * '부모 댓글이 있는 경우, 즉 답글인 경우에는 부모 댓글 아이디를 받는다.'
            */
            parentId?: (number & tags.Type<"int32">) | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            xPosition?: string | number | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            yPosition?: string | number | null;
            /**
             * 댓글이 달린 게시글의 아이디
            */
            articleId: number & tags.Type<"int32">;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CANNOT_FIND_ONE_REPLY_COMMENT | AutoViewInputSubTypes.NOT_FOUND_ARTICLE_TO_COMMENT | AutoViewInputSubTypes.TOO_MANY_REPORTED_ARTICLE | AutoViewInputSubTypes.CANNOT_FIND_IMAGE_TO_LEFT_COMMENT | AutoViewInputSubTypes.ResponseForm_lt_CommentType.CreateResponse_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const isError = value.result === false;

  if (isError) {
    const { type, code, data } = value;
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <LucideReact.AlertTriangle className="text-red-500" size={20} />
          <h3 className="text-red-700 font-medium">Error: {type}</h3>
        </div>
        <p className="mt-2 text-sm text-red-600">Code: {code}</p>
        <p className="mt-1 text-sm text-red-600">{data}</p>
      </div>
    );
  }

  // Success (CreateResponse) case
  const { code, requestToResponse, data } = value;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
      <div className="flex items-center space-x-2">
        <LucideReact.CheckCircle className="text-green-500" size={20} />
        <h3 className="text-green-700 font-medium">Reply Created</h3>
      </div>
      <div className="text-sm text-gray-700 space-y-2">
        <p>Code: {code}</p>
        {requestToResponse && (
          <p className="flex items-center space-x-1">
            <LucideReact.ArrowUpLeft size={16} className="text-gray-500" />
            <span>In reply to: {requestToResponse}</span>
          </p>
        )}
        <p className="flex items-center space-x-1">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <span>ID: {data.id}</span>
        </p>
        <p className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-500" />
          <span>Writer ID: {data.writerId}</span>
        </p>
        <div>
          <p className="font-medium">Content:</p>
          <p className="mt-1 text-gray-800 line-clamp-3">{data.contents}</p>
        </div>
        {data.imageId != null && (
          <p className="flex items-center space-x-1">
            <LucideReact.Image size={16} className="text-gray-500" />
            <span>Image ID: {data.imageId}</span>
            {data.xPosition != null && data.yPosition != null && (
              <span className="ml-2 text-xs text-gray-500">
                ({data.xPosition}, {data.yPosition})
              </span>
            )}
          </p>
        )}
        {data.parentId != null && (
          <p className="flex items-center space-x-1">
            <LucideReact.CornerUpLeft size={16} className="text-gray-500" />
            <span>Parent ID: {data.parentId}</span>
          </p>
        )}
        <p className="flex items-center space-x-1">
          <LucideReact.FileText size={16} className="text-gray-500" />
          <span>Article ID: {data.articleId}</span>
        </p>
      </div>
    </div>
  );
}
