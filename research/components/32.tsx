import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingSaleReview {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type ISummary = {
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
            data: AutoViewInputSubTypes.IShoppingSaleReview.ISummary[];
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
         * Summarized information of the review.
        */
        export type ISummary = {
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
        export type ISummary = any;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleReview.ISummary;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure input and derive formatted values.
  const { pagination, data } = value;
  const pageInfo = `Page ${pagination.current} of ${pagination.pages} (${pagination.records} records)`;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const readLabel = (read: boolean) => (read ? "Read by Seller" : "Unread by Seller");
  const answerLabel = (ans: any) => (ans ? "Answered" : "No Answer");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto p-4">
      {/* Pagination summary */}
      <div className="mb-4 text-sm text-gray-600">{pageInfo}</div>
      {/* Reviews list */}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {item.title}
            </h3>
            {/* Metadata */}
            <div className="mt-2 flex flex-wrap text-sm text-gray-500 space-x-4">
              <span>
                Score:
                <span className="font-medium text-gray-700"> {item.score}</span>
              </span>
              <span>
                Customer Channel:
                <span className="font-medium text-gray-700">
                  {" "}
                  {item.customer.channel.name}
                </span>
              </span>
              <span>
                Date:
                <span className="font-medium">
                  {" "}
                  {formatDate(item.created_at)}
                </span>
              </span>
            </div>
            {/* Status badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  item.read_by_seller
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {readLabel(item.read_by_seller)}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  item.answer
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {answerLabel(item.answer)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
