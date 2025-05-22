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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive the latest snapshot for display
  const sortedSnapshots = [...value.snapshots].sort((a, b) =>
    a.created_at.localeCompare(b.created_at),
  );
  const lastSnapshot = sortedSnapshots[sortedSnapshots.length - 1];

  // 2. Determine writer display name
  let writerName = "Unknown";
  if (value.writer != null) {
    if (typeof value.writer === "object") {
      if ("name" in value.writer && typeof (value.writer as any).name === "string") {
        writerName = (value.writer as any).name;
      } else if (
        "username" in value.writer &&
        typeof (value.writer as any).username === "string"
      ) {
        writerName = (value.writer as any).username;
      } else {
        try {
          writerName = JSON.stringify(value.writer);
        } catch {
          writerName = String(value.writer);
        }
      }
    } else {
      writerName = String(value.writer);
    }
  }

  // 3. Format the timestamp of the latest snapshot
  const formattedDate = new Date(lastSnapshot.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 4. Truncate parent comment ID if present
  const parentDisplay = value.parent_id ? value.parent_id.slice(0, 8) + "..." : null;

  // 5. Helper to format file names
  const formatFileName = (file: AutoViewInputSubTypes.IAttachmentFile.ICreate) => {
    const { name, extension } = file;
    if (extension) {
      return name ? `${name}.${extension}` : `.${extension}`;
    }
    return name || "unnamed file";
  };

  // 6. Compose and return JSX
  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">{writerName}</span>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      {parentDisplay && (
        <div className="mt-1 text-xs italic text-gray-500">
          In reply to: <span className="font-mono">{parentDisplay}</span>
        </div>
      )}

      <div
        className="mt-3 text-gray-800 text-base whitespace-pre-wrap line-clamp-4"
        {...(lastSnapshot.format === "html"
          ? { dangerouslySetInnerHTML: { __html: lastSnapshot.body } }
          : {})}
      >
        {lastSnapshot.format !== "html" && lastSnapshot.body}
      </div>

      {lastSnapshot.files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
          <ul className="mt-1 space-y-1">
            {lastSnapshot.files.map((file, idx) => (
              <li key={idx} className="text-sm text-gray-600 font-mono truncate">
                {formatFileName(file)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
