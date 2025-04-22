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
    // Build status chips for membership, verification, and external user
    const statusChips: IAutoView.IAutoViewChipProps[] = [];
    if (input.member) {
        statusChips.push({
            type: "Chip",
            label: "Member",
            variant: "filled",
            color: "success",
        });
    } else {
        statusChips.push({
            type: "Chip",
            label: "Guest",
            variant: "filled",
            color: "gray",
        });
    }
    if (input.citizen) {
        statusChips.push({
            type: "Chip",
            label: "Verified",
            variant: "outlined",
            color: "primary",
        });
    }
    if (input.external_user) {
        statusChips.push({
            type: "Chip",
            label: "External",
            variant: "outlined",
            color: "info",
        });
    }

    // Compose the key/value list of properties to display
    const connectionDetails: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Connected At",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.created_at,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: `${input.channel.name} (${input.channel.code})`,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "IP Address",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.ip,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Referrer",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.referrer || "—",
                variant: "body2",
            },
        },
    ];

    // Header: show a user icon and the connection ID
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Connection ${input.id}`,
        description: input.id,
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 24,
        },
    };

    // Main content: a DataList of details, followed by a ChipGroup of statuses
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: connectionDetails,
            },
            {
                type: "ChipGroup",
                childrenProps: statusChips,
            },
        ],
    };

    // Optional footer: a button to open the connection href
    const footer: IAutoView.IAutoViewCardFooterProps | null = input.href
        ? {
              type: "CardFooter",
              childrenProps: [
                  {
                      type: "Button",
                      label: "Visit Site",
                      href: input.href,
                      startElement: {
                          type: "Icon",
                          id: "external-link-alt",
                          size: 20,
                          color: "cyan",
                      },
                      variant: "outlined",
                      color: "primary",
                  },
              ],
          }
        : null;

    // Build the vertical card; omit footer if no href
    const children: IAutoView.IAutoViewVerticalCardProps["childrenProps"] = [header, content];
    if (footer) {
        children.push(footer);
    }

    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
