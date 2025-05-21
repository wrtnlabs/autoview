import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSaleInquiryComment = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: AutoViewInputSubTypes.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: AutoViewInputSubTypes.IShoppingSaleInquiryComment[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleInquiryComment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  // Format ISO date to a readable string
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-full p-4 bg-white rounded-lg shadow-sm">
      <header className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Comments&nbsp;
          <span className="text-gray-600 font-normal">
            ({data.length} of {records})
          </span>
        </h2>
        <p className="mt-2 sm:mt-0 text-sm text-gray-500">
          Page {current} of {pages}
        </p>
      </header>
      <ul className="space-y-6">
        {data.map((comment) => {
          // Get the latest snapshot
          const latest =
            comment.snapshots[comment.snapshots.length - 1];

          // Infer writer's display name
          const writerName = (() => {
            const w = comment.writer;
            if (typeof w === "string") return w;
            if (
              w &&
              typeof w === "object" &&
              "name" in (w as any) &&
              typeof (w as any).name === "string"
            )
              return (w as any).name;
            return "Unknown";
          })();

          return (
            <li key={comment.id}>
              <article className="border-t pt-4">
                <header className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {writerName}
                  </span>
                  <time
                    className="text-xs text-gray-500 whitespace-nowrap"
                    dateTime={latest.created_at}
                  >
                    {formatDate(latest.created_at)}
                  </time>
                </header>
                <p className="text-gray-800 text-sm line-clamp-3">
                  {latest.body}
                </p>
                {latest.files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {latest.files.map((file) => {
                      const ext = file.extension
                        ? `.${file.extension}`
                        : "";
                      const label =
                        file.name || (ext ? ext : "attachment");
                      return (
                        <a
                          key={file.url}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline truncate max-w-xs"
                        >
                          {label + ext}
                        </a>
                      );
                    })}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
