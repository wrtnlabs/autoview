import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A comment written on an inquiry article.
     *
     * `IShoppingSaleInquiryComment` is a subtype entity of {@link IBbsArticleComment},
     * and is used when you want to communicate with multiple people about an
     * {@link IShoppingSaleInquiry inquiry} written by a
     * {@link IShoppingCustomer customer}.
     *
     * For reference, only related parties can write comments for
     * {@link IShoppingSeller sellers}, but there is no limit to
     * {@link IShoppingCustomer customers}. In other words, anyone customer can
     * freely write a comment, even if they are not the person who wrote the inquiry.
    */
    export type IShoppingSaleInquiryComment = {
        /**
         * Writer of the comment.
         *
         * Both customer and seller can write comment on the sale inquiry.
         *
         * By the way, no restriction on the customer, but seller must be the
         * person who've registered the sale.
         *
         * @title Writer of the comment
        */
        writer: any | any | any;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Parent comment's ID.
         *
         * @title Parent comment's ID
        */
        parent_id: null | (string & tags.Format<"uuid">);
        /**
         * List of snapshot contents.
         *
         * It is created for the first time when a comment being created, and is
         * accumulated every time the comment is modified.
         *
         * @title List of snapshot contents
        */
        snapshots: AutoViewInputSubTypes.IBbsArticleComment.ISnapshot[];
        /**
         * Creation time of comment.
         *
         * @title Creation time of comment
        */
        created_at: string;
    };
    export namespace IShoppingAdministrator {
        export type IInvert = any;
    }
    export type IShoppingCustomer = any;
    export namespace IShoppingSeller {
        export type IInvert = any;
    }
    export namespace IBbsArticleComment {
        /**
         * Snapshot of comment.
         *
         * `IBbsArticleComment.ISnapshot` is a snapshot entity that contains
         * the contents of the comment.
         *
         * As mentioned in {@link IBbsArticleComment}, designed to keep evidence
         * and prevent fraud.
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryComment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Determine a display name for the writer.
  const writerName: string =
    typeof value.writer === "object" && value.writer !== null
      ? (value.writer.name as string) ||
        (value.writer.username as string) ||
        (value.writer.id as string) ||
        "Unknown"
      : String(value.writer) || "Unknown";

  // Format the comment's creation timestamp.
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Pick the latest snapshot to display its body and attachments.
  const latestSnapshot: AutoViewInputSubTypes.IBbsArticleComment.ISnapshot =
    value.snapshots[value.snapshots.length - 1];

  // Determine if the comment has been edited.
  const editedCount = value.snapshots.length;
  const isEdited = editedCount > 1;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 truncate">
          {writerName}
        </h4>
        <div className="flex items-center space-x-2 text-xs text-gray-500 whitespace-nowrap">
          <time dateTime={value.created_at}>{formattedCreatedAt}</time>
          {isEdited && (
            <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
              Edited ({editedCount})
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 text-gray-800 text-sm whitespace-pre-wrap line-clamp-4">
        {latestSnapshot.body}
      </div>
      {latestSnapshot.files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {latestSnapshot.files.map(
            (file: AutoViewInputSubTypes.IAttachmentFile.ICreate, idx: number) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || "<unnamed>";
              return (
                <span
                  key={idx}
                  className="flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                >
                  {fileName}
                </span>
              );
            }
          )}
        </div>
      )}
    </article>
  );
}
