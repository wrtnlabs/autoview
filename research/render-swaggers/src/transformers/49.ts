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
    // Format the creation date into a human-friendly string
    let formattedDate: string;
    try {
        const date = new Date(input.created_at);
        // toLocaleString will respect user's locale and be mobile-friendly
        formattedDate = isNaN(date.getTime())
            ? input.created_at
            : date.toLocaleString();
    } catch {
        formattedDate = input.created_at;
    }

    // Create a DataList item for a key/value pair
    const makeDataListItem = (labelText: string, valueText: string): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            color: "tertiary",
            content: [labelText],
        },
        value: {
            type: "Text",
            variant: "body1",
            content: [valueText],
        },
    });

    // Assemble the DataList of section details
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            makeDataListItem("ID", input.id),
            makeDataListItem("Created At", formattedDate),
        ],
    };

    // Use an avatar with the section name initials for more visual appeal
    const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        name: input.name,
        variant: "info",
        size: 40,
    };

    // Build a vertical card to display the section information responsively
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // The section name is the prominent title
                title: input.name,
                // The internal code appears as subtitle
                description: input.code,
                // Display an avatar representing the section
                startElement: avatar,
            },
            {
                type: "CardContent",
                // Embed the data list inside card content
                childrenProps: detailsList,
            },
        ],
    };

    return card;
}
