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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const snapshots = [...value.snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const revisionCount = snapshots.length;
  const latestSnapshot = snapshots[revisionCount - 1];
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const formattedAnswerDate = formatDate(value.created_at);
  const formattedSellerSince = formatDate(value.seller.created_at);
  const formattedSnapshotDate = latestSnapshot ? formatDate(latestSnapshot.created_at) : '';
  const bodySnippet =
    latestSnapshot && latestSnapshot.body.length > 200
      ? latestSnapshot.body.slice(0, 200) + '…'
      : latestSnapshot?.body || '';

  // 2. Compose the visual structure
  if (revisionCount === 0) {
    return (
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No answer available</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Answer</h2>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.History size={16} className="mr-1" />
          <span>
            {revisionCount} {revisionCount === 1 ? 'Revision' : 'Revisions'}
          </span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <LucideReact.User size={16} className="mr-1" />
        <span>Seller since {formattedSellerSince}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>Answered on {formattedAnswerDate}</span>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-700 mb-1">{latestSnapshot.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{bodySnippet}</p>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <LucideReact.Clock size={16} className="mr-1" />
          <span>Last updated on {formattedSnapshotDate}</span>
        </div>
      </div>
      {latestSnapshot.files && latestSnapshot.files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
          <ul className="space-y-1">
            {latestSnapshot.files.map((file) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || 'Unnamed file';
              return (
                <li key={file.url} className="flex items-center text-gray-600 text-sm">
                  <LucideReact.FileText size={16} className="mr-1 text-indigo-500" />
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
