import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingSaleInquiryComment.ISnapshot;

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
  const fileCount = value.files.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const ui = (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      {/* Creation date and format badge */}
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>{formattedDate}</span>
        <span className="ml-auto px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
          {value.format.toUpperCase()}
        </span>
      </div>

      {/* Body content with HTML rendering or plain text, truncated for brevity */}
      <div className="text-gray-800 text-base mb-4 break-words line-clamp-4">
        {value.format === "html" ? (
          <div dangerouslySetInnerHTML={{ __html: value.body }} />
        ) : (
          <pre className="whitespace-pre-wrap">{value.body}</pre>
        )}
      </div>

      {/* Attachments list */}
      {fileCount > 0 && (
        <div className="border-t pt-3">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <LucideReact.FileText className="mr-1" size={16} />
            <span>Attachments ({fileCount})</span>
          </div>
          <ul className="space-y-1">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || "";
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <LucideReact.FileText
                    className="mr-2 text-indigo-500"
                    size={16}
                  />
                  <span className="truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  // 3. Return the React element.
  return ui;
}
