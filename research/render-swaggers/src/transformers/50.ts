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
    // Attempt to parse and format the creation date for readability
    const parsedDate = new Date(input.created_at);
    const formattedDate = isNaN(parsedDate.getTime())
        ? input.created_at // fallback to raw string if invalid
        : parsedDate.toLocaleString();

    // Build a vertical card to present section information in a compact, mobile-friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // CardHeader with an avatar and title/description
                type: "CardHeader",
                title: input.name,
                description: `Code: ${input.code}`,
                startElement: {
                    // Use an avatar showing the first letter of the section name
                    type: "Avatar",
                    name: input.name,
                    variant: "primary",
                    size: 40
                }
            },
            {
                // CardContent contains a Markdown component for rich text presentation
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    // Use markdown to emphasize the label and value
                    content: [
                        `**ID:** \`${input.id}\``,
                        `**Created at:** ${formattedDate}`
                    ].join("\n\n")
                }
            }
        ]
    };
}
