import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FIND_ONE_COMMENT = any;
    export type ResponseForm_lt_boolean_gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // We don't know the exact shape of input at compile time.
    // Fallback: render the entire input as a formatted JSON code block via Markdown component.
    // This approach is responsive and user‐friendly on all devices, and keeps the view maintainable.
    let content: string;
    try {
        // Pretty‐print JSON with 2‐spaces indentation
        const jsonString = JSON.stringify(input, null, 2);
        // Wrap in a fenced code block so that markdown renderers apply syntax highlighting
        content = ["json", jsonString, "```"].join("\n");
    } catch (e) {
        // In case serialization fails (e.g. circular references), show a simple error message
        content = "⚠️ Unable to display data. Serialization error.";
    }

    // Return a Markdown component to render the JSON payload
    const markdownProps: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content,
    };

    return markdownProps;
}
