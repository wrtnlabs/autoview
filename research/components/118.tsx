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
  const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }) =>
    new Date(iso).toLocaleDateString(undefined, opts);

  const truncate = (text: string, max: number = 40) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  const displayName = `${value.member.nickname} (${value.citizen.name})`;

  const sellerSince = formatDate(value.created_at);
  const memberSince = formatDate(value.member.created_at);
  const customerSince = formatDate(value.customer.created_at);
  const citizenSince = formatDate(value.citizen.created_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{displayName}</h2>
        <span className="mt-2 sm:mt-0 inline-block bg-indigo-100 text-indigo-800 text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-full">
          {value.type}
        </span>
      </div>

      {/* Details Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Info */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Member Info</h3>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Nickname:</span> {value.member.nickname}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Joined:</span> {memberSince}
          </p>
          <div className="mt-2">
            <span className="font-semibold text-gray-700">Emails:</span>
            <ul className="mt-1 space-y-1">
              {value.member.emails.map((email) => (
                <li key={email.id} className="text-sm text-gray-600 truncate">
                  {email.value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Citizen Info */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Citizen Info</h3>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Real Name:</span> {value.citizen.name}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Mobile:</span> {value.citizen.mobile}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Verified:</span> {citizenSince}
          </p>
        </section>

        {/* Customer Connection */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Customer Connection</h3>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Channel:</span> {value.customer.channel.name} ({value.customer.channel.code})
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">IP:</span> {value.customer.ip}
          </p>
          {value.customer.referrer && (
            <p className="mt-1 text-gray-700">
              <span className="font-semibold">Referrer:</span> {truncate(value.customer.referrer)}
            </p>
          )}
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">URL:</span> {truncate(value.customer.href)}
          </p>
        </section>

        {/* Metadata */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Metadata</h3>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Seller Since:</span> {sellerSince}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Customer Record:</span> {customerSince}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Channel Created:</span> {formatDate(value.customer.channel.created_at, { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </section>
      </div>
    </div>
  );
}
