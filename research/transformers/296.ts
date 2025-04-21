import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type SELECT_MORE_THAN_ONE_IMAGE = any;
    export type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// The visualizeData function transforms arbitrary input into a Markdown component
// showing the serialized JSON. This provides a responsive, mobile-friendly
// UI by leveraging the Markdown renderer, and falls back gracefully if
// serialization fails.

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    let content: string;
    try {
        // Serialize the input to pretty-printed JSON.
        const json = JSON.stringify(input, null, 2);
        // Use a fenced code block for clear syntax highlighting in Markdown.
        content = [
            "Here is the data visualization in JSON format:",
            "json",
            json,
            "```"
        ].join("\n");
    } catch (e) {
        // If serialization fails, fall back to a simple text representation.
        content = `Unable to serialize input data: ${String(e)}`;
    }

    // Return a Markdown component to render the JSON or error message.
    return {
        type: "Markdown",
        content
    };
}
