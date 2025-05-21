import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingSaleReview {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type IAbridge = {
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
            data: AutoViewInputSubTypes.IShoppingSaleReview.IAbridge[];
        };
    }
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
    export namespace IShoppingSaleReview {
        /**
         * Abridged information of the review.
        */
        export type IAbridge = {
            /**
             * Score of the review.
             *
             * @title Score of the review
            */
            score: number;
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
             * Title of the last snapshot.
             *
             * @title Title of the last snapshot
            */
            title: string;
            /**
             * Creation time of the article.
             *
             * @title Creation time of the article
            */
            created_at: string;
            /**
             * Modification time of the article.
             *
             * In other words, the time when the last snapshot was created.
             *
             * @title Modification time of the article
            */
            updated_at: string;
            /**
             * Format of body.
             *
             * Same meaning with extension like `html`, `md`, `txt`.
             *
             * @title Format of body
            */
            format: "html" | "md" | "txt";
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
    export namespace IShoppingSaleInquiryAnswer {
        export type IAbridge = any;
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleReview.IAbridge;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  // Format ISO date strings into readable formats
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Truncate long text to avoid overflow on mobile
  const truncate = (text: string, length = 120): string =>
    text.length > length ? text.slice(0, length).trim() + "…" : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Pagination summary */}
      <div className="text-sm text-gray-600">
        Showing page{" "}
        <span className="font-medium text-gray-800">{current}</span> of{" "}
        <span className="font-medium text-gray-800">{pages}</span> (
        <span className="font-medium text-gray-800">{records}</span> total
        reviews)
      </div>

      {/* List of reviews */}
      <ul className="space-y-4">
        {data.map((review) => {
          const {
            id,
            title,
            score,
            created_at,
            body,
            read_by_seller,
            customer,
            files,
            answer,
          } = review;
          const bodyPreview = truncate(body);
          const statusBadge = read_by_seller
            ? {
                text: "Read",
                bg: "bg-green-100",
                textColor: "text-green-800",
              }
            : {
                text: "Unread",
                bg: "bg-gray-200",
                textColor: "text-gray-800",
              };
          return (
            <li
              key={id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {/* Header: Title and Read Status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${statusBadge.bg} ${statusBadge.textColor}`}
                  >
                    {statusBadge.text}
                  </span>
                </div>

                {/* Meta: Score and Date */}
                <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                  <span>Score: <span className="font-medium">{score}</span></span>
                  <span>Created: <span className="font-medium">{formatDate(created_at)}</span></span>
                </div>

                {/* Body preview */}
                <p className="mt-2 text-gray-700">{bodyPreview}</p>

                {/* Customer channel info */}
                <div className="mt-2 text-sm text-gray-600">
                  Channel: <span className="font-medium">{customer.channel.name}</span>
                </div>

                {/* Attachments and Answer presence */}
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                  {files.length > 0 && (
                    <span>
                      Attachments:{" "}
                      <span className="font-medium">{files.length}</span>
                    </span>
                  )}
                  {answer != null && (
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Answered
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
