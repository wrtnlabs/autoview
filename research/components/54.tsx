import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCustomer;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const userType = value.external_user
    ? 'External Service User'
    : value.member
    ? 'Member'
    : value.citizen
    ? 'Verified Citizen'
    : 'Guest';
  const formattedDate = new Date(value.created_at).toLocaleString();
  const displayReferrer =
    value.referrer && value.referrer.trim() !== '' ? value.referrer : 'Direct';
  const shortId = `${value.id.slice(0, 8)}…`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.channel.name}
        </h2>
        <span className="px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded">
          {userType}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-y-2">
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Session ID</dt>
          <dd className="text-sm text-gray-900 font-mono">{shortId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Channel Code</dt>
          <dd className="text-sm text-gray-900">{value.channel.code}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Visited URL</dt>
          <dd className="text-sm text-gray-900 truncate">{value.href}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Referrer</dt>
          <dd className="text-sm text-gray-900 truncate">{displayReferrer}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">IP Address</dt>
          <dd className="text-sm text-gray-900">{value.ip}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Connected At</dt>
          <dd className="text-sm text-gray-900">
            <time dateTime={value.created_at}>{formattedDate}</time>
          </dd>
        </div>
      </dl>
    </div>
  );
}
