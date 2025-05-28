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
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const fileCount = value.files.length;
  const hasAttachments = fileCount > 0;

  type IconType = React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    title?: string;
  }>;

  const FormatIcon: IconType =
    value.format === "html"
      ? LucideReact.Code
      : value.format === "md"
      ? LucideReact.FileText
      : LucideReact.AlignLeft;

  // Choose how to render the body based on the format
  const bodyContent: React.ReactNode =
    value.format === "html" ? (
      <div
        className="prose max-w-full text-gray-800 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: value.body }}
      />
    ) : (
      <pre className="whitespace-pre-wrap text-gray-800 text-sm line-clamp-3">
        {value.body}
      </pre>
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-md mx-auto">
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <LucideReact.MessageSquare
          size={16}
          className="mr-1 flex-shrink-0"
          aria-hidden="true"
        />
        <span>Commented on {formattedDate}</span>
        <span className="ml-4 flex items-center">
          <FormatIcon
            size={16}
            className="mr-1 text-gray-400 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="capitalize">{value.format}</span>
        </span>
      </div>

      <div className="mb-3">{bodyContent}</div>

      {hasAttachments && (
        <div className="mt-2">
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <LucideReact.Paperclip
              size={16}
              className="mr-1 flex-shrink-0"
              aria-hidden="true"
            />
            <span>Attachments ({fileCount})</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {value.files.map((file, idx) => (
              <li key={idx} className="flex items-center">
                <LucideReact.FileText
                  size={14}
                  className="mr-1 text-indigo-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {file.name}
                  {file.extension ? `.${file.extension}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
