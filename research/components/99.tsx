import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryComment {
        /**
         * Snapshot content of the comment.
        */
        export type ISnapshot = {
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Creation time of snapshot record.
             *
             * In other words, creation time or update time or comment.
             *
             * @title Creation time of snapshot record
            */
            created_at: string;
            /**
             * Format of body.
             *
             * Same meaning with extension like `html`, `md`, `txt`.
             *
             * @title Format of body
            */
            format: "html" | "md" | "txt";
            /**
             * Content body of comment.
             *
             * @title Content body of comment
            */
            body: string;
            /**
             * List of attachment files.
             *
             * @title List of attachment files
            */
            files: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
        export type ICreate = {
            /**
             * File name, except extension.
             *
             * If there's file `.gitignore`, then its name is an empty string.
             *
             * @title File name, except extension
            */
            name: string;
            /**
             * Extension.
             *
             * Possible to omit like `README` case.
             *
             * @title Extension
            */
            extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
            /**
             * URL path of the real file.
             *
             * @title URL path of the real file
            */
            url: string;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryComment.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Strip HTML tags if format is html, otherwise keep body as-is.
  const safeBody =
    value.format === "html"
      ? value.body.replace(/<[^>]+>/g, "").trim()
      : value.body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Date */}
      <div className="text-sm text-gray-500 mb-2">
        Commented on {formattedDate}
      </div>

      {/* Body (truncated to 3 lines) */}
      <p className="text-gray-800 text-sm whitespace-pre-wrap line-clamp-3 mb-3">
        {safeBody}
      </p>

      {/* Attachments */}
      {value.files.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-700 mb-1">
            Attachments
          </div>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            {value.files.map((file, idx) => {
              const ext = file.extension ? `.${file.extension}` : "";
              const filename = `${file.name}${ext}`;
              return <li key={idx}>{filename}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
