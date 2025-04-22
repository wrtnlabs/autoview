import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingAdministrator.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transform administrator invert data into an AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO timestamps to a user-friendly locale string
  const formatDate = (iso: string): string => new Date(iso).toLocaleString();

  // Build a list of DataListItemProps for each piece of info
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Admin ID",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: input.id,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Registered",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: formatDate(input.created_at),
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Member",
        variant: "subtitle2",
        color: "gray",
      },
      // Highlight the nickname with a colored chip
      value: {
        type: "Chip",
        label: input.member.nickname,
        variant: "filled",
        size: "small",
        color: "teal",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Emails",
        variant: "subtitle2",
        color: "gray",
      },
      // Render each email as its own chip for compactness
      value: input.member.emails.map((email) => ({
        type: "Chip",
        label: email.value,
        variant: "outlined",
        size: "small",
        color: "blue",
      })),
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Channel",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: input.customer.channel.name,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "IP Address",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: input.customer.ip,
        variant: "body1",
      },
    },
  ];

  // Optionally add referrer link if provided
  if (input.customer.referrer) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Referrer",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Markdown",
        // Render as clickable link
        content: `[${input.customer.referrer}](${input.customer.referrer})`,
      },
    });
  }

  // Add citizen verification info as chips
  dataItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Citizen",
      variant: "subtitle2",
      color: "gray",
    },
    value: [
      {
        type: "Chip",
        label: input.citizen.name,
        variant: "filled",
        size: "small",
        color: "violet",
      },
      {
        type: "Chip",
        label: input.citizen.mobile,
        variant: "outlined",
        size: "small",
        color: "indigo",
      },
    ],
  });

  // Create a visually distinctive card header
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Administrator Profile",
    startElement: {
      type: "Icon",
      id: "user-shield",
      color: "indigo",
      size: 32,
    },
  };

  // Wrap the list in a CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataItems,
    } as IAutoView.IAutoViewDataListProps,
  };

  // Return a responsive vertical card combining header and content
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
