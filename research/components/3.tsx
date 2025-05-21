import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingAdministrator.IInvert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const signupDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const memberJoinDate = new Date(value.member.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const customerVisitDate = new Date(value.customer.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const citizenVerifiedDate = new Date(value.citizen.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Administrator Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Administrator Profile</h2>
        <span className="px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded">
          {value.type.charAt(0).toUpperCase() + value.type.slice(1)}
        </span>
      </div>

      {/* Sign-up Date */}
      <div className="text-gray-600">
        <span className="font-medium text-gray-800">Signed Up On:</span> {signupDate}
      </div>

      {/* Member Information */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Member Information</h3>
        <div className="text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Nickname:</span> {value.member.nickname}
          </p>
          <p>
            <span className="font-medium text-gray-800">Joined:</span> {memberJoinDate}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {value.member.emails.map((email) => (
            <span
              key={email.id}
              className="px-2 py-1 text-sm text-indigo-800 bg-indigo-100 rounded"
            >
              {email.value}
            </span>
          ))}
        </div>
      </section>

      {/* Customer Connection Info */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Customer Connection</h3>
        <div className="text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Channel:</span> {value.customer.channel.name}
          </p>
          <p>
            <span className="font-medium text-gray-800">IP Address:</span> {value.customer.ip}
          </p>
          <p>
            <span className="font-medium text-gray-800">First Connected:</span> {customerVisitDate}
          </p>
          <p className="truncate break-all">
            <span className="font-medium text-gray-800">URL:</span> {value.customer.href}
          </p>
        </div>
      </section>

      {/* Citizen Verification */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Verification Details</h3>
        <div className="text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Name:</span> {value.citizen.name}
          </p>
          <p>
            <span className="font-medium text-gray-800">Mobile:</span> {value.citizen.mobile}
          </p>
          <p>
            <span className="font-medium text-gray-800">Verified On:</span> {citizenVerifiedDate}
          </p>
        </div>
      </section>
    </div>
  );
}
