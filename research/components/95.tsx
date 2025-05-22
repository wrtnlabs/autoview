import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IBbsArticle {
        /**
         * Snapshot of article.
         *
         * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
         * the article, as mentioned in {@link IBbsArticle}, the contents of the article
         * are separated from the article record to keep evidence and prevent fraud.
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
export type AutoViewInput = AutoViewInputSubTypes.IBbsArticle.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const plainBody =
    value.format === 'html'
      ? value.body.replace(/<[^>]+>/g, '')
      : value.body;
  const previewBody =
    plainBody.length > 200 ? `${plainBody.slice(0, 200)}…` : plainBody;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <time dateTime={value.created_at}>{displayDate}</time>
          <span className="px-2 py-0.5 ml-2 text-xs font-medium bg-gray-100 text-gray-800 rounded">
            {value.format.toUpperCase()}
          </span>
        </div>
      </header>

      <div className="text-gray-700 text-sm leading-relaxed line-clamp-4">
        {previewBody}
      </div>

      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Attachments
          </h3>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const fileName = `${file.name}${
                file.extension ? `.${file.extension}` : ''
              }`;
              return (
                <li key={idx} className="flex flex-col">
                  <span className="text-sm text-gray-700 truncate">
                    {fileName}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {file.url}
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
