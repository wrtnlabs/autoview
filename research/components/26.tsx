import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryComment {
        /**
         * Snapshot content of the comment.
        */
        export interface ISnapshot {
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
        }
    }
    export namespace IAttachmentFile {
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryComment.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const formatLabel =
    value.format === "html"
      ? "HTML"
      : value.format === "md"
      ? "Markdown"
      : "Text";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400"
            aria-hidden="true"
          />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
          {formatLabel}
        </span>
      </div>

      <div className="mt-2 text-gray-800 whitespace-pre-line line-clamp-4 text-sm">
        {value.body}
      </div>

      {value.files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <LucideReact.FileText
                    size={16}
                    className="text-indigo-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="ml-2 truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
