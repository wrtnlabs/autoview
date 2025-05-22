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
  const createdAt = new Date(value.created_at);
  const formattedDate = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Header: creation date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <LucideReact.Calendar size={16} />
        <time dateTime={value.created_at}>{formattedDate}</time>
      </div>

      {/* Comment Body */}
      {value.format === "html" ? (
        <div
          className="prose prose-sm max-w-none text-gray-800 mb-4"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      ) : (
        <div className="text-gray-800 whitespace-pre-wrap text-sm line-clamp-4 mb-4">
          {value.body}
        </div>
      )}

      {/* Attachments List */}
      {value.files.length > 0 && (
        <div className="mt-2">
          <h4 className="flex items-center gap-1 text-gray-700 text-sm font-medium mb-2">
            <LucideReact.Paperclip size={16} className="text-gray-500" />
            <span>Attachments</span>
          </h4>
          <div className="space-y-2">
            {value.files.map((file, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <LucideReact.FileText
                  size={16}
                  className="text-indigo-500 mt-1"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">
                    {file.name}
                    {file.extension ? `.${file.extension}` : ""}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {file.url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
