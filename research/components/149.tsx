import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryComment {
        /**
         * Snapshot content of the comment.
        */
        export interface ISnapshot {
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
        }
    }
    export namespace IAttachmentFile {
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryComment.ISnapshot;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Render comment body based on format
  const content =
    value.format === "html" ? (
      <div
        className="prose prose-sm max-w-full mb-4 line-clamp-4"
        dangerouslySetInnerHTML={{ __html: value.body }}
      />
    ) : (
      <pre className="whitespace-pre-wrap text-gray-800 text-sm mb-4 line-clamp-4">
        {value.body}
      </pre>
    );

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md w-full mx-auto">
      <div className="flex items-center text-gray-500 text-xs mb-2 space-x-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.FileText size={16} />
          <span className="ml-1 uppercase">{value.format}</span>
        </div>
      </div>

      {content}

      {value.files.length > 0 && (
        <div>
          <h4 className="text-gray-700 text-sm font-medium mb-2">
            Attachments ({value.files.length})
          </h4>
          <ul className="space-y-2">
            {value.files.map((file, idx) => {
              const name = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || "untitled";
              return (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <LucideReact.FileText
                    size={16}
                    className="text-indigo-500 mr-2"
                  />
                  <span className="truncate">{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
