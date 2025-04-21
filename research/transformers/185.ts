import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace shared {
        export type StringView = {
            result?: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.shared.StringView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Determine if we have meaningful result text
    const raw = input.result?.trim();
    const hasResult = typeof raw === "string" && raw.length > 0;

    // Card header with an icon to visually label the section
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Result",
        // Use a file-alt icon from FontAwesome to denote a text result
        startElement: {
            type: "Icon",
            id: "file-alt",
            color: "blue",
            size: 20
        }
    };

    // If there is result text, render it as markdown for better readability
    // Otherwise, show a Chip indicating "No result"
    const content: 
        | IAutoView.IAutoViewMarkdownProps 
        | IAutoView.IAutoViewChipProps = hasResult
        ? {
            type: "Markdown",
            // Surround with code fences if it seems like code; else raw markdown
            content: raw!.startsWith("") ? raw! : raw!
        }
        : {
            type: "Chip",
            label: "No result",
            color: "warning",
            variant: "outlined"
        };

    // Compose a vertical card to make the layout responsive and mobile-friendly
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            header,
            // Wrap content in CardContent for consistent padding
            {
                type: "CardContent",
                childrenProps: content
            }
        ]
    };

    return card;
}
