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



// visualizeData transforms the input schema into an AutoView component.
// Since Schema.empty_object has no fields, we render an "empty state" card with an icon and markdown.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Use an informational icon to make the UI engaging
    const infoIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "info-circle",   // FontAwesome icon name
        color: "gray",
        size: 40,
    };

    // Card header with icon and title
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "No Data Available",
        startElement: infoIcon,
    };

    // Markdown explaining the empty state (more engaging than plain text)
    const markdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: "It looks like there is no data to display. Please provide input to visualize meaningful content.",
    };

    // Card content to wrap the markdown
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: markdown,
    };

    // Return a responsive vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
