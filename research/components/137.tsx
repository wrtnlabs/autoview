import { tags } from "typia";
import React from "react";
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
  const { seller, snapshots, created_at } = value;
  const formattedAnswerDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedSellerSince = new Date(seller.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const revisionCount = snapshots.length;
  const latest = revisionCount > 0 ? snapshots[revisionCount - 1] : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Seller Answer</h2>
        <div className="text-sm text-gray-500">Answered on {formattedAnswerDate}</div>
      </header>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Seller ID:</span> {seller.id}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Member since:</span> {formattedSellerSince}
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <span className="font-medium">Revisions:</span> {revisionCount}
      </div>

      {latest ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 truncate">{latest.title}</h3>
            <span className="px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded">
              {latest.format.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-700 text-sm line-clamp-3">{latest.body}</p>
          {latest.files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {latest.files.map((file, idx) => {
                const fileName = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
                return (
                  <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {fileName}
                  </span>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <div className="text-gray-500 text-sm">No content available.</div>
      )}
    </article>
  );
}
