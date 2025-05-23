import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IBbsArticle {
        /**
         * Snapshot of article.
         *
         * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
         * the article, as mentioned in {@link IBbsArticle}, the contents of the article
         * are separated from the article record to keep evidence and prevent fraud.
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
export type AutoViewInput = AutoViewInputSubTypes.IBbsArticle.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const renderFormatIcon = () => {
    switch (value.format) {
      case 'html':
        return (
          <LucideReact.Code
            size={16}
            className="text-indigo-500"
            aria-label="HTML format"
          />
        );
      case 'md':
        return (
          <LucideReact.FileText
            size={16}
            className="text-green-500"
            aria-label="Markdown format"
          />
        );
      case 'txt':
        return (
          <LucideReact.AlignLeft
            size={16}
            className="text-gray-500"
            aria-label="Text format"
          />
        );
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">{value.title}</h2>

      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400"
            aria-label="Creation date"
          />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          {renderFormatIcon()}
          <span className="capitalize">{value.format}</span>
        </div>
      </div>

      <p className="mt-4 text-gray-700 text-sm whitespace-pre-line line-clamp-4">
        {value.body}
      </p>

      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
            <LucideReact.Paperclip
              size={16}
              className="text-gray-500"
              aria-label="Attachments"
            />
            Attachments
          </h3>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const ext = file.extension ? `.${file.extension}` : '';
              const displayName = (file.name + ext) || 'Unnamed file';

              return (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <LucideReact.FileText
                    size={16}
                    className="text-gray-400"
                    aria-label="File"
                  />
                  <span className="truncate">{displayName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
