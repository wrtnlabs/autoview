import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingCustomer;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Compose status chips summarizing member, citizen, and external-user status
  const statusChips: IAutoView.IAutoViewChipProps[] = [];
  // Member status
  statusChips.push({
    type: "Chip",
    label: input.member ? "Member" : "Guest",
    color: input.member ? "green" : "gray",
    startElement: {
      type: "Icon",
      id: input.member ? "id-card" : "user-secret",
      color: input.member ? "green" : "gray",
      size: 16,
    },
  });
  // Citizen (real‑name) verification status
  statusChips.push({
    type: "Chip",
    label: input.citizen ? "Verified" : "Unverified",
    color: input.citizen ? "blue" : "gray",
    startElement: {
      type: "Icon",
      id: input.citizen ? "id-badge" : "exclamation-circle",
      color: input.citizen ? "blue" : "gray",
      size: 16,
    },
  });
  // External user linkage
  if (input.external_user != null) {
    statusChips.push({
      type: "Chip",
      label: "External",
      color: "orange",
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        color: "orange",
        size: 16,
      },
    });
  }

  // 2. Build detailed data list (key/value pairs)
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Customer ID",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.id,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Channel",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: `${input.channel.name} (${input.channel.code})`,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "IP Address",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.ip,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Connected At",
        variant: "subtitle2",
      },
      // Format timestamp in user's locale for readability
      value: {
        type: "Text",
        content: new Date(input.created_at).toLocaleString(),
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Referrer",
        variant: "subtitle2",
      },
      // Show fallback when no referrer is available
      value: {
        type: "Text",
        content: input.referrer && input.referrer.length > 0 ? input.referrer : "None",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "URL",
        variant: "subtitle2",
      },
      // A clickable button to view the connection URL
      value: {
        type: "Button",
        variant: "text",
        label: ["Visit"],
        startElement: {
          type: "Icon",
          id: "link",
          color: "blue",
          size: 16,
        },
        href: input.href,
      },
    },
  ];

  // 3. Assemble the full card: header, content (datalist), footer (status chips)
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Customer Record`,
    description: input.channel.name,
    startElement: {
      type: "Icon",
      id: "user",
      color: "blue",
      size: 32,
    },
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataItems,
    },
  };

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // Render all status chips in a responsive layout
    childrenProps: statusChips,
  };

  // 4. Return a vertical card wrapping header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
