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
  const { snapshots, created_at, writer } = value;
  const createdDate = new Date(created_at).toLocaleString();
  const snapshotCount = Array.isArray(snapshots) ? snapshots.length : 0;
  const latestSnapshot = snapshotCount > 0 ? snapshots[snapshotCount - 1] : null;
  const editedDate =
    latestSnapshot && latestSnapshot.created_at && snapshotCount > 1
      ? new Date(latestSnapshot.created_at).toLocaleString()
      : null;

  // Derive writer display name if possible
  let writerName = "User";
  if (writer && typeof writer === "object") {
    if ("name" in writer && typeof (writer as any).name === "string") {
      writerName = (writer as any).name;
    } else if ("username" in writer && typeof (writer as any).username === "string") {
      writerName = (writer as any).username;
    }
  } else if (typeof writer === "string") {
    writerName = writer;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Writer and creation date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <div className="text-base font-semibold text-gray-900 truncate">{writerName}</div>
        <div className="mt-1 sm:mt-0 text-sm text-gray-500">
          {createdDate}
          {editedDate && (
            <span className="text-gray-400 ml-2">(Edited: {editedDate})</span>
          )}
        </div>
      </div>

      {/* Body: latest snapshot content */}
      {latestSnapshot && (
        <p className="text-gray-800 text-sm mb-3 line-clamp-4 whitespace-pre-wrap">
          {latestSnapshot.body}
        </p>
      )}

      {/* Attachments list */}
      {latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0 && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">Attachments</div>
          <ul className="space-y-1">
            {latestSnapshot.files.map((file, idx) => {
              const ext = file.extension ? `.${file.extension}` : "";
              const fileName = `${file.name}${ext}`;
              return (
                <li key={idx} className="text-indigo-600 text-sm truncate">
                  {fileName}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
