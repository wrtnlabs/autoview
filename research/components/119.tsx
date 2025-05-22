import { tags } from "typia";
import React from "react";
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
    export type IShoppingExternalUser = any;
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
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  };
  const maskMobile = (mobile: string) =>
    mobile.replace(/\d(?=\d{4})/g, "*");

  const {
    member,
    customer,
    citizen,
    created_at: sellerCreatedAt,
  } = value;

  const sellerSignup = formatDate(sellerCreatedAt);
  const memberSignup = formatDate(member.created_at);
  const primaryEmail = member.emails.length
    ? member.emails[0].value
    : "-";
  const customerSignup = formatDate(customer.created_at);
  const channelName = customer.channel.name;
  const ipAddress = customer.ip;
  let refHost = "-";
  if (customer.referrer) {
    try {
      refHost = new URL(customer.referrer).host;
    } catch {
      refHost = customer.referrer;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Seller Overview
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Seller & Member Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Account Info
          </h3>
          <dl className="text-gray-600 space-y-2">
            <div className="flex justify-between">
              <dt className="font-medium">Seller Since:</dt>
              <dd className="truncate">{sellerSignup}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Member:</dt>
              <dd>{member.nickname}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Joined:</dt>
              <dd className="truncate">{memberSignup}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Primary Email:</dt>
              <dd className="truncate">{primaryEmail}</dd>
            </div>
          </dl>
        </div>
        {/* Customer & Citizen Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Verification & Connection
          </h3>
          <dl className="text-gray-600 space-y-2">
            <div className="flex justify-between">
              <dt className="font-medium">Name:</dt>
              <dd className="truncate">{citizen.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Mobile:</dt>
              <dd className="truncate">{maskMobile(citizen.mobile)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Channel:</dt>
              <dd className="truncate">{channelName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">IP Address:</dt>
              <dd className="truncate">{ipAddress}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">First Connection:</dt>
              <dd className="truncate">{customerSignup}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Referrer:</dt>
              <dd className="truncate">{refHost}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
