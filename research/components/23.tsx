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
  const snapshots: AutoViewInputSubTypes.IBbsArticleComment.ISnapshot[] = value.snapshots || [];
  const latestSnapshot: AutoViewInputSubTypes.IBbsArticleComment.ISnapshot =
    snapshots.length > 0
      ? snapshots[snapshots.length - 1]
      : {
          id: "",
          created_at: value.created_at,
          format: "txt",
          body: "",
          files: [],
        };

  // Format the timestamp for display
  const formattedDate = new Date(latestSnapshot.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Derive writer's display name
  let writerName = "Anonymous";
  if (value.writer) {
    if (
      typeof value.writer === "object" &&
      "name" in (value.writer as any) &&
      typeof (value.writer as any).name === "string"
    ) {
      writerName = (value.writer as any).name;
    } else {
      writerName = String(value.writer);
    }
  }
  // Derive initials for avatar placeholder
  const initials = writerName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Avatar, Writer, Date */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{writerName}</span>
          <span className="text-gray-500 text-sm">{formattedDate}</span>
        </div>
      </div>

      {/* Comment Content */}
      <div className="mt-4 text-gray-800 text-sm space-y-2">
        {latestSnapshot.format === "html" ? (
          // For HTML content, assume Tailwind typography plugin is available
          <div
            className="prose prose-sm max-w-full"
            dangerouslySetInnerHTML={{ __html: latestSnapshot.body }}
          />
        ) : (
          // Plain text or Markdown - show first 3 lines
          <p className="line-clamp-3 whitespace-pre-wrap">{latestSnapshot.body}</p>
        )}
      </div>

      {/* Attachments */}
      {latestSnapshot.files && latestSnapshot.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-medium text-sm mb-2">Attachments</h3>
          <ul className="space-y-1">
            {latestSnapshot.files.map((file, idx) => {
              const filename = file.extension ? `${file.name}.${file.extension}` : file.name;
              return (
                <li key={idx} className="text-blue-600 text-sm truncate">
                  {filename}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
