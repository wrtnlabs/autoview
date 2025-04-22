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
   * Compose the card header to surface the channel name and code.
   */
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.channel.name,
    description: `Channel Code: ${input.channel.code}`,
    startElement: {
      type: "Icon",
      id: "tag",
      color: "cyan",
      size: 24,
    },
  };

  /**
   * Helper to create a DataListItem for a given icon, label, and value component.
   */
  function createItem(
    iconId: string,
    labelText: string,
    valueComponent: IAutoView.IAutoViewTextProps | IAutoView.IAutoViewMarkdownProps
  ): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      label: [
        { type: "Icon", id: iconId, color: "blue", size: 16 },
        { type: "Text", content: labelText, variant: "body2" },
      ],
      value: valueComponent,
    };
  }

  // Build up the list of data points for the DataList.
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Customer primary key
  items.push(
    createItem(
      "fingerprint",
      "Customer ID",
      { type: "Text", content: input.id, variant: "body2" }
    )
  );

  // Connection timestamp
  items.push(
    createItem(
      "calendar-days",
      "Connected At",
      { type: "Text", content: input.created_at, variant: "body2" }
    )
  );

  // Current page URL
  items.push(
    createItem(
      "link",
      "URL",
      { type: "Markdown", content: `[Visit](${input.href})` }
    )
  );

  // Referrer (may be null or empty)
  const referrer = input.referrer && input.referrer.length > 0 ? input.referrer : null;
  items.push(
    createItem(
      "external-link-alt",
      "Referrer",
      referrer
        ? { type: "Markdown", content: `[${referrer}](${referrer})` }
        : { type: "Text", content: "None", variant: "body2" }
    )
  );

  // IP address
  items.push(
    createItem(
      "server",
      "IP Address",
      { type: "Text", content: input.ip, variant: "body2" }
    )
  );

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Wrap everything in a responsive vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      { type: "CardContent", childrenProps: [dataList] },
    ],
  };

  return card;
}
