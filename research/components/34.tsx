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
  const snapshots = value.snapshots || [];
  if (snapshots.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-500 rounded-lg text-center">
        No review data available.
      </div>
    );
  }
  // Pick the most recent snapshot by created_at
  const latestSnapshot = snapshots.reduce((prev, curr) =>
    new Date(curr.created_at) > new Date(prev.created_at) ? curr : prev,
    snapshots[0]
  );
  const { title, body, score, created_at, files } = latestSnapshot;

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Generate star rating visuals
  const maxStars = 5;
  const fullStars = Math.round(score);
  const stars = Array.from({ length: maxStars }, (_, i) => i < fullStars);

  // Customer channel name
  const channelName = value.customer?.channel?.name || "Unknown";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Rating & Seen Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {stars.map((filled, idx) => (
            <span
              key={idx}
              className={filled ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value.read_by_seller
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.read_by_seller ? "Seen" : "Unseen"}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-2 text-lg font-semibold text-gray-800 truncate">
        {title}
      </h2>

      {/* Body (clamped to 3 lines) */}
      <p className="mt-1 text-gray-700 text-sm line-clamp-3">{body}</p>

      {/* Attachments */}
      {files.length > 0 && (
        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-600">Attachments:</h3>
          <ul className="mt-1 flex flex-wrap gap-2">
            {files.map((file) => (
              <li
                key={file.url}
                className="text-xs text-blue-600 truncate max-w-xs"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {file.name || "untitled"}
                  {file.extension ? `.${file.extension}` : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer: Channel & Date */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>Channel: {channelName}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
