import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IShoppingSeller {
    /**
     * Invert information starting from seller info.
     *
     * Instead of accessing to the seller information from the
     * {@link IShoppingCustomer.member} -> {@link IShoppingMember.seller},
     * `IShoppingSeller.IInvert` starts from the seller information
     * and access to the customer, member and {@link IShoppingCitizen citizen}
     * information inversely.
     */
    export type IInvert = {
      /**
       * Discriminant for the type of seller.
       *
       * @title Discriminant for the type of seller
       */
      type: "seller";
      /**
       * Membership joining information.
       *
       * @title Membership joining information
       */
      member: AutoViewInputSubTypes.IShoppingMember.IInvert;
      /**
       * Customer, the connection information.
       *
       * @title Customer, the connection information
       */
      customer: AutoViewInputSubTypes.IShoppingCustomer.IInvert;
      /**
       * Real-name and mobile number authentication information.
       *
       * @title Real-name and mobile number authentication information
       */
      citizen: AutoViewInputSubTypes.IShoppingCitizen;
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
  }
  export namespace IShoppingMember {
    /**
     * Invert information of member.
     *
     * This invert member information has been designed to be used for another
     * invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
     */
    export type IInvert = {
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
  }
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
  export namespace IShoppingCustomer {
    /**
     * Inverted customer information.
     *
     * This inverted customer information has been designed to be used for
     * another invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
     */
    export type IInvert = {
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
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSeller.IInvert;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sellerJoinDate = new Date(value.created_at).toLocaleString();
  const memberJoinDate = new Date(value.member.created_at).toLocaleDateString();
  const citizenVerifiedDate = new Date(
    value.citizen.created_at,
  ).toLocaleDateString();
  const external = value.customer.external_user;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Seller's Membership Info */}
      <div>
        <h1 className="flex items-center text-2xl font-semibold text-gray-800 gap-2">
          <LucideReact.User size={24} className="text-gray-600" />
          <span>{value.member.nickname}</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Member since {memberJoinDate}
        </p>
      </div>

      {/* Two-column grid: Verification and Connection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Section */}
        <div>
          <h2 className="flex items-center text-sm font-medium text-gray-700 gap-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span>Verification</span>
          </h2>
          <p className="mt-1 text-gray-600">{value.citizen.name}</p>
          <div className="mt-1 flex items-center text-gray-600 gap-1">
            <LucideReact.Phone size={16} className="text-gray-400" />
            <span>{value.citizen.mobile}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Verified {citizenVerifiedDate}
          </p>
        </div>

        {/* Connection Section */}
        <div>
          <h2 className="flex items-center text-sm font-medium text-gray-700 gap-1">
            <LucideReact.Server size={16} className="text-gray-500" />
            <span>Connection</span>
          </h2>
          <div className="mt-1 flex items-center text-gray-600 gap-1">
            <LucideReact.Globe size={16} className="text-gray-400" />
            <span>{value.customer.channel.name}</span>
          </div>
          <div className="mt-1 flex items-center text-gray-600 gap-1">
            <LucideReact.Wifi size={16} className="text-gray-400" />
            <span>{value.customer.ip}</span>
          </div>
          <div className="mt-1 flex items-center text-gray-600 gap-1 truncate">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate">{value.customer.href}</span>
          </div>
          {external && (
            <div className="mt-1 flex items-center text-gray-600 gap-1">
              <LucideReact.ExternalLink size={16} className="text-gray-400" />
              <span>{external.application}</span>
              <span>/</span>
              <span>{external.uid}</span>
            </div>
          )}
        </div>
      </div>

      {/* Member Emails */}
      <div>
        <h2 className="flex items-center text-sm font-medium text-gray-700 gap-1">
          <LucideReact.Mail size={16} className="text-gray-500" />
          <span>Emails</span>
        </h2>
        <ul className="mt-2 list-disc list-inside space-y-1">
          {value.member.emails.map((email) => (
            <li
              key={email.id}
              className="flex items-center text-gray-600 gap-1"
            >
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span>{email.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: Seller Account Creation */}
      <div className="flex items-center text-xs text-gray-500 gap-1">
        <LucideReact.Calendar size={16} className="text-gray-400" />
        <span>Seller account created at {sellerJoinDate}</span>
      </div>
    </div>
  );
}
