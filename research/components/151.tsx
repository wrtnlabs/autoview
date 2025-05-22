import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
      answer: null | AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.IAbridge;
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
    referrer:
      | null
      | (string & tags.Format<"uri">)
      | (string & tags.MaxLength<0>);
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
  export type IShoppingMember = {
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
  };
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
  export type IShoppingCitizen = {
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
  export type IShoppingAdministrator = {
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
  };
  /**
   * Email address of member.
   *
   * This shopping mall system allows multiple email addresses to be
   * registered for one {@link IShoppingMember member}. If you don't have to
   * plan such multiple email addresses, just use only one.
   */
  export type IShoppingMemberEmail = {
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
  };
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
  export type IShoppingExternalUser = {
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
  };
  export namespace IShoppingSaleInquiryAnswer {
    export type IAbridge = {
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
export type AutoViewInput =
  AutoViewInputSubTypes.IPageIShoppingSaleReview.IAbridge;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const { pagination, data } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {data.map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Title & Score */}
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {review.title}
              </h3>
              <div className="flex items-center space-x-1">
                <LucideReact.Star
                  className="text-amber-400"
                  size={16}
                  strokeWidth={1.5}
                />
                <span className="text-gray-600 text-sm">
                  {review.score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Customer Channel */}
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <LucideReact.Tag className="mr-1" size={12} />
              <span>{review.customer.channel.name}</span>
            </div>

            {/* Metadata: Date & Read Status */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={14} />
                <span>{formatDate(review.created_at)}</span>
              </div>
              <div className="flex items-center">
                {review.read_by_seller ? (
                  <LucideReact.Eye
                    className="text-green-500"
                    size={14}
                    strokeWidth={1.5}
                  />
                ) : (
                  <LucideReact.EyeOff
                    className="text-gray-400"
                    size={14}
                    strokeWidth={1.5}
                  />
                )}
                <span className="ml-1">
                  {review.read_by_seller ? "Viewed" : "Unviewed"}
                </span>
              </div>
            </div>

            {/* Body Preview */}
            <p className="mt-3 text-gray-700 text-sm line-clamp-3">
              {review.body}
            </p>

            {/* Answer & Attachments */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                {review.answer ? (
                  <LucideReact.MessageSquare
                    className="text-green-500"
                    size={16}
                    strokeWidth={1.5}
                  />
                ) : (
                  <LucideReact.MessageSquare
                    className="text-gray-400"
                    size={16}
                    strokeWidth={1.5}
                  />
                )}
                <span>{review.answer ? "Answered" : "Unanswered"}</span>
              </div>
              {review.files.length > 0 && (
                <div className="flex items-center space-x-1">
                  <LucideReact.FileText
                    className="text-indigo-500"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <span>{review.files.length}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Summary */}
      <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        Page {pagination.current} of {pagination.pages} • Total records:{" "}
        {pagination.records}
      </div>
    </div>
  );
}
