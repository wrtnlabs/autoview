import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleReview {
        /**
         * Snapshot content of the review article.
        */
        export type ISnapshot = {
            /**
             * Score of the review.
             *
             * @title Score of the review
            */
            score: number;
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleReview.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const dateObj = new Date(value.created_at);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{value.title}</h2>
        <span className="flex items-center text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          <span className="mr-1">★</span>
          {value.score}
        </span>
      </div>
      <time
        dateTime={value.created_at}
        className="block text-sm text-gray-500 mt-1"
      >
        {formattedDate} at {formattedTime}
      </time>
      <p className="text-gray-700 mt-4 line-clamp-3">{value.body}</p>
      {value.files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Attachments ({value.files.length})
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li key={idx} className="text-sm text-gray-600">
                  <div className="font-medium">{fileName}</div>
                  <div className="text-xs text-gray-500 truncate">{file.url}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
