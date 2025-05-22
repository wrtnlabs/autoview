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
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year:   "numeric",
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
  const attachmentCount = value.files.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilizing semantic HTML and line‐clamp for text overflow control.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Date and Format Badge */}
      <div className="flex items-center justify-between">
        <time
          dateTime={value.created_at}
          className="text-gray-600 text-sm"
        >
          {formattedDate}
        </time>
        <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
          {value.format.toUpperCase()}
        </span>
      </div>

      {/* Body: Comment text with clamp */}
      <div className="text-gray-800 text-base whitespace-pre-wrap line-clamp-3 md:line-clamp-5">
        {value.body}
      </div>

      {/* Attachments: Conditionally render if present */}
      {attachmentCount > 0 && (
        <div className="flex flex-col space-y-2">
          <h4 className="text-gray-700 text-sm font-semibold">
            Attachments ({attachmentCount})
          </h4>
          <ul className="flex flex-wrap gap-2">
            {value.files.map((file, idx) => {
              // Build display name: handle empty name with extension (.gitignore)
              const fileName = file.extension
                ? file.name
                  ? `${file.name}.${file.extension}`
                  : `.${file.extension}`
                : file.name;
              return (
                <li key={idx}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {fileName || "attachment"}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
