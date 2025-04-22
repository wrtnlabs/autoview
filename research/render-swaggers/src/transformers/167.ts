import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Section information.
     *
     * `IShoppingSection` is a concept that refers to the spatial information of
     * the market.
     *
     * If we compare the section mentioned here to the offline market, it means a
     * spatially separated area within the store, such as the "fruit corner" or
     * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
     * not possible to classify multiple sections simultaneously, but only one section
     * can be classified.
     *
     * By the way, if your shopping mall system requires only one section, then just
     * use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingSection = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Representative name of the section.
         *
         * @title Representative name of the section
        */
        name: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Create a store icon to visually represent the shopping section
    const storeIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "store",             // Use FontAwesome "store" icon
        size: 24,                // Medium size for header
        color: "blue",           // Emphasize with a primary color
    };

    // Header of the card: shows the section name and its code
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,       // Section name, e.g., "Fruit Corner"
        description: input.code, // Identifier code
        startElement: storeIcon, // Leading icon for better UX
    };

    // Helper to format ISO date to a more user-friendly representation
    const formatDate = (iso: string): string => {
        const date = new Date(iso);
        if (isNaN(date.getTime())) {
            // Fallback for invalid dates
            return iso;
        }
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Build a list of key/value pairs for detailed metadata
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: "ID",
                },
            ],
            value: [
                {
                    type: "Text",
                    variant: "body2",
                    content: input.id,
                },
            ],
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: "Created",
                },
            ],
            value: [
                {
                    type: "Text",
                    variant: "body2",
                    content: formatDate(input.created_at),
                },
            ],
        },
    ];

    // DataList to display the metadata in a structured way
    const details: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Content section of the card wrapping the metadata list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: details,
    };

    // Assemble a vertical card: header + content, responsive on mobile
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
