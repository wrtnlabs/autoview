import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingSeller.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { id, created_at, member, customer, citizen } = input;

  // Transform member emails into Chip components for visual grouping
  const emailChips: IAutoView.IAutoViewChipProps[] = member.emails.map((email) => ({
    type: "Chip",
    label: email.value,
    size: "small",
    variant: "outlined",
  }));

  // If there's an external_user payload, render it as a JSON code block via Markdown
  const externalUserMd = customer.external_user
    ? {
        type: "Markdown" as const,
        content: "json\n" + JSON.stringify(customer.external_user, null, 2) + "\n```",
      }
    : undefined;

  // Build the list of data list items for all nested fields
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Member Nickname"], variant: "body2" },
      value: { type: "Text", content: [member.nickname], variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Member Joined At"], variant: "body2" },
      value: { type: "Text", content: [member.created_at], variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Member Emails"], variant: "body2" },
      value: { type: "ChipGroup", childrenProps: emailChips },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Customer Channel"], variant: "body2" },
      value: {
        type: "Chip",
        label: customer.channel.name,
        size: "small",
        variant: "outlined",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Customer Connection IP"], variant: "body2" },
      value: { type: "Text", content: [customer.ip], variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Customer Connected At"], variant: "body2" },
      value: { type: "Text", content: [customer.created_at], variant: "body2" },
    },
  ];

  // Optionally include referrer if provided
  if (customer.referrer) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: ["Customer Referrer"], variant: "body2" },
      value: { type: "Text", content: [customer.referrer], variant: "body2" },
    });
  }

  // Optionally include external user JSON details
  if (externalUserMd) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: ["External User Info"], variant: "body2" },
      value: externalUserMd,
    });
  }

  // Citizen verification details
  dataListItems.push(
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Citizen Name"], variant: "body2" },
      value: { type: "Text", content: [citizen.name], variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Citizen Mobile"], variant: "body2" },
      value: { type: "Text", content: [citizen.mobile], variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: ["Citizen Verified At"], variant: "body2" },
      value: { type: "Text", content: [citizen.created_at], variant: "body2" },
    }
  );

  // Compose the overall VerticalCard with header, content, and a footer button
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Show seller nickname prominently, add a store icon for quick recognition
        title: `Seller: ${member.nickname}`,
        description: `Record ID: ${id}`,
        startElement: {
          type: "Icon",
          id: "store",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Use a DataList for structured, responsive display of nested details
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
      {
        type: "CardFooter",
        // A simple action button — could be wired up to more interactions in UI
        childrenProps: {
          type: "Button",
          variant: "text",
          label: ["View More"],
          color: "primary",
        },
      },
    ],
  };
}
