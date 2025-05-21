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
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const bodyPreview =
    value.body.length > 300 ? value.body.slice(0, 300).trimEnd() + "…" : value.body;
  const formatLabel = value.format.toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
        {value.title}
      </h2>
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <time dateTime={value.created_at}>{formattedDate}</time>
        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {formatLabel}
        </span>
      </div>
      <p className="text-gray-700 text-sm mb-4 overflow-hidden text-ellipsis line-clamp-3 whitespace-pre-wrap">
        {bodyPreview}
      </p>
      {value.files.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Attachments</h3>
          <div className="flex flex-wrap gap-2">
            {value.files.map((file, index) => {
              const ext = file.extension ? `.${file.extension}` : "";
              const displayName = `${file.name}${ext}`;
              return (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {displayName}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
