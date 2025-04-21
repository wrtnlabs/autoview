import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingChannel;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // We choose a vertical card to present shopping channel information in a compact, responsive layout.
    // CardHeader displays the channel name with a store icon.
    // CardContent shows a data list of key properties: channel code and creation date.
    // CardFooter shows the internal ID in a caption style.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        // Use a store icon to visually represent a shopping channel.
        startElement: {
            type: "Icon",
            id: "store",
            color: "blue",
            size: 24,
        },
    };

    // A DataList to show structured key–value pairs.
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        variant: "body2",
                        content: "Channel Code",
                    },
                    value: {
                        type: "Chip",
                        label: input.code,
                        variant: "filled",
                        color: "cyan",
                        size: "small",
                    },
                },
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        variant: "body2",
                        content: "Created At",
                    },
                    // Format creation date for readability.
                    value: {
                        type: "Text",
                        variant: "body2",
                        content: new Date(input.created_at).toLocaleString(),
                    },
                },
            ],
        },
    };

    // Footer shows the record ID in a smaller caption; helpful for debugging/tracking.
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            variant: "caption",
            content: `ID: ${input.id}`,
        },
    };

    return {
        // The top-level component is a VerticalCard combining header, content, and footer.
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
