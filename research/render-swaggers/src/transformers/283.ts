import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FINDONE_ARTICLE = any;
    export type ARLEADY_REPORTED_ARTICLE = any;
    export type ResponseForm_lt_true_gt_ = any;
}
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If input is null or undefined, show a simple text notification
    if (input == null) {
        return {
            type: "Text",
            content: "No data to display",
            variant: "body2",
        };
    }

    // For completely unknown shapes of data, it is best to use markdown
    // to render a nicely formatted JSON code block.
    // This approach handles nested objects and arrays automatically,
    // and provides a responsive, scrollable view on small screens.
    try {
        const json = JSON.stringify(input, null, 2);
        const markdownContent = [
            "## Raw Data",
            "",
            "json",
            json,
            "```",
        ].join("\n");

        return {
            type: "Markdown",
            content: markdownContent,
        };
    } catch {
        // In the unlikely event JSON serialization fails, fallback to plain text
        return {
            type: "Text",
            content: "Unable to visualize data: serialization error",
            variant: "body2",
            color: "error",
        };
    }
}
