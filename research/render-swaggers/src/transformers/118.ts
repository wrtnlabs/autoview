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
  // Prepare a list of DataListItemProps to show key/value pairs
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Seller primary key
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Seller ID" },
    value: { type: "Text", content: input.id },
  });

  // Seller signup time
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Signed Up" },
    value: { type: "Text", content: input.created_at },
  });

  // Real name (citizen)
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Real Name" },
    value: { type: "Text", content: input.citizen.name },
  });

  // Mobile number
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Mobile" },
    value: { type: "Text", content: input.citizen.mobile },
  });

  // Member nickname
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Nickname" },
    value: { type: "Text", content: input.member.nickname },
  });

  // Member emails as a ChipGroup for better visual density
  if (input.member.emails && input.member.emails.length > 0) {
    const emailChips: IAutoView.IAutoViewChipProps[] = input.member.emails.map((e) => ({
      type: "Chip",
      label: e.value,
      size: "small",
      variant: "filled",
      color: "secondary",
    }));

    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Emails" },
      value: { type: "ChipGroup", childrenProps: emailChips },
    });
  }

  // Customer channel
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Channel" },
    value: { type: "Text", content: input.customer.channel.name },
  });

  // Connection IP
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "IP Address" },
    value: { type: "Text", content: input.customer.ip },
  });

  // Connection timestamp
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Connected At" },
    value: { type: "Text", content: input.customer.created_at },
  });

  // Connection URL (if available)
  if (input.customer.href) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "URL" },
      value: { type: "Text", content: input.customer.href },
    });
  }

  // Referrer (if available)
  if (input.customer.referrer) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Referrer" },
      value: { type: "Text", content: input.customer.referrer },
    });
  }

  // Compose the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // CardHeader with an avatar for a quick visual cue
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.citizen.name,
    description: `@${input.member.nickname}`,
    startElement: {
      type: "Avatar",
      name: input.citizen.name,
      size: 40,
      variant: "primary",
    },
  };

  // CardContent wrapping the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a VerticalCard combining header and content for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
