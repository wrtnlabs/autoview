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
  /**
   * Build a user icon for the card header.
   */
  const userIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "user",
    color: "blue",
    size: 32,
  };

  /**
   * Attempt to format the ISO timestamp into a human‐readable locale string.
   * If parsing fails, fall back to the raw value.
   */
  let connectedAt = input.created_at;
  try {
    const d = new Date(input.created_at);
    if (!isNaN(d.getTime())) {
      connectedAt = d.toLocaleString();
    }
  } catch {
    // Keep original string if Date parsing fails
  }

  /**
   * Prepare a list of data items to display.
   * We use DataListItem for each field, preferring interactive or visual elements.
   */
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Channel", variant: "subtitle2" }],
      value: [
        {
          type: "Text",
          content: `${input.channel.name} (${input.channel.code})`,
          variant: "body1",
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Connection URL", variant: "subtitle2" }],
      // Render as clickable link via Markdown
      value: [
        {
          type: "Markdown",
          content: `[Open Session](${input.href})`,
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Referrer", variant: "subtitle2" }],
      value: input.referrer
        ? [
            {
              type: "Markdown",
              content: `[Go Back](${input.referrer})`,
            },
          ]
        : [
            {
              type: "Text",
              content: "N/A",
              variant: "body2",
            },
          ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "IP Address", variant: "subtitle2" }],
      value: [
        {
          type: "Text",
          content: input.ip,
          variant: "body1",
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Connected At", variant: "subtitle2" }],
      value: [
        {
          type: "Text",
          content: connectedAt,
          variant: "body1",
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Member Status", variant: "subtitle2" }],
      value: [
        {
          type: "Chip",
          label: input.member ? "Member" : "Guest",
          variant: "filled",
          color: input.member ? "success" : "gray",
          size: "small",
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Citizen Verified", variant: "subtitle2" }],
      value: [
        {
          type: "Chip",
          label: input.citizen ? "Verified" : "Unverified",
          variant: "filled",
          color: input.citizen ? "success" : "error",
          size: "small",
        },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "External Service", variant: "subtitle2" }],
      value: [
        {
          type: "Chip",
          label: input.external_user ? "Connected" : "None",
          variant: "outlined",
          color: input.external_user ? "primary" : "gray",
          size: "small",
        },
      ],
    },
  ];

  /**
   * Wrap our items in a DataList component.
   */
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  /**
   * Compose a VerticalCard containing a header and the data list.
   * This layout is mobile‐friendly and collapses naturally.
   */
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: `Customer ID: ${input.id}`,
        description: `Channel: ${input.channel.name}`,
        startElement: userIcon,
      },
      {
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };

  return card;
}
