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
  const snapshots = value.snapshots ?? [];
  const snapshotCount = snapshots.length;
  // Use the latest snapshot for display; fallback to first if array is empty
  const latestSnapshot = snapshots[snapshotCount - 1] || snapshots[0] || null;

  // Format the snapshot creation date to a human‐readable string
  const formattedSnapshotDate = latestSnapshot
    ? new Date(latestSnapshot.created_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  // Determine a displayable writer name
  let displayWriter = 'Unknown';
  if (typeof value.writer === 'string') {
    displayWriter = value.writer;
  } else if (
    typeof value.writer === 'object' &&
    value.writer !== null &&
    'name' in (value.writer as any) &&
    typeof (value.writer as any).name === 'string'
  ) {
    displayWriter = (value.writer as any).name;
  } else {
    try {
      displayWriter = JSON.stringify(value.writer);
    } catch {
      displayWriter = String(value.writer);
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <header className="px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-gray-800 font-semibold text-sm truncate">
          Writer: <span className="font-normal">{displayWriter}</span>
        </div>
        {formattedSnapshotDate && (
          <time
            dateTime={latestSnapshot!.created_at}
            className="mt-1 sm:mt-0 text-gray-500 text-xs"
          >
            {formattedSnapshotDate}
          </time>
        )}
      </header>

      <div className="px-4 py-3">
        {snapshotCount > 1 && (
          <div className="text-gray-500 text-xs mb-2">
            Edited&nbsp;
            <span className="font-medium text-gray-700">{snapshotCount - 1}</span>
            &nbsp;time{snapshotCount - 1 !== 1 ? 's' : ''}
          </div>
        )}

        <p className="text-gray-800 text-sm leading-relaxed line-clamp-3">
          {latestSnapshot?.body || 'No content available.'}
        </p>

        {latestSnapshot?.files && latestSnapshot.files.length > 0 && (
          <div className="mt-3 flex flex-wrap">
            {latestSnapshot.files.map((file, idx) => {
              // Construct a user-friendly file label
              const ext = file.extension ? `.${file.extension}` : '';
              const label = `${file.name || 'file'}${ext}`;
              return (
                <span
                  key={idx}
                  className="inline-block bg-gray-100 text-gray-600 text-xs rounded px-2 py-1 mr-2 mb-2 truncate"
                  title={label}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
