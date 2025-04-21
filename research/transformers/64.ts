import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingDepositCharge = {
        id: string & tags.Format<"uuid">;
        customer: Schema.IShoppingCustomer;
        publish: null | any;
        created_at: string & tags.Format<"date-time">;
        value: number;
    };
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
    export type IShoppingDepositChargePublish = any;
}
type IAutoViewTransformerInputType = Schema.IShoppingDepositCharge;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure frequently used fields
    const { id, created_at, value, customer } = input;

    // Format creation timestamp for readability
    const formattedDate = (() => {
        try {
            return new Date(created_at).toLocaleString();
        } catch {
            return created_at; // fallback to raw string if invalid
        }
    })();

    // Format monetary value; assume USD by default
    const formattedValue = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
    }).format(value);

    // Safely extract nested customer info with fallbacks
    const channelName = customer?.channel?.name ?? "Unknown";
    const ipAddress = customer?.ip ?? "Unknown";
    const referrer = customer?.referrer ?? null;

    // Build a list of key/value pairs to display in a DataList
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Deposit ID" },
            value: { type: "Text", content: id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Channel" },
            value: { type: "Text", content: channelName },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "IP Address" },
            value: { type: "Text", content: ipAddress },
        },
        // Only include referrer if present
        ...(referrer
            ? [
                  {
                      type: "DataListItem",
                      label: { type: "Text", content: "Referrer" },
                      // Use Markdown so that links are clickable
                      value: {
                          type: "Markdown",
                          content: `[${referrer}](${referrer})`,
                      },
                  } as IAutoView.IAutoViewDataListItemProps,
              ]
            : []),
    ];

    // Compose the final VerticalCard with a header and content section
    return {
        type: "VerticalCard",
        childrenProps: [
            // Card header shows the formatted value and timestamp, with an icon
            {
                type: "CardHeader",
                title: formattedValue,
                description: formattedDate,
                startElement: {
                    type: "Icon",
                    id: "dollar-sign", // FontAwesome "dollar-sign" icon
                    color: "green",
                },
            },
            // Card content holds the DataList of detailed properties
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
