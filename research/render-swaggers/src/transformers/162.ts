import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingChannel = {
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
        data: Schema.IShoppingChannel[];
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
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingChannel;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure pagination and channel list
    const { pagination, data: channels } = input;
    const { current, pages } = pagination;

    // Build a DataListItemProps array for each shopping channel
    const listItems: IAutoView.IAutoViewDataListItemProps[] = channels.map((channel) => {
        // Avatar showing the first letter of channel name
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: channel.name.charAt(0).toUpperCase(),
            variant: "primary",
            size: 32,
        };

        // Text component for full channel name
        const nameText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: channel.name,
            variant: "body1",
        };

        // Chip component for channel code
        const codeChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: channel.code,
            color: "secondary",
            variant: "filled",
            size: "small",
        };

        // Text component for creation date
        const dateText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: new Date(channel.created_at).toLocaleDateString(),
            variant: "caption",
            color: "#888888",
        };

        return {
            type: "DataListItem",
            // Label area: avatar + channel name
            label: [avatar, nameText],
            // Value area: code chip + creation date
            value: [codeChip, dateText],
        };
    });

    // DataList wrapping all items
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // CardHeader with an icon and pagination info
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Shopping Channels",
        description: `Page ${current} of ${pages}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            color: "blue",
            size: 24,
        },
    };

    // CardContent containing the data list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Wrap in a vertical card for responsive display
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
