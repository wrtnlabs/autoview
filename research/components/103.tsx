import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleReview {
        /**
         * Snapshot content of the review article.
        */
        export interface ISnapshot {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleReview.ISnapshot;



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
  const displayFormat = value.format.toUpperCase();
  const trimmedBody = value.body.trim();
  const truncatedBody =
    trimmedBody.length > 200 ? trimmedBody.slice(0, 200) + "…" : trimmedBody;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.title}
      </h2>
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <time className="ml-1">{formattedDate}</time>
        </div>
        <div className="flex items-center">
          <LucideReact.Star className="text-amber-400" size={16} />
          <span className="ml-1">{value.score}</span>
        </div>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
          {displayFormat}
        </span>
      </div>
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">{truncatedBody}</p>
      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Attachments</h3>
          <ul className="space-y-2">
            {value.files.map((file, index) => {
              const fileName =
                file.name + (file.extension ? `.${file.extension}` : "");
              return (
                <li
                  key={index}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <LucideReact.FileText
                    className="text-indigo-500"
                    size={16}
                  />
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
