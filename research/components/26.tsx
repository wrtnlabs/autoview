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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatColors: Record<AutoViewInput['format'], string> = {
    html: 'bg-purple-100 text-purple-800',
    md: 'bg-blue-100 text-blue-800',
    txt: 'bg-gray-100 text-gray-800',
  };
  const badgeClass = formatColors[value.format] || 'bg-gray-100 text-gray-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <time dateTime={value.created_at} className="text-gray-500 text-xs">
          {formattedDate}
        </time>
        <span
          className={`mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-semibold rounded ${badgeClass}`}
        >
          {value.format.toUpperCase()}
        </span>
      </div>

      <div className="mt-3 text-gray-800 text-sm whitespace-pre-wrap break-words line-clamp-4">
        {value.body}
      </div>

      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Attachments</h3>
          <div className="flex flex-wrap gap-2">
            {value.files.map((file, idx) => {
              const fileName = `${file.name}${file.extension ? `.${file.extension}` : ''}`;
              return (
                <div
                  key={idx}
                  className="flex items-center px-3 py-1 bg-gray-100 rounded text-xs text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="truncate max-w-xs">{fileName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
