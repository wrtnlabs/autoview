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
    // Extract and normalize the result string
    const raw = input.result?.trim() ?? "";

    // If there's no content, show a friendly message
    if (!raw) {
        return {
            type: "Text",
            content: "No data available",
        };
    }

    // Utility: FontAwesome icon for documents/text
    const documentIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "file-alt",      // FontAwesome 'file-alt' icon
        color: "blue",
        size: 16,
    };

    // 1. Detect image URLs (http(s) + image extensions)
    const imageUrlPattern = /^https?:\/\/.*\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i;
    if (imageUrlPattern.test(raw)) {
        // Render as image for a more visual presentation
        return {
            type: "Image",
            src: raw,
            alt: "Result Image",
        };
    }

    // 2. Detect basic Markdown syntax (# headings, lists, bold)
    const markdownPatterns = [
        /^\s*#{1,6}\s+/,   // heading
        /\*\*.+\*\*/,     // bold
        /`[^`]+`/,        // inline code
        /^-\s+/,          // list
        /\[.+\]\(.+\)/,   // link
    ];
    const isMarkdown = markdownPatterns.some((re) => re.test(raw));
    if (isMarkdown) {
        return {
            type: "Markdown",
            content: raw,
        };
    }

    // 3. Long plain text: wrap in a code block via Markdown for readability
    const MAX_PLAIN = 120;
    if (raw.length > MAX_PLAIN) {
        const fenced = "\n" + raw + "\n```";
        return {
            type: "Markdown",
            content: fenced,
        };
    }

    // 4. Short plain text: render inline with a document icon for visual flair
    return {
        type: "Text",
        content: [
            documentIcon,
            " ",
            raw,
        ],
    };
}
