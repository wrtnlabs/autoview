import * as LucideReact from "lucide-react";
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
    dateStyle: "medium",
    timeStyle: "short",
  });
  const displayFormat = value.format.toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header: creation date and format badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          <LucideReact.Calendar size={16} />
          <time dateTime={value.created_at} className="text-sm">
            {formattedDate}
          </time>
        </div>
        <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 uppercase">
          {displayFormat}
        </span>
      </div>

      {/* Body of the comment */}
      <div className="text-gray-800 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
        {value.body}
      </div>

      {/* Attachments list, if any */}
      {value.files && value.files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-gray-700 text-sm font-medium mb-2">
            Attachments
          </h4>
          <ul className="space-y-2">
            {value.files.map((file) => {
              const filename = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              return (
                <li key={file.url}>
                  <div className="flex items-center gap-2">
                    <LucideReact.FileText size={16} className="text-gray-500" />
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      {filename}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
