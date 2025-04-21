import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingMileageDonation = {
        id: string & tags.Format<"uuid">;
        administrator: Schema.IShoppingAdministrator.IInvert;
        citizen: Schema.IShoppingCitizen;
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
            member: Schema.IShoppingMember.IInvert;
            /**
             * Customer, the connection information.
             *
             * @title Customer, the connection information
            */
            customer: Schema.IShoppingCustomer.IInvert;
            /**
             * Real-name and mobile number authentication information.
             *
             * @title Real-name and mobile number authentication information
            */
            citizen: Schema.IShoppingCitizen;
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
            emails: Schema.IShoppingMemberEmail[];
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
            channel: Schema.IShoppingChannel;
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
type IAutoViewTransformerInputType = Schema.IShoppingMileageDonation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Compose a vertical card to display a donation record
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header: shows a gift icon, title, donation amount and timestamp
      {
        type: "CardHeader",
        // Title includes the donation ID
        title: `Donation #${input.id}`,
        // Brief description of the donated value
        description: `Donated ${input.value} points`,
        // Gift icon to visually represent the donation
        startElement: {
          type: "Icon",
          id: "gift",
          color: "cyan",
          size: 32,
        },
        // Display creation date/time in the header for quick glance
        endElement: {
          type: "Text",
          content: input.created_at,
          variant: "caption",
          color: "gray",
        },
      },
      // Content: detailed fields laid out as a data list
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: [
            // Administrator information
            {
              type: "DataListItem",
              label: {
                type: "Text",
                content: "Administrator",
                variant: "subtitle2",
                color: "secondary",
              },
              value: {
                type: "Text",
                content: input.administrator.member.nickname,
                variant: "body1",
              },
            },
            // Citizen (real user) information
            {
              type: "DataListItem",
              label: {
                type: "Text",
                content: "Citizen",
                variant: "subtitle2",
                color: "secondary",
              },
              value: {
                type: "Text",
                content: input.citizen.name,
                variant: "body1",
              },
            },
            // Reason field rendered as markdown for richer formatting
            {
              type: "DataListItem",
              label: {
                type: "Text",
                content: "Reason",
                variant: "subtitle2",
                color: "secondary",
              },
              value: {
                type: "Markdown",
                content: input.reason,
              },
            },
          ],
        },
      },
      // Footer: action button linking to the customer's session or profile
      {
        type: "CardFooter",
        childrenProps: [
          {
            type: "Button",
            label: "View Session",
            variant: "outlined",
            // User icon to indicate navigation to a user-related page
            startElement: {
              type: "Icon",
              id: "user",
              color: "blue",
              size: 16,
            },
            // Use the recorded connection URL for deep-linking
            href: input.administrator.customer.href,
          },
        ],
      },
    ],
  };
}
