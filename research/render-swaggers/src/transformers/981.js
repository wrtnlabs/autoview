export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation date into a more readable form; if parsing fails, fall back to the original string.
    const createdAtDate = new Date(input.created_at);
    const formattedDate = isNaN(createdAtDate.getTime())
        ? input.created_at
        : createdAtDate.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    // Truncate the SSH key in the preview to avoid overly long text on small screens
    const keyPreview = input.key.length > 60
        ? `${input.key.slice(0, 30)}…${input.key.slice(-30)}`
        : input.key;
    return {
        type: "VerticalCard",
        // The VerticalCard will render a header and content stacked vertically
        childrenProps: [
            {
                // Card header with an icon, title, and subtitle (formatted date)
                type: "CardHeader",
                title: input.title,
                description: formattedDate,
                startElement: {
                    type: "Icon",
                    id: "key", // FontAwesome "key" icon
                    color: "teal",
                    size: 28,
                },
            },
            {
                // Card content holds both a markdown preview of the key and a data list
                type: "CardContent",
                childrenProps: [
                    {
                        // Show the SSH key inside a scrollable code block via Markdown
                        type: "Markdown",
                        content: [
                            "ssh",
                            keyPreview,
                            "```",
                        ].join("\n"),
                    },
                    {
                        // A compact list showing the key's numeric ID
                        type: "DataList",
                        childrenProps: [
                            {
                                type: "DataListItem",
                                // Use an icon alongside text for the label
                                label: [
                                    {
                                        type: "Icon",
                                        id: "hashtag",
                                        size: 16,
                                        color: "gray",
                                    },
                                    {
                                        type: "Text",
                                        content: "Key ID",
                                        variant: "body2",
                                        color: "gray",
                                    },
                                ],
                                // Display the ID value in monospace-style Markdown for emphasis
                                value: [
                                    {
                                        type: "Markdown",
                                        content: "`" + input.id.toString() + "`",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=981.js.map