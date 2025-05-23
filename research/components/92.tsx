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
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isHtml = value.format === "html";
  const displayBody =
    value.body.length > 300 ? value.body.slice(0, 300) + "…" : value.body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Timestamp */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>{formattedDate}</span>
      </div>

      {/* Comment Body */}
      <div className="mb-4 prose prose-sm max-w-none text-gray-800">
        {isHtml ? (
          <div
            className="prose-sm"
            dangerouslySetInnerHTML={{ __html: value.body }}
          />
        ) : (
          <pre className="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded">
            {displayBody}
          </pre>
        )}
      </div>

      {/* Attachments */}
      {value.files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Attachments
          </h4>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || file.url.split("/").pop() || "attachment";
              return (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-600"
                >
                  <LucideReact.FileText
                    size={16}
                    className="text-indigo-500 mr-2 shrink-0"
                  />
                  <span className="truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
