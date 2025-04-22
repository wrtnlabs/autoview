import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingDepositCharge = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingDepositCharge[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingDepositCharge;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { pagination, data } = input;

    // Header summary as markdown: shows page, total records
    const headerMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `### Deposit Charges — Page ${pagination.current}/${pagination.pages}  
_Total records: ${pagination.records}_`
    };

    // Transform each record into a DataListItem
    const listItems: IAutoView.IAutoViewDataListItemProps[] = data.map((record) => {
        // 1) Record ID and created date with icon
        const rawDate = record.created_at;
        const dateObj = new Date(rawDate);
        const formattedDate = isNaN(dateObj.getTime())
            ? rawDate
            : dateObj.toLocaleString();

        const idText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "body2",
            content: [`ID: ${record.id}`]
        };

        // Date with calendar icon
        const dateText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "caption",
            content: [
                { type: "Icon", id: "calendar", size: 12, color: "gray" },
                ` ${formattedDate}`
            ]
        };

        // 2) Channel as a chip
        const channelName = record.customer?.channel?.name ?? "Unknown channel";
        const channelChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: channelName,
            variant: "outlined",
            color: "info",
            size: "small"
        };

        // 3) Deposit value as a filled chip with currency formatting
        const valueLabel = record.value.toLocaleString(undefined, {
            style: "currency",
            currency: "USD"
        });
        const valueChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: valueLabel,
            variant: "filled",
            color: "success",
            size: "small"
        };

        return {
            type: "DataListItem",
            // Combine ID, date, and channel chip in the label section
            label: [idText, dateText, channelChip],
            // Show the monetary value as the value section
            value: valueChip
        };
    });

    // Compose the data list
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems
    };

    // Wrap everything in a card for responsiveness and mobile friendliness
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Shopping Deposit Charges",
        description: `Page ${pagination.current} of ${pagination.pages}`
    };

    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [headerMarkdown, dataList]
    };

    const rootCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };

    return rootCard;
}
