export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We present the blob as a card with:
    // 1. A header showing an abbreviated hash for quick identification.
    // 2. The actual image preview.
    // 3. A data list detailing the full SHA‑256.
    // 4. A footer button to open/download the file.
    //
    // This layout is mobile‐friendly, using line clamps and concise labels.
    // 1. Card header with truncated SHA (first 8 chars + ellipsis).
    const header = {
        type: "CardHeader",
        title: "Preview",
        description: input.sha.substring(0, 8) + "…", // abbreviated hash
    };
    // 2. Card media to render the image from the URL.
    const media = {
        type: "CardMedia",
        src: input.url,
    };
    // 3. DataListItem showing the full SHA‑256 value.
    //    We clamp the text to 2 lines on small screens.
    const shaItem = {
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "SHA‑256:",
                variant: "subtitle2",
            },
        ],
        value: {
            type: "Text",
            content: input.sha,
            variant: "body2",
            lineClamp: 2,
        },
    };
    // Wrap the item in a DataList, then put into CardContent.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: [shaItem],
        },
    };
    // 4. Footer with a button to open the file in a new tab.
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "Open File",
            variant: "contained",
            color: "primary",
            size: "small",
            href: input.url,
        },
    };
    // Assemble the vertical card.
    return {
        type: "VerticalCard",
        childrenProps: [header, media, content, footer],
    };
}
//# sourceMappingURL=749.js.map