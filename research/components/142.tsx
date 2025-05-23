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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format the creation timestamp into a human-readable string.
  const formattedDate = new Date(value.created_at).toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements for date, body, and attachments.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Creation Time */}
      <div className="flex items-center text-gray-500 text-sm">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>{formattedDate}</span>
      </div>

      {/* Comment Body */}
      {value.format === "html" ? (
        <div
          className="mt-2 prose prose-sm max-w-none overflow-hidden line-clamp-3 text-gray-800"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      ) : (
        <div className="mt-2 text-gray-800 text-sm whitespace-pre-wrap overflow-hidden line-clamp-3">
          {value.body}
        </div>
      )}

      {/* Attachments */}
      {value.files.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center text-gray-600 font-medium text-sm">
            <LucideReact.Paperclip size={16} className="mr-1" />
            <span>Attachments</span>
          </div>
          <div className="mt-2 space-y-1">
            {value.files.map((file, idx) => {
              const fullName = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              return (
                <div key={idx} className="flex items-center text-gray-700 text-sm">
                  <LucideReact.FileText size={16} className="mr-2 text-indigo-500" />
                  <span className="truncate">{fullName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
