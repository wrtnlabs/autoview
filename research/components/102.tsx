import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingSaleReview {
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
        answer: null | AutoViewInputSubTypes.IShoppingSaleInquiryAnswer;
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
    }
    export namespace IShoppingSaleReview {
        /**
         * Snapshot content of the review article.
        */
        export interface ISnapshot {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleReview;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const reviewerName =
    value.customer.member?.nickname ??
    value.customer.citizen?.name ??
    value.customer.external_user?.nickname ??
    "Anonymous";

  // Sort snapshots to find the latest review snapshot
  const sortedReviewSnapshots = [...value.snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const latestReview = sortedReviewSnapshots[sortedReviewSnapshots.length - 1];

  const reviewDate = new Date(latestReview.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Prepare seller answer if available
  const hasAnswer = Boolean(value.answer && value.answer.snapshots.length > 0);
  let latestAnswer: AutoViewInputSubTypes.IBbsArticle.ISnapshot | null = null;
  let answerDate = "";
  if (hasAnswer && value.answer) {
    const sortedAnswerSnapshots = [...value.answer.snapshots].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    latestAnswer = sortedAnswerSnapshots[sortedAnswerSnapshots.length - 1];
    answerDate = new Date(latestAnswer.created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Reviewer Info */}
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.User size={20} className="text-gray-500" />
        <span className="font-semibold text-gray-800">{reviewerName}</span>
        <LucideReact.Calendar size={16} className="text-gray-400 ml-4" />
        <span className="text-gray-500 text-sm">{reviewDate}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {Array.from({ length: Math.round(latestReview.score) }).map((_, i) => (
          <LucideReact.Star key={i} size={16} className="text-amber-400" />
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          {latestReview.score}/5
        </span>
      </div>

      {/* Review Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
        {latestReview.title}
      </h3>

      {/* Review Body */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {latestReview.body}
      </p>

      {/* Attachments */}
      {latestReview.files.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Attachments
          </h4>
          <ul className="space-y-1">
            {latestReview.files.map((file) => (
              <li
                key={file.url}
                className="flex items-center text-gray-600 text-sm"
              >
                <LucideReact.FileText
                  size={16}
                  className="text-indigo-500 mr-2"
                />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-600"
                >
                  {file.name}
                  {file.extension ? `.${file.extension}` : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Seller's Answer */}
      {hasAnswer && latestAnswer && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LucideReact.MessageCircle
              size={16}
              className="text-blue-500"
            />
            <span className="font-semibold text-gray-800">
              Seller's Answer
            </span>
            <LucideReact.Calendar
              size={14}
              className="text-gray-400 ml-3"
            />
            <span className="text-gray-500 text-sm">{answerDate}</span>
          </div>
          <p className="text-gray-700 text-sm line-clamp-3">
            {latestAnswer.body}
          </p>
        </div>
      )}
    </div>
  );
}
