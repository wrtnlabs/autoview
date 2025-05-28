import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
        export interface IInvert {
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
        }
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
        export interface IInvert {
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
        export interface IInvert {
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
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingAdministrator.IInvert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center text-lg font-semibold text-gray-700">
          <LucideReact.User className="mr-2 text-indigo-500" size={20} />
          <span>Administrator Profile</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <LucideReact.Calendar size={14} />
          <span>Since {formatDate(value.created_at)}</span>
        </div>
      </div>

      {/* Member & Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Section */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 font-semibold">
            <LucideReact.Users className="mr-2 text-gray-500" size={18} />
            Member Info
          </div>
          <div className="pl-6 space-y-1 text-gray-800">
            <div className="flex items-center gap-2">
              <LucideReact.User size={16} className="text-gray-400" />
              <span className="font-medium">Nickname:</span>
              <span className="truncate">{value.member.nickname}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span className="font-medium">Joined:</span>
              <span>{formatDate(value.member.created_at)}</span>
            </div>
            <div className="flex items-start gap-1">
              <LucideReact.Mail size={16} className="text-gray-400 mt-1" />
              <div>
                <span className="font-medium">Emails:</span>
                <ul className="list-disc ml-5 space-y-0.5 text-gray-700">
                  {value.member.emails.map((e) => (
                    <li key={e.id} className="truncate">
                      {e.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Section */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 font-semibold">
            <LucideReact.ShoppingCart className="mr-2 text-gray-500" size={18} />
            Customer Info
          </div>
          <div className="pl-6 space-y-1 text-gray-800">
            <div className="flex items-center gap-2">
              <LucideReact.Tag size={16} className="text-gray-400" />
              <span className="font-medium">Channel:</span>
              <span>{value.customer.channel.name}</span>
            </div>

            {value.customer.external_user && (
              <div className="flex items-start gap-2">
                <LucideReact.ExternalLink size={16} className="text-gray-400 mt-1" />
                <div>
                  <span className="font-medium">External User:</span>
                  <div className="pl-4 space-y-0.5 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="italic">
                        {value.customer.external_user.application} /
                        {value.customer.external_user.uid}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideReact.Calendar size={16} className="text-gray-400" />
                      <span>{formatDate(value.customer.external_user.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="font-medium">URL:</span>
              <span className="truncate">{value.customer.href}</span>
            </div>
            {value.customer.referrer && (
              <div className="flex items-center gap-2">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="font-medium">Referrer:</span>
                <span className="truncate">{value.customer.referrer}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <LucideReact.Globe size={16} className="text-gray-400" />
              <span className="font-medium">IP:</span>
              <span>{value.customer.ip}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span className="font-medium">Connected:</span>
              <span>{formatDate(value.customer.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Citizen Section */}
      <div className="space-y-2">
        <div className="flex items-center text-gray-600 font-semibold">
          <LucideReact.CheckCircle className="mr-2 text-green-500" size={18} />
          Citizen Verification
        </div>
        <div className="pl-6 space-y-1 text-gray-800">
          <div className="flex items-center gap-2">
            <LucideReact.User size={16} className="text-gray-400" />
            <span className="font-medium">Name:</span>
            <span>{value.citizen.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Phone size={16} className="text-gray-400" />
            <span className="font-medium">Mobile:</span>
            <span>{value.citizen.mobile}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="font-medium">Verified:</span>
            <span>{formatDate(value.citizen.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
