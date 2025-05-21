import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Reviews for sale snapshots.
     *
     * `IShoppingSaleReview` is a subtype entity of {@link IShoppingSaleInquiry},
     * and is used when a {@link IShoppingCustomer customer} purchases a
     * {@link IShoppingSale sale} ({@link IShoppingSaleSnapshot snapshot} at the time)
     * registered by the {@link IShoppingSeller seller} as a product and leaves a
     * review and rating for it.
     *
     * For reference, `IShoppingSaleReview` and
     * {@link IShoppingOrderGod shopping_order_goods} have a logarithmic relationship
     * of N: 1, but this does not mean that customers can continue to write reviews
     * for the same product indefinitely. Wouldn't there be restrictions, such as
     * if you write a review once, you can write an additional review a month later?
    */
    export type IShoppingSaleReview = {
        /**
         * Type of the derived inquiry.
         *
         * - `question`: {@link IShoppingSaleQuestion}
         * - `review`: {@link IShoppingSaleReview}
         *
         * @title Type of the derived inquiry
        */
        type: "review";
        /**
         * Customer who wrote the inquiry.
         *
         * @title Customer who wrote the inquiry
        */
        customer: AutoViewInputSubTypes.IShoppingCustomer;
        /**
         * Formal answer for the inquiry by the seller.
         *
         * @title Formal answer for the inquiry by the seller
        */
        answer: null | any;
        /**
         * Whether the seller has viewed the inquiry or not.
         *
         * @title Whether the seller has viewed the inquiry or not
        */
        read_by_seller: boolean;
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
        snapshots: AutoViewInputSubTypes.IShoppingSaleReview.ISnapshot[];
        /**
         * Creation time of article.
         *
         * @title Creation time of article
        */
        created_at: string;
    };
    export namespace IShoppingSaleReview {
        /**
         * Snapshot content of the review article.
        */
        export type ISnapshot = {
            /**
             * Score of the review.
             *
             * @title Score of the review
            */
            score: number;
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
    /**
     * Customer information, but not a person but a connection basis.
     *
     * `IShoppingCustomer` is an entity that literally embodies the information of
     * those who participated in the market as customers. By the way, the
     * `IShoppingCustomer` does not mean a person, but a connection basis. Therefore,
     * even if the same person connects to the shopping mall multiple, multiple
     * records are created in `IShoppingCustomer`.
     *
     * The first purpose of this is to track the customer's inflow path in detail,
     * and it is for cases where the same person enters as a non-member,
     * {@link IShoppingCartCommodity puts items in the shopping cart} in advance,
     * and only authenticates their {@link IShoppingCitizen real name} or
     * registers/logs in at the moment of {@link IShoppingOrderPublish payment}.
     * It is the second. Lastly, it is to accurately track the activities that
     * a person performs at the shopping mall in various ways like below.
     *
     * - Same person comes from an {@link IShoppingExternalUser external service}
     * - Same person creates multiple accounts
     * - Same person makes a {@link IShoppingOrderPublish purchase} as a non-member with only {@link IShoppingCitizen real name authentication}
     * - Same person acts both {@link IShoppingSeller seller} and {@link IShoppingAdministrator admin} at the same time
     *
     * Therefore, `IShoppingCustomer` can have multiple records with the same
     * {@link IShoppingCitizen}, {@link IShoppingMember}, and
     * {@link IShoppingExternalUser}. Additionally, if a customer signs up for
     * membership after verifying their real name or signs up for our service after
     * being a user of an external service, all related records are changed at once.
     * Therefore, identification and tracking of customers can be done very
     * systematically.
    */
    export type IShoppingCustomer = {
        /**
         * Discriminant for the type of customer.
         *
         * @title Discriminant for the type of customer
        */
        type: "customer";
        /**
         * Membership information.
         *
         * If the customer has joined as a member.
         *
         * @title Membership information
        */
        member: null | any;
        /**
         * Citizen information.
         *
         * If the customer has verified his real name and mobile number.
         *
         * @title Citizen information
        */
        citizen: null | any;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Belonged channel.
         *
         * @title Belonged channel
        */
        channel: AutoViewInputSubTypes.IShoppingChannel;
        /**
         * External user information.
         *
         * When the customer has come from an external service.
         *
         * @title External user information
        */
        external_user: null | any;
        /**
         * Connection address.
         *
         * Same with {@link window.location.href} of client.
         *
         * @title Connection address
        */
        href: string;
        /**
         * Referrer address.
         *
         * Same with {@link window.document.referrer} of client.
         *
         * @title Referrer address
        */
        referrer: null | (string & tags.Format<"uri">) | (string & tags.MaxLength<0>);
        /**
         * Connection IP Address.
         *
         * @title Connection IP Address
        */
        ip: (string & tags.Format<"ipv4">) | (string & tags.Format<"ipv6">);
        /**
         * Creation time of the connection record.
         *
         * @title Creation time of the connection record
        */
        created_at: string;
    };
    export type IShoppingMember = any;
    export type IShoppingCitizen = any;
    /**
     * Channel information.
     *
     * `IShoppingChannel` is a concept that shapes the distribution channel in the
     * market. Therefore, the difference in the channel in this e-commerce system
     * means that it is another site or application.
     *
     * By the way, if your shopping mall system requires only one channel, then
     * just use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingChannel = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Name of the channel.
         *
         * @title Name of the channel
        */
        name: string;
    };
    export type IShoppingExternalUser = any;
    export type IShoppingSaleInquiryAnswer = any;
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleReview;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const snapshotsSorted = [...value.snapshots].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const latestSnapshot = snapshotsSorted[0] ?? {
    score: 0,
    id: "",
    created_at: value.created_at,
    format: "txt" as const,
    title: "",
    body: "",
    files: [] as AutoViewInputSubTypes.IAttachmentFile.ICreate[],
  };
  const reviewDate = new Date(value.created_at).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const snapshotDate = new Date(latestSnapshot.created_at).toLocaleDateString(
    "default",
    { year: "numeric", month: "short", day: "numeric" },
  );
  const roundedScore = Math.round(latestSnapshot.score);
  const stars = Array(roundedScore).fill("★").join("") || "—";
  const customerChannel = value.customer.channel.name;
  const answerText =
    typeof value.answer === "string"
      ? value.answer
      : value.answer != null
      ? JSON.stringify(value.answer)
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <header className="flex justify-between items-start mb-2">
          <h2 className="flex-1 text-lg font-semibold text-gray-800 truncate">
            {latestSnapshot.title || "Untitled Review"}
          </h2>
          <span
            className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
              value.read_by_seller
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value.read_by_seller ? "Read" : "Unread"}
          </span>
        </header>
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 text-sm mr-1">{stars}</span>
          <span className="text-gray-600 text-sm">
            {latestSnapshot.score.toFixed(1)}/5
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {latestSnapshot.body || "No review content provided."}
        </p>
        {latestSnapshot.files.length > 0 && (
          <div className="mb-3">
            <h3 className="text-gray-800 font-medium text-sm mb-1">
              Attachments
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {latestSnapshot.files.map((file) => {
                const ext = file.extension ? `.${file.extension}` : "";
                return (
                  <li key={file.url}>
                    {file.name || "<untitled>"}{ext}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {answerText && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-gray-800 font-medium text-sm mb-1">
              Seller’s Answer
            </h3>
            <p className="text-gray-700 text-sm line-clamp-2">{answerText}</p>
          </div>
        )}
      </div>
      <footer className="bg-gray-100 px-4 py-2 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between">
        <span>Reviewed on {reviewDate}</span>
        <span className="mt-1 sm:mt-0">Channel: {customerChannel}</span>
      </footer>
    </article>
  );
}
