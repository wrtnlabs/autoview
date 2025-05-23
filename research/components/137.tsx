import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingSaleInquiryAnswer {
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
    }
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
    export interface IShoppingSeller {
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
    }
    export namespace IBbsArticle {
        /**
         * Snapshot of article.
         *
         * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
         * the article, as mentioned in {@link IBbsArticle}, the contents of the article
         * are separated from the article record to keep evidence and prevent fraud.
        */
        export interface ISnapshot {
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
        }
    }
    export namespace IAttachmentFile {
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryAnswer;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { seller, created_at: answerCreatedAt, snapshots } = value;

  // Format dates
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const answerDate = formatDate(answerCreatedAt);
  const sellerSince = formatDate(seller.created_at);

  // Sort snapshots by creation time
  const sortedSnapshots = [...snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const hasSnapshots = sortedSnapshots.length > 0;
  const latestSnapshot = hasSnapshots
    ? sortedSnapshots[sortedSnapshots.length - 1]
    : null;
  const firstSnapshot = hasSnapshots ? sortedSnapshots[0] : null;
  const revisionCount = sortedSnapshots.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasSnapshots) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No content available</span>
      </div>
    );
  }

  // Build attachment display
  const attachmentElements = latestSnapshot!.files.map((file) => {
    const filename = file.extension
      ? `${file.name || "•"}.${file.extension}`
      : file.name || "Unnamed file";
    return (
      <li key={file.url} className="flex items-center text-sm text-gray-600">
        <LucideReact.FileText className="mr-2 text-indigo-500" size={16} />
        <span className="truncate">{filename}</span>
      </li>
    );
  });

  // Render body based on format
  const renderBody = () => {
    const { format, body } = latestSnapshot!;
    if (format === "html") {
      return (
        <div
          className="prose prose-sm max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      );
    }
    // For markdown or plain text, render as pre-wrapped text with line clamp
    return (
      <pre className="whitespace-pre-wrap text-sm text-gray-800 line-clamp-4">
        {body}
      </pre>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center text-lg font-semibold text-gray-800">
        <LucideReact.MessageSquare className="mr-2 text-blue-500" size={20} />
        Answer
      </div>

      {/* Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Answered on {answerDate}</span>
        </div>
        <div className="flex items-center mt-1 sm:mt-0">
          <LucideReact.User size={16} className="mr-1" />
          <span>Seller since {sellerSince}</span>
        </div>
      </div>

      {/* Revision info */}
      {revisionCount > 1 && firstSnapshot && (
        <div className="text-sm text-gray-500">
          <LucideReact.History size={16} className="inline-block mr-1" />
          {`Version history: ${revisionCount} snapshots (from ${formatDate(
            firstSnapshot.created_at
          )} to ${formatDate(latestSnapshot!.created_at)})`}
        </div>
      )}

      {/* Content Title */}
      <h2 className="text-md font-bold text-gray-900 truncate">
        {latestSnapshot!.title}
      </h2>

      {/* Content Body */}
      <div>{renderBody()}</div>

      {/* Attachments */}
      {attachmentElements.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Attachments
          </h3>
          <ul className="space-y-1">{attachmentElements}</ul>
        </div>
      )}
    </div>
  );
}
