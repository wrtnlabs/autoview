import LucideReact from "lucide-react";
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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Format creation date to a reader-friendly string
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Truncate body to avoid overflow on small screens
  const maxBodyLength = 300;
  const snippet =
    value.body.length > maxBodyLength
      ? `${value.body.slice(0, maxBodyLength)}…`
      : value.body;

  // Prepare attachment list
  const attachments = value.files ?? [];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Title and creation date */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">{value.title}</h2>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Format badge */}
      <div className="inline-flex items-center px-2 py-1 mb-4 text-xs font-medium text-gray-700 bg-gray-100 rounded">
        <LucideReact.FileText size={14} className="mr-1 text-gray-500" />
        <span className="capitalize">{value.format}</span>
      </div>

      {/* Body snippet */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-4">{snippet}</p>

      {/* Attachments list */}
      {attachments.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <LucideReact.Paperclip size={16} className="mr-1" />
            <span>Attachments ({attachments.length})</span>
          </div>
          <ul className="space-y-2">
            {attachments.map((file, idx) => {
              const filenameWithExt = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              const displayName =
                filenameWithExt || file.url.split("/").pop() || "untitled";
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <LucideReact.File size={16} className="mr-2 text-gray-500" />
                  <span className="truncate">{displayName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
