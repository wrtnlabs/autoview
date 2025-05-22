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
  const snapshots = value.snapshots ?? [];
  const latestSnapshot =
    snapshots.length > 0
      ? snapshots[snapshots.length - 1]
      : {
          title: "",
          body: "",
          files: [] as AutoViewInputSubTypes.IAttachmentFile.ICreate[],
        };
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const editCount = snapshots.length > 1 ? snapshots.length - 1 : 0;
  const attachments = latestSnapshot.files ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <LucideReact.User size={20} className="text-gray-500" />
          <span className="text-lg font-medium text-gray-800">
            Seller Response
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <LucideReact.Calendar size={16} />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>

      {editCount > 0 && (
        <div className="flex items-center gap-1 mb-3 text-sm text-gray-500">
          <LucideReact.Edit2 size={16} />
          <span>
            {editCount} edit{editCount > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-900 truncate">
          {latestSnapshot.title}
        </h3>
        <p className="mt-2 text-gray-700 line-clamp-3 whitespace-pre-wrap">
          {latestSnapshot.body}
        </p>
      </div>

      {attachments.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-800 mb-2">
            Attachments
          </h4>
          <ul className="space-y-1">
            {attachments.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <LucideReact.FileText size={16} className="text-indigo-500" />
                  <span className="truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
