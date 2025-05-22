import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type CANNOT_FIND_ONE_REPLY_COMMENT = {
    type: "business";
    result: false;
    code: 4012;
    data: "\uB2F5\uAE00\uC744 \uB2EC \uB313\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
  };
  export type NOT_FOUND_ARTICLE_TO_COMMENT = {
    type: "business";
    result: false;
    code: 4006;
    data: "\uB313\uAE00\uC744 \uC791\uC131\uD560 \uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
  };
  export type TOO_MANY_REPORTED_ARTICLE = {
    type: "business";
    result: false;
    code: 4007;
    data: "\uC2E0\uACE0\uAC00 \uC811\uC218\uB41C \uAC8C\uC2DC\uAE00\uC774\uB77C \uB313\uAE00 \uC791\uC131\uC774 \uBD88\uAC00\uB2A5\uD569\uB2C8\uB2E4.";
  };
  export type CANNOT_FIND_IMAGE_TO_LEFT_COMMENT = {
    type: "business";
    result: false;
    code: 4019;
    data: "\uB313\uAE00\uC744 \uB0A8\uAE38 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC5B4\uC694.";
  };
  export namespace ResponseForm_lt_CommentType {
    export type CreateResponse_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.CommentType.CreateResponse;
    };
  }
  export namespace CommentType {
    export type CreateResponse = {
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
    };
  }
}
export type AutoViewInput =
  | AutoViewInputSubTypes.CANNOT_FIND_ONE_REPLY_COMMENT
  | AutoViewInputSubTypes.NOT_FOUND_ARTICLE_TO_COMMENT
  | AutoViewInputSubTypes.TOO_MANY_REPORTED_ARTICLE
  | AutoViewInputSubTypes.CANNOT_FIND_IMAGE_TO_LEFT_COMMENT
  | AutoViewInputSubTypes.ResponseForm_lt_CommentType.CreateResponse_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const isError = value.result === false;
  // For error cases, value.data is a string message
  // For success, value.data is CommentType.CreateResponse
  if (isError) {
    const errorMessage = value.data as string;
    const errorCode = value.code;
    // 2. Compose the visual structure for error
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center text-red-700">
          <LucideReact.AlertTriangle
            size={20}
            className="mr-2"
            aria-hidden="true"
          />
          <span className="font-semibold">Error {errorCode}</span>
        </div>
        <p className="mt-2 text-sm text-red-800">{errorMessage}</p>
      </div>
    );
  }

  // Success path: extract the response data
  const resp = value.data as AutoViewInputSubTypes.CommentType.CreateResponse;
  const {
    writerId,
    contents,
    imageId,
    parentId,
    xPosition,
    yPosition,
    articleId,
  } = resp;
  const hasPosition = xPosition != null && yPosition != null;
  const positionLabel = hasPosition ? `${xPosition}, ${yPosition}` : null;

  // 2. Compose the visual structure for success
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center text-green-700">
        <LucideReact.CheckCircle
          size={20}
          className="mr-2"
          aria-hidden="true"
        />
        <span className="font-semibold">Comment Created</span>
      </div>
      <div className="mt-3 space-y-2 text-gray-700 text-sm">
        <div className="flex items-center">
          <LucideReact.User
            size={16}
            className="text-gray-500 mr-2"
            aria-hidden="true"
          />
          <span>Writer ID: {writerId}</span>
        </div>
        <div className="flex items-start">
          <LucideReact.MessageSquare
            size={16}
            className="text-gray-500 mr-2 mt-1"
            aria-hidden="true"
          />
          <p className="break-words">{contents}</p>
        </div>
        {imageId != null && (
          <div className="flex items-center">
            <LucideReact.Image
              size={16}
              className="text-gray-500 mr-2"
              aria-hidden="true"
            />
            <span>Image ID: {imageId}</span>
          </div>
        )}
        {parentId != null && (
          <div className="flex items-center">
            <LucideReact.CornerUpLeft
              size={16}
              className="text-gray-500 mr-2"
              aria-hidden="true"
            />
            <span>Reply to Comment ID: {parentId}</span>
          </div>
        )}
        {hasPosition && (
          <div className="flex items-center">
            <LucideReact.MapPin
              size={16}
              className="text-gray-500 mr-2"
              aria-hidden="true"
            />
            <span>Position: {positionLabel}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Hash
            size={16}
            className="text-gray-500 mr-2"
            aria-hidden="true"
          />
          <span>Article ID: {articleId}</span>
        </div>
      </div>
    </div>
  );
}
