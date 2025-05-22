import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.ISnapshot;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  function stripHTML(html: string): string {
    return html.replace(/<[^>]+>/g, "");
  }
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const rawText = value.format === "html" ? stripHTML(value.body) : value.body;
  const attachmentCount = value.files.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{value.title}</h2>
        <div className="flex items-center text-gray-500 text-sm mt-1 sm:mt-0">
          <LucideReact.Calendar
            className="mr-1"
            size={16}
            aria-label="Created at"
          />
          <span>{formattedDate}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap mb-4">
        {rawText}
      </p>
      {attachmentCount > 0 && (
        <div>
          <div className="flex items-center text-gray-800 text-sm font-medium mb-2">
            <LucideReact.FileText
              className="mr-2 text-indigo-500"
              size={16}
              aria-label="Attachments"
            />
            <span>Attachments ({attachmentCount})</span>
          </div>
          <ul className="space-y-1">
            {value.files.map((file) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li
                  key={file.url}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <LucideReact.FileText
                    className="mr-2 text-gray-400"
                    size={16}
                    aria-hidden="true"
                  />
                  <span>{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
