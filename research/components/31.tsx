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
  const formatLabel = value.format.toUpperCase();

  // Helper to render the comment body according to its format
  function renderBody() {
    if (value.format === "html") {
      return (
        <div
          className="prose prose-sm text-gray-800 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    // For md or txt, preserve line breaks and clamp if too long
    return (
      <div className="text-gray-800 text-sm whitespace-pre-wrap line-clamp-4 overflow-hidden">
        {value.body}
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Header: date and format */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        <span className="text-xs font-medium uppercase px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
          {formatLabel}
        </span>
      </div>

      {/* Comment Body */}
      <div>{renderBody()}</div>

      {/* Attachments */}
      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-sm font-semibold mb-2">
            Attachments
          </h3>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const label = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <LucideReact.FileText
                    size={16}
                    className="mr-2 text-indigo-500"
                  />
                  <span className="truncate">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
