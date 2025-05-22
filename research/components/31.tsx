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
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const formatLabel = value.format.toUpperCase();
  const hasAttachments = Array.isArray(value.files) && value.files.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <header className="flex justify-between items-center mb-3">
        <time className="text-gray-500 text-sm">{formattedDate}</time>
        <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
          {formatLabel}
        </span>
      </header>

      <section className="text-gray-800 text-sm mb-4">
        <p className="overflow-hidden line-clamp-3">{value.body}</p>
      </section>

      {hasAttachments && (
        <footer>
          <h4 className="text-gray-700 text-sm font-medium mb-2">Attachments</h4>
          <ul className="flex flex-wrap gap-2">
            {value.files.map((file, idx) => {
              const ext = file.extension ? `.${file.extension}` : "";
              const displayName = `${file.name}${ext}`;
              return (
                <li
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {displayName}
                </li>
              );
            })}
          </ul>
        </footer>
      )}
    </article>
  );
}
