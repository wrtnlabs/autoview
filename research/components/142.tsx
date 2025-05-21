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
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatLabel =
    value.format === 'html'
      ? 'HTML'
      : value.format === 'md'
      ? 'Markdown'
      : 'Text';

  // 2. Helper to render the comment body with truncation for mobile-friendly display
  const renderBody = () => {
    const baseClass = 'mt-2 text-gray-800 text-sm leading-relaxed overflow-hidden';
    if (value.format === 'html') {
      return (
        <div
          className={`${baseClass} line-clamp-3`}
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    return (
      <p className={`${baseClass} line-clamp-3`}>
        {value.body}
      </p>
    );
  };

  // 3. Return the React element composing the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-xs">{formattedDate}</span>
        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
          {formatLabel}
        </span>
      </div>

      {renderBody()}

      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-sm font-medium">Attachments</h3>
          <ul className="mt-2 space-y-1">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li key={idx}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {fileName}
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
