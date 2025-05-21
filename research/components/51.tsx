import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingCustomer {
        export type IAuthorized = {
            setHeaders: {
                Authorization: string;
            };
            token: AutoViewInputSubTypes.IShoppingCustomer.IToken;
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
        export type IToken = {
            access: string;
            refresh: string;
            expired_at: string & tags.Format<"date-time">;
            refreshable_until: string & tags.Format<"date-time">;
        };
    }
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
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCustomer.IAuthorized;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const connectedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const tokenExpiry = new Date(value.token.expired_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const refreshUntil = new Date(value.token.refreshable_until).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isMember = value.member != null ? "Yes" : "No";
  const isCitizen = value.citizen != null ? "Yes" : "No";
  const isExternal = value.external_user != null ? "Yes" : "No";
  const referrerDisplay = value.referrer ? String(value.referrer) : "None";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Session</h2>
      <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <dt className="text-sm text-gray-600">Channel</dt>
          <dd className="mt-1 text-sm text-gray-800">{value.channel.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">IP Address</dt>
          <dd className="mt-1 text-sm text-gray-800">{value.ip}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Connected At</dt>
          <dd className="mt-1 text-sm text-gray-800">{connectedAt}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Referrer</dt>
          <dd className="mt-1 text-sm text-blue-600 truncate max-w-xs">
            {referrerDisplay}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-600">Connection URL</dt>
          <dd className="mt-1 text-sm text-blue-600 truncate">{value.href}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Member</dt>
          <dd className="mt-1 text-sm text-gray-800">{isMember}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Citizen Verified</dt>
          <dd className="mt-1 text-sm text-gray-800">{isCitizen}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">External User</dt>
          <dd className="mt-1 text-sm text-gray-800">{isExternal}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-600">Token Expires</dt>
          <dd className="mt-1 text-sm text-gray-800">{tokenExpiry}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-600">Refreshable Until</dt>
          <dd className="mt-1 text-sm text-gray-800">{refreshUntil}</dd>
        </div>
      </dl>
    </div>
  );
}
