import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryAnswer {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.ISnapshot;



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

  const maxBodyLength = 200;
  const truncatedBody =
    value.body.length > maxBodyLength
      ? value.body.slice(0, maxBodyLength) + "…"
      : value.body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        <time className="text-sm text-gray-500">{formattedDate}</time>
        <p className="text-gray-700 text-sm whitespace-pre-wrap">{truncatedBody}</p>
        {value.files.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">
              Attachments
            </h3>
            <ul className="space-y-1">
              {value.files.map((file, idx) => {
                const fileName = file.extension
                  ? `${file.name}.${file.extension}`
                  : file.name;
                return (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 truncate"
                    title={fileName}
                  >
                    📎 {fileName}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
