export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare a list of label/value pairs to display under a DataList
    const listItems = [
        {
            type: "DataListItem",
            // Label for the ID entry
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
            },
            // Display the numeric ID inside a Badge with a hashtag icon
            value: {
                type: "Badge",
                count: input.id,
                maxCount: 9999,
                showZero: true,
                childrenProps: {
                    type: "Icon",
                    id: "hashtag",
                    color: "gray",
                    size: 16,
                },
            },
        },
        {
            type: "DataListItem",
            // Label for the key prefix
            label: {
                type: "Text",
                content: "Key Prefix",
                variant: "subtitle2",
            },
            // Display the key_prefix inside a Chip for visual emphasis
            value: {
                type: "Chip",
                label: input.key_prefix,
                variant: "outlined",
                color: "primary",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Label for the URL template
            label: {
                type: "Text",
                content: "URL Template",
                variant: "subtitle2",
            },
            // Show the template in a code block using Markdown for better readability
            value: {
                type: "Markdown",
                content: [
                    "text",
                    input.url_template,
                    "```",
                ].join("\n"),
            },
        },
        {
            type: "DataListItem",
            // Label for the matching pattern type
            label: {
                type: "Text",
                content: "Pattern Type",
                variant: "subtitle2",
            },
            // Use a filled Chip with an icon that indicates whether it's alphanumeric or purely numeric
            value: {
                type: "Chip",
                label: input.is_alphanumeric ? "Alphanumeric" : "Numeric",
                variant: "filled",
                color: input.is_alphanumeric ? "green" : "blue",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: input.is_alphanumeric ? "font" : "hashtag",
                    color: input.is_alphanumeric ? "green" : "blue",
                    size: 16,
                },
            },
        },
    ];
    // Compose the final UI as a vertical card with a header and content sections
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Main title for the autolink reference card
                title: "Autolink Reference",
                // Subtitle includes the numeric ID for quick glance
                description: `Ref #${input.id}`,
                // Link icon to visually indicate this is a URL-related setting
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "cyan",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed a DataList to show detailed fields
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: listItems,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=626.js.map