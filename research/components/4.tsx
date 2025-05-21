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
  const adminSince = new Date(value.created_at).toLocaleString();
  const memberSince = new Date(value.member.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const connectionSince = new Date(value.customer.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const emailList = value.member.emails.map((e) => e.value);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Administrator Details</h2>
      <div className="space-y-6">
        {/* General Administrator Info */}
        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Profile</h3>
          <dl className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{value.citizen.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Mobile</dt>
              <dd className="mt-1 text-sm text-gray-900">{value.citizen.mobile}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Joined Administrator</dt>
              <dd className="mt-1 text-sm text-gray-900">{adminSince}</dd>
            </div>
          </dl>
        </section>

        {/* Member Information */}
        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Membership</h3>
          <dl className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nickname</dt>
              <dd className="mt-1 text-sm text-gray-900">{value.member.nickname}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Emails</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {emailList.map((email) => (
                  <span
                    key={email}
                    className="bg-gray-100 text-gray-800 text-xs font-mono px-2 py-1 rounded-lg"
                  >
                    {email}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Member Since</dt>
              <dd className="mt-1 text-sm text-gray-900">{memberSince}</dd>
            </div>
          </dl>
        </section>

        {/* Customer Connection Info */}
        <section>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Connection</h3>
          <dl className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Channel</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {value.customer.channel.name} ({value.customer.channel.code})
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">IP Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{value.customer.ip}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">URL</dt>
              <dd className="mt-1 text-sm text-gray-900 overflow-hidden truncate">
                {value.customer.href}
              </dd>
            </div>
            {value.customer.referrer && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Referrer</dt>
                <dd className="mt-1 text-sm text-gray-900 overflow-hidden truncate">
                  {value.customer.referrer}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Connected On</dt>
              <dd className="mt-1 text-sm text-gray-900">{connectionSince}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
