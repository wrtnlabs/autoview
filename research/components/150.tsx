import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingSaleReview {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export interface ISummary {
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
        }
    }
    export namespace IPage {
        /**
         * Page information.
        */
        export interface IPagination {
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
        }
    }
    export namespace IShoppingSaleReview {
        /**
         * Summarized information of the review.
        */
        export interface ISummary {
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
            answer: null | AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.ISummary;
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
        }
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
    export interface IShoppingCustomer {
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
        member: null | AutoViewInputSubTypes.IShoppingMember;
        /**
         * Citizen information.
         *
         * If the customer has verified his real name and mobile number.
         *
         * @title Citizen information
        */
        citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
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
        external_user: null | AutoViewInputSubTypes.IShoppingExternalUser;
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
    }
    /**
     * Member Account.
     *
     * `IShoppingMember` is an entity that symbolizes the case when a
     * {@link IShoppingCustomer} signs up as a member of this shopping mall
     * system.
     *
     * If a `IShoppingMember` has seller or administrator property. it means that
     * the {@link IShoppingCustomer} has acting as a {@link IShoppingSeller seller}
     * or {@link IShoppingAdministrator administrator} at the same time.
    */
    export interface IShoppingMember {
        /**
         * Citizen information.
         *
         * Only when has verified as a citizen, with mobile number and real name.
         *
         * For reference, if the member has signed up as a seller or administrator,
         * this citizen information must be.
         *
         * @title Citizen information
        */
        citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
        /**
         * Seller information.
         *
         * If the member also signed up as a seller.
         *
         * @title Seller information
        */
        seller: null | AutoViewInputSubTypes.IShoppingSeller;
        /**
         * Administrator information.
         *
         * If the member also signed up as an administrator.
         *
         * @title Administrator information
        */
        administrator: null | AutoViewInputSubTypes.IShoppingAdministrator;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Nickname that uniquely identifies the member.
         *
         * @title Nickname that uniquely identifies the member
        */
        nickname: string;
        /**
         * List of emails.
         *
         * @title List of emails
        */
        emails: AutoViewInputSubTypes.IShoppingMemberEmail[];
        /**
         * Creation time of record.
         *
         * Another words, the time when the member has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    }
    /**
     * Citizen verification information.
     *
     * `IShoppingCitizen` is an entity that records the user's
     * {@link name real name} and {@link mobile} input information.
     *
     * For reference, in South Korea, real name authentication is required for
     * e-commerce participants, so the name attribute is important. However, the
     * situation is different overseas, so in reality, mobile attributes are the
     * most important, and identification of individual person is also done based
     * on this mobile.
     *
     * Of course, real name and mobile phone authentication information are
     * encrypted and stored.
    */
    export interface IShoppingCitizen {
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
         * Mobile number.
         *
         * @title Mobile number
        */
        mobile: string;
        /**
         * Real name, or equivalent nickname.
         *
         * @title Real name, or equivalent nickname
        */
        name: string;
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
    /**
     * Administrator account.
     *
     * `IShoppingAdministrator` is an entity that embodies a person who manages
     * the shopping mall system, with {@link IShoppingMember membership} joining.
     *
     * For reference, unlike {@link IShoppingCustomer customers} which can participate
     * even without membership joining, administrator must join membership to operate
     * managements. Also, administrator must perform the
     * {@link IShoppingCitizen real-name and mobile authentication}, too.
    */
    export interface IShoppingAdministrator {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * Another words, the time when the administrator has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    }
    /**
     * Email address of member.
     *
     * This shopping mall system allows multiple email addresses to be
     * registered for one {@link IShoppingMember member}. If you don't have to
     * plan such multiple email addresses, just use only one.
    */
    export interface IShoppingMemberEmail {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Email address value.
         *
         * @title Email address value
        */
        value: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
    }
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
    export interface IShoppingChannel {
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
    }
    /**
     * External user information.
     *
     * `IShoppingExternalUser` is an entity dsigned for when this system needs
     * to connect with external services and welcome their users as
     * {@link IShoppingCustomer customers} of this service.
     *
     * For reference, customers who connect from an external service must have
     * this record, and the external service user is identified through the two
     * attributes {@link application} and {@link uid}. If a customer connected
     * from an external service completes
     * {@link IShoppingCitizen real-name authentication} from this service, each
     * time the external service user reconnects to this service and issues a
     * new customer authentication token, real-name authentication begins with
     * completed.
     *
     * And {@link password} is the password issued to the user by the external
     * service system (the so-called permanent user authentication token), and
     * is never the actual user password. However, for customers who entered the
     * same application and uid as the current external system user, this is to
     * determine whether to view this as a correct external system user or a
     * violation.
     *
     * In addition, additional information received from external services can
     * be recorded in the data field in JSON format.
    */
    export interface IShoppingExternalUser {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Citizen activation info.
         *
         * @title Citizen activation info
        */
        citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
        /**
         * Creation time of record.
         *
         * Another word, first time when the external user connected.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Identifier key of external user from the external system.
         *
         * @title Identifier key of external user from the external system
        */
        uid: string;
        /**
         * Identifier code of the external service.
         *
         * It can be same with {@link IShoppingChannel.code} in common.
         *
         * @title Identifier code of the external service
        */
        application: string;
        /**
         * Nickname of external user in the external system.
         *
         * @title Nickname of external user in the external system
        */
        nickname: string;
        /**
         * Additional information about external user from the external
         * system.
        */
        data: any;
    }
    export namespace IShoppingSaleInquiryAnswer {
        export interface ISummary {
            seller: AutoViewInputSubTypes.IShoppingSeller;
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleReview.ISummary;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: reviews } = value;
  const { current, pages, records } = pagination;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
        <span className="text-sm text-gray-600 mt-2 sm:mt-0">
          Page {current} of {pages} · {records} Total
        </span>
      </header>

      {/* Empty state */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-lg">No reviews available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => {
            const {
              id,
              title,
              score,
              created_at,
              read_by_seller,
              answer,
              customer,
            } = review;
            const channelName = customer.channel.name;

            return (
              <article
                key={id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center text-sm text-gray-600 gap-4">
                  {/* Score */}
                  <div className="flex items-center space-x-1">
                    <LucideReact.Star
                      className="text-amber-400"
                      size={16}
                      strokeWidth={1.5}
                    />
                    <span>{score.toFixed(1)}</span>
                  </div>

                  {/* Read status */}
                  <div className="flex items-center space-x-1">
                    {read_by_seller ? (
                      <>
                        <LucideReact.CheckCircle
                          className="text-green-500"
                          size={16}
                          strokeWidth={1.5}
                        />
                        <span>Read</span>
                      </>
                    ) : (
                      <>
                        <LucideReact.XCircle
                          className="text-gray-400"
                          size={16}
                          strokeWidth={1.5}
                        />
                        <span>Unread</span>
                      </>
                    )}
                  </div>

                  {/* Answer status */}
                  <div className="flex items-center space-x-1">
                    {answer ? (
                      <>
                        <LucideReact.CheckCircle
                          className="text-green-500"
                          size={16}
                          strokeWidth={1.5}
                        />
                        <span>Answered</span>
                      </>
                    ) : (
                      <>
                        <LucideReact.MessageSquare
                          className="text-gray-400"
                          size={16}
                          strokeWidth={1.5}
                        />
                        <span>No Answer</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Review date */}
                <div className="mt-3 flex items-center text-sm text-gray-500 space-x-1">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                  <span>{formatDate(created_at)}</span>
                </div>

                {/* Customer channel */}
                <div className="mt-2 flex items-center text-sm text-gray-500 space-x-1">
                  <LucideReact.Tag
                    size={16}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                  <span>{channelName}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
