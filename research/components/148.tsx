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
  const latestSnapshot =
    value.snapshots.length > 0 ? value.snapshots[value.snapshots.length - 1] : null;

  const commentDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const snapshotDate = latestSnapshot
    ? new Date(latestSnapshot.created_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const bodyText = latestSnapshot?.body ?? '';

  // Derive author name from writer object or fallback
  let authorName = 'Unknown';
  if (value.writer && typeof value.writer === 'object') {
    authorName =
      (value.writer as any).name ||
      (value.writer as any).username ||
      `${(value.writer as any).firstName ?? ''} ${(value.writer as any).lastName ?? ''}`.trim() ||
      'Unknown';
  } else if (typeof value.writer === 'string') {
    authorName = value.writer;
  }
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Format attachment file names
  const attachments =
    latestSnapshot?.files.map((file) => {
      const ext = file.extension ? `.${file.extension}` : '';
      return `${file.name || 'file'}${ext}`;
    }) ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
          {authorInitial}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{authorName}</span>
          <span className="text-xs text-gray-500">{commentDate}</span>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-gray-800 text-sm line-clamp-3">{bodyText}</p>
        {snapshotDate && snapshotDate !== commentDate && (
          <p className="mt-1 text-xs text-gray-400">Edited: {snapshotDate}</p>
        )}
      </div>

      {attachments.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-semibold text-gray-600">Attachments:</span>
          <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-0.5">
            {attachments.map((name, idx) => (
              <li key={idx} className="truncate">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
