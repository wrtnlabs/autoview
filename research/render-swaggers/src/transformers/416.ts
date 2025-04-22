import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export type empty_object = {};
}
type IAutoViewTransformerInputType = Schema.empty_object;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Since the input type is an empty object, there's no actual data to transform.
    // We provide a friendly "empty state" UI using a VerticalCard with an icon and Markdown.
    const emptyStateCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with an informational icon
            {
                type: "CardHeader",
                title: "No Data Available",
                description: "There is no input data to visualize.",
                startElement: {
                    type: "Icon",
                    id: "info-circle",     // FontAwesome icon name (kebab-case, no prefix)
                    color: "gray",
                    size: 32
                }
            },
            // Card content with a Markdown message
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: `
**Empty State**

_No input was provided to the transformer function. Please supply valid data to display visual components._
`
                }
            }
        ]
    };

    return emptyStateCard;
}
