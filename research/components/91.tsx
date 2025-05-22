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
  // Sort snapshots by created_at descending to find the latest content
  const sortedSnapshots = value.snapshots
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  const latestSnapshot = sortedSnapshots[0];

  // Determine display name for the writer
  let writerName = 'Anonymous';
  if (typeof value.writer === 'string') {
    writerName = value.writer;
  } else if (
    value.writer &&
    typeof value.writer === 'object' &&
    !Array.isArray(value.writer)
  ) {
    // Prefer name or username if available
    const w = value.writer as Record<string, any>;
    if (typeof w.name === 'string' && w.name.trim()) {
      writerName = w.name;
    } else if (typeof w.username === 'string' && w.username.trim()) {
      writerName = w.username;
    }
  }

  // Format creation date of the comment
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  // Calculate edit count (snapshots beyond the first indicate edits)
  const editCount = value.snapshots.length > 1 ? value.snapshots.length - 1 : 0;

  // Parent comment short ID for context
  const parentIdShort =
    value.parent_id && typeof value.parent_id === 'string'
      ? value.parent_id.slice(-6)
      : null;

  // Helper to build filename with extension
  const formatFilename = (file: AutoViewInputSubTypes.IAttachmentFile.ICreate) => {
    if (file.extension) {
      return file.name ? `${file.name}.${file.extension}` : `.${file.extension}`;
    }
    return file.name || 'unknown';
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Header: Writer and timestamp */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
        <span className="font-semibold text-gray-900 truncate">
          {writerName}
        </span>
        <span className="text-gray-500 text-xs mt-1 sm:mt-0">
          {formattedCreatedAt}
          {editCount > 0 && (
            <span className="ml-2">• edited {editCount} time{editCount > 1 ? 's' : ''}</span>
          )}
        </span>
      </div>

      {/* Parent reference, if applicable */}
      {parentIdShort && (
        <div className="text-gray-500 text-xs mb-2">
          In reply to: <span className="font-medium">...{parentIdShort}</span>
        </div>
      )}

      {/* Comment body */}
      <p className="text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap break-words">
        {latestSnapshot.body}
      </p>

      {/* Attachments */}
      {latestSnapshot.files.length > 0 && (
        <div className="mt-3">
          <span className="text-gray-700 text-sm font-medium">Attachments:</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {latestSnapshot.files.map((file) => (
              <a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm truncate max-w-full"
              >
                {formatFilename(file)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
