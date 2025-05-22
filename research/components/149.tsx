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
  const formattedDate = React.useMemo(
    () =>
      new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [value.created_at],
  );

  const formatIcon = React.useMemo(() => {
    switch (value.format) {
      case "html":
        return (
          <LucideReact.FileCode
            aria-hidden
            size={16}
            className="text-indigo-500"
          />
        );
      case "md":
        return (
          <LucideReact.Edit aria-hidden size={16} className="text-green-500" />
        );
      default:
        return (
          <LucideReact.FileText
            aria-hidden
            size={16}
            className="text-gray-500"
          />
        );
    }
  }, [value.format]);

  const renderedBody = React.useMemo(() => {
    if (value.format === "html") {
      return (
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    return (
      <div className="whitespace-pre-wrap text-gray-700 line-clamp-3">
        {value.body}
      </div>
    );
  }, [value.format, value.body]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {formatIcon}
          <span className="font-medium capitalize">{value.format} comment</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400 mt-2 sm:mt-0">
          <LucideReact.Calendar aria-hidden size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="mb-4">{renderedBody}</div>

      {value.files.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Attachments
          </h4>
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
            {value.files.map((file, idx) => {
              const filename = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md text-sm text-gray-700"
                >
                  <LucideReact.FileText
                    aria-hidden
                    size={16}
                    className="text-indigo-400"
                  />
                  <span className="truncate max-w-xs">{filename}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
