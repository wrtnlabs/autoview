import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type IShoppingMileageDonation = {
        id: string & tags.Format<"uuid">;
        administrator: AutoViewInputSubTypes.IShoppingAdministrator.IInvert;
        citizen: AutoViewInputSubTypes.IShoppingCitizen;
        value: number;
        reason: string;
        created_at: string & tags.Format<"date-time">;
    };
    export namespace IShoppingAdministrator {
        /**
         * Invert information starting from administrator info.
         *
         * Instead of accessing to the administrator information from the
         * {@link IShoppingCustomer.member} -> {@link IShoppingMember.administrator},
         * `IShoppingAdministrator.IInvert` starts from the administrator information
         * and access to the customer, member and {@link IShoppingCitizen citizen}
         * information inversely.
        */
        export type IInvert = {
            /**
             * Discriminant for the type of customer.
             *
             * @title Discriminant for the type of customer
            */
            type: "administrator";
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
             * Creation time of record.
             *
             * Another words, the time when the administrator has signed up.
             *
             * @title Creation time of record
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileageDonation;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived and formatted values
  const formattedValue = `${value.value.toLocaleString()} miles`;
  const formattedDate = new Date(value.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const adminNickname = value.administrator.member.nickname;
  const adminName = value.administrator.citizen.name;
  const adminEmails = value.administrator.member.emails
    .map((e) => e.value)
    .join(", ");
  const receiverName = value.citizen.name;
  const receiverMobile = (() => {
    const m = value.citizen.mobile.replace(/\D/g, "");
    const last4 = m.slice(-4);
    return `•••${last4}`;
  })();
  const channelName = value.administrator.customer.channel.name;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Mileage Donation</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Amount</dt>
          <dd className="mt-1 text-lg font-semibold text-green-600">{formattedValue}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Date</dt>
          <dd className="mt-1 text-sm text-gray-700">{formattedDate}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Reason</dt>
          <dd className="mt-1 text-sm text-gray-700 line-clamp-2">{value.reason}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Administrator</dt>
          <dd className="mt-1 text-sm text-gray-700">
            {adminNickname} ({adminName})
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Admin Email</dt>
          <dd className="mt-1 text-sm text-gray-700">{adminEmails}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Receiver</dt>
          <dd className="mt-1 text-sm text-gray-700">{receiverName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Mobile</dt>
          <dd className="mt-1 text-sm text-gray-700">{receiverMobile}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Channel</dt>
          <dd className="mt-1 text-sm text-gray-700">{channelName}</dd>
        </div>
      </dl>
    </div>
  );
}
