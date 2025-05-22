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
  const hasAttachments = Array.isArray(value.files) && value.files.length > 0;

  // Helper to render the comment body based on its format
  const renderBody = () => {
    if (value.format === "html") {
      return (
        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    // For markdown or plain text, wrap in a pre tag for whitespace preservation
    return (
      <pre className="whitespace-pre-wrap break-words text-gray-800">
        {value.body}
      </pre>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Metadata: creation date */}
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>{formattedDate}</span>
      </div>

      {/* Comment body with line clamping to avoid overflow on small screens */}
      <div className="text-gray-800 mb-4 line-clamp-4">{renderBody()}</div>

      {/* Attachments list */}
      {hasAttachments && (
        <div className="mt-4">
          <h3 className="flex items-center text-gray-700 font-medium mb-2">
            <LucideReact.Paperclip className="mr-1" size={16} />
            Attachments
          </h3>
          <ul className="space-y-2">
            {value.files.map((file, index) => {
              const filename = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              return (
                <li key={index}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <LucideReact.FileText
                      className="mr-2 text-gray-500"
                      size={16}
                    />
                    <span className="truncate">{filename}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
