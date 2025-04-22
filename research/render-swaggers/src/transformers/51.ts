import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingCustomer {
        export type IAuthorized = {
            setHeaders: {
                Authorization: string;
            };
            token: Schema.IShoppingCustomer.IToken;
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
type IAutoViewTransformerInputType = Schema.IShoppingCustomer.IAuthorized;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure relevant fields for easier reference
  const { id, channel, created_at, href, referrer, ip, token } = input;

  /**
   * Helper to build a DataListItemProps entry.
   * Wraps label and value in Text components for consistency.
   */
  function createItem(
    label: string,
    value: string
  ): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      // Labels rendered in a muted style
      label: [
        {
          type: "Text",
          content: label,
          variant: "subtitle2",
          color: "gray"
        }
      ],
      // Values rendered prominently
      value: [
        {
          type: "Text",
          content: value,
          variant: "body1"
        }
      ]
    };
  }

  // Fallback for missing referrer
  const referrerText = referrer && referrer.length ? referrer : "N/A";

  // Build a VerticalCard to organize the information
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header: Customer identity
      {
        type: "CardHeader",
        title: id,
        description: channel.name,
        startElement: {
          type: "Icon",
          id: "user",
          size: 32,
          color: "blue"
        }
      },
      // Main content: data list and token details
      {
        type: "CardContent",
        childrenProps: [
          // List of key connection attributes
          {
            type: "DataList",
            childrenProps: [
              createItem("Channel Code", channel.code),
              createItem("Channel Created At", channel.created_at),
              createItem("Connection Created At", created_at),
              createItem("IP Address", ip),
              createItem("Referrer", referrerText),
              createItem("Current URL", href)
            ]
          },
          // Visual separator
          {
            type: "Divider",
            orientation: "horizontal",
            color: "#e0e0e0"
          },
          // Token information in markdown for code formatting
          {
            type: "Markdown",
            content: [
              "### Token Information",
              `- **Access**: \`${token.access}\``,
              `- **Refresh**: \`${token.refresh}\``,
              `- **Expires At**: ${token.expired_at}`,
              `- **Refreshable Until**: ${token.refreshable_until}`
            ].join("\n")
          }
        ]
      }
    ]
  };
}
