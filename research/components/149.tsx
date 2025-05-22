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
  const formattedDate =
    date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const formatBadge = {
    html: 'HTML',
    md: 'Markdown',
    txt: 'Text',
  }[value.format];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{formattedDate}</span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
          {formatBadge}
        </span>
      </div>
      <div className="mt-2 text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap">
        {value.body}
      </div>
      {value.files && value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-sm font-medium mb-2">Attachments</h3>
          <ul className="space-y-2">
            {value.files.map((file, index) => {
              const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
              return (
                <li key={index} className="flex items-center text-gray-600 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16.5 7.5L7.5 16.5M9 3h6a6 6 0 016 6v6a6 6 0 01-6 6H8a4 4 0 01-4-4V8a4 4 0 014-4h1"
                    />
                  </svg>
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
