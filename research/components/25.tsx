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
  // 1. Data aggregation/transformation
  const writerName =
    value.writer && typeof value.writer === "object"
      ? (value.writer.name || value.writer.username || JSON.stringify(value.writer))
      : String(value.writer || "Unknown User");

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const snapshots = Array.isArray(value.snapshots) ? value.snapshots : [];
  const latestSnapshot = snapshots[snapshots.length - 1] || {
    body: "",
    created_at: value.created_at,
    format: "txt" as const,
    files: [] as AutoViewInputSubTypes.IAttachmentFile.ICreate[],
  };
  const previousSnapshots = snapshots.slice(0, snapshots.length - 1);

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{writerName}</h2>
        <time className="text-sm text-gray-500">{formatDate(value.created_at)}</time>
      </header>

      <section className="mt-3">
        <div className="prose prose-sm text-gray-800 line-clamp-3">
          {latestSnapshot.format === "html" ? (
            <div dangerouslySetInnerHTML={{ __html: latestSnapshot.body }} />
          ) : (
            <p>{latestSnapshot.body}</p>
          )}
        </div>
      </section>

      {latestSnapshot.files.length > 0 && (
        <section className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Attachments</h3>
          <ul className="mt-1 space-y-1">
            {latestSnapshot.files.map((file, idx) => {
              const fileName = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              return (
                <li key={idx} className="text-sm text-gray-600 truncate">
                  {fileName}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {previousSnapshots.length > 0 && (
        <section className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700">
            Version History ({previousSnapshots.length})
          </h3>
          <ul className="mt-2 space-y-4">
            {previousSnapshots.map((snap, idx) => (
              <li key={idx}>
                <div className="flex justify-between text-gray-500 text-xs">
                  <time>{formatDate(snap.created_at)}</time>
                  <span className="uppercase">{snap.format}</span>
                </div>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{snap.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
