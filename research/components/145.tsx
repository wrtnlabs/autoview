import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryAnswer {
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
             * In other words, creation time or update time or article.
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
             * Title of article.
             *
             * @title Title of article
            */
            title: string;
            /**
             * Content body of article.
             *
             * @title Content body of article
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const formatLabel =
    value.format === 'html' ? 'HTML' :
    value.format === 'md'   ? 'Markdown' :
                              'Text';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-800 break-words">
          {value.title}
        </h2>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0 text-gray-500 text-sm">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{formattedDate}</span>
          <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
            {value.format === 'html' ? (
              <LucideReact.Code size={12} className="mr-1" />
            ) : value.format === 'md' ? (
              <LucideReact.FileCode size={12} className="mr-1" />
            ) : (
              <LucideReact.FileText size={12} className="mr-1" />
            )}
            {formatLabel}
          </span>
        </div>
      </div>
      <div className="text-gray-700 text-sm whitespace-pre-line line-clamp-3">
        {value.body}
      </div>
      {value.files.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Attachments
          </h3>
          <ul className="space-y-2">
            {value.files.map((file) => {
              const filename = file.name + (file.extension ? `.${file.extension}` : '');
              return (
                <li key={file.url} className="flex items-center space-x-2">
                  <LucideReact.File size={16} className="text-indigo-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {filename}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
