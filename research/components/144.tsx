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
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  // Sort snapshots chronologically and separate latest from previous
  const sortedSnapshots = [...value.snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const latestSnapshot = sortedSnapshots[sortedSnapshots.length - 1];
  const previousSnapshots = sortedSnapshots.slice(0, -1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <header className="border-b pb-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Seller’s Answer</h2>
        <p className="text-sm text-gray-500">
          Answered on {formatDate(value.created_at)}
        </p>
        <p className="text-sm text-gray-500">
          Seller joined on {formatDate(value.seller.created_at)}
        </p>
      </header>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium text-gray-700">Latest Version</h3>
          <p className="text-sm text-gray-500 mb-1">
            Snapshot on {formatDate(latestSnapshot.created_at)}
          </p>
          <h4 className="font-semibold text-gray-800">{latestSnapshot.title}</h4>
          <p className="mt-2 text-gray-600 line-clamp-3">{latestSnapshot.body}</p>
          {latestSnapshot.files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {latestSnapshot.files.map((file, idx) => {
                const ext = file.extension ? `.${file.extension}` : '';
                const label = `${file.name}${ext}`;
                return (
                  <span
                    key={idx}
                    className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}
        </section>

        {previousSnapshots.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-gray-700">Previous Versions</h3>
            <ul className="mt-2 divide-y divide-gray-200">
              {previousSnapshots.map((snap, idx) => (
                <li key={idx} className="py-3">
                  <p className="text-sm text-gray-500">
                    On {formatDate(snap.created_at)}
                  </p>
                  <h4 className="font-medium text-gray-800">{snap.title}</h4>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
