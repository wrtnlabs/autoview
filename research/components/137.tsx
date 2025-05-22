import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Answers to questions about sale snapshots.
   *
   * `IShoppingSaleInquiryAnswer` is an entity that embodies the official
   * answer written by the {@link IShoppingSeller seller} to the
   * {@link IShoppingSaleInquiry inquiry} written by the
   * {@link IShoppingCustomer customer}.
   *
   * Of course, in addition to writing an official response like this, it is
   * also possible for the seller to communicate with the inqjuiry written
   * customer and multiple customers through
   * {@link IShoppingSaleInquiryComment comments} in the attribution inquiry.
   *
   * For reference, it is not possible to write comments on this answer.
   * Encourage people to write comments on the inquiry article. This is to
   * prevent comments from being scattered in both inquiry and answer
   * articles.
   */
  export type IShoppingSaleInquiryAnswer = {
    /**
     * Seller who've written the answer.
     *
     * @title Seller who've written the answer
     */
    seller: AutoViewInputSubTypes.IShoppingSeller;
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * List of snapshot contents.
     *
     * It is created for the first time when an article is created, and is
     * accumulated every time the article is modified.
     *
     * @title List of snapshot contents
     */
    snapshots: AutoViewInputSubTypes.IBbsArticle.ISnapshot[];
    /**
     * Creation time of article.
     *
     * @title Creation time of article
     */
    created_at: string;
  };
  /**
   * Seller information.
   *
   * `IShoppingSeller` is an entity that embodies a person who registers
   * {@link IShoppingSale sales} to operate selling activities, with
   * {@link IShoppingMember membership} joining.
   *
   * For reference, unlike {@link IShoppingCustomer customers} which can
   * participate even without membership joining, seller must join membership
   * to operate sales. Also, seller must do the
   * {@link IShoppingCitizen real-name and mobile authentication}, too.
   */
  export type IShoppingSeller = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation tmie of record.
     *
     * Another words, the time when the seller has signed up.
     *
     * @title Creation tmie of record
     */
    created_at: string;
  };
  export namespace IBbsArticle {
    /**
     * Snapshot of article.
     *
     * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
     * the article, as mentioned in {@link IBbsArticle}, the contents of the article
     * are separated from the article record to keep evidence and prevent fraud.
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
       * In other words, creation time or update time or article.
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
       * Title of article.
       *
       * @title Title of article
       */
      title: string;
      /**
       * Content body of article.
       *
       * @title Content body of article
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryAnswer;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const answerDate = new Date(value.created_at).toLocaleString();
  const sellerSince = new Date(value.seller.created_at).toLocaleDateString();
  const sortedSnapshots = [...value.snapshots].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const latestSnapshot = sortedSnapshots[sortedSnapshots.length - 1];
  const versionCount = value.snapshots.length;
  const snapshotDate = latestSnapshot
    ? new Date(latestSnapshot.created_at).toLocaleString()
    : "";
  const title = latestSnapshot?.title || "No title provided";
  const format = latestSnapshot?.format;
  const body = latestSnapshot?.body || "";
  const files = latestSnapshot?.files || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Answer date and seller info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Answered on {answerDate}</span>
          {versionCount > 1 && (
            <span className="ml-4">({versionCount} versions)</span>
          )}
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
          <LucideReact.User size={16} className="mr-1" />
          <span>Seller since {sellerSince}</span>
        </div>
      </div>

      {/* Snapshot title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {title}
      </h2>

      {/* Snapshot date */}
      {snapshotDate && (
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <LucideReact.Clock size={16} className="mr-1" />
          <span>Last updated {snapshotDate}</span>
        </div>
      )}

      {/* Body preview: clamp to 3 lines */}
      <div className="prose prose-sm mb-4 max-w-none line-clamp-3 text-gray-700">
        {format === "html" ? (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <pre className="whitespace-pre-wrap">{body}</pre>
        )}
      </div>

      {/* Attachments */}
      {files.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            <LucideReact.Paperclip size={16} className="inline-block mr-1" />
            Attachments
          </h3>
          <ul className="space-y-1">
            {files.map((file) => {
              const filename = `${file.name || ""}${
                file.extension ? `.${file.extension}` : ""
              }`;
              return (
                <li key={file.url}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <LucideReact.FileText
                      size={16}
                      className="mr-1 flex-shrink-0"
                    />
                    <span className="truncate">
                      {filename || "Unnamed file"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
