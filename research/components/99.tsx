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
  // 1. Data aggregation/transformation
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatIcon = (() => {
    switch (value.format) {
      case "html":
        return (
          <LucideReact.FileCode
            size={16}
            className="text-gray-400"
            aria-label="HTML format"
          />
        );
      case "md":
        return (
          <LucideReact.Code
            size={16}
            className="text-gray-400"
            aria-label="Markdown format"
          />
        );
      case "txt":
      default:
        return (
          <LucideReact.FileText
            size={16}
            className="text-gray-400"
            aria-label="Text format"
          />
        );
    }
  })();

  const renderBody = (): JSX.Element => {
    if (!value.body.trim()) {
      return (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle
            size={20}
            className="mr-2"
            aria-label="No content"
          />
          <span>No comment content.</span>
        </div>
      );
    }
    if (value.format === "html") {
      return (
        <div
          className="text-gray-800 mb-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    // Markdown or plain text: preserve line breaks
    return (
      <p className="whitespace-pre-wrap text-gray-800 mb-4">{value.body}</p>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 max-w-full">
      {/* Header: date and format */}
      <header className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="mr-1"
            aria-label="Created at"
          />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
        <div className="flex items-center">
          {formatIcon}
          <span className="ml-1 uppercase">{value.format}</span>
        </div>
      </header>

      {/* Comment Body */}
      <section className="mb-4 line-clamp-4">{renderBody()}</section>

      {/* Attachments */}
      {value.files.length > 0 && (
        <section className="pt-2 border-t border-gray-100">
          <h4 className="text-gray-600 text-sm font-medium mb-2">
            Attachments
          </h4>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || "(no name)";
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <LucideReact.FileText
                    size={16}
                    className="mr-2 text-indigo-500"
                    aria-label="Attachment"
                  />
                  <span className="truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}
