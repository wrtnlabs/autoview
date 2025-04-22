export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We choose a vertical card to present shopping channel information in a compact, responsive layout.
    // CardHeader displays the channel name with a store icon.
    // CardContent shows a data list of key properties: channel code and creation date.
    // CardFooter shows the internal ID in a caption style.
    const header = {
        type: "CardHeader",
        title: input.name,
        // Use a store icon to visually represent a shopping channel.
        startElement: {
            type: "Icon",
            id: "store",
            color: "blue",
            size: 24,
        },
    };
    // A DataList to show structured key–value pairs.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        variant: "body2",
                        content: "Channel Code",
                    },
                    value: {
                        type: "Chip",
                        label: input.code,
                        variant: "filled",
                        color: "cyan",
                        size: "small",
                    },
                },
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        variant: "body2",
                        content: "Created At",
                    },
                    // Format creation date for readability.
                    value: {
                        type: "Text",
                        variant: "body2",
                        content: new Date(input.created_at).toLocaleString(),
                    },
                },
            ],
        },
    };
    // Footer shows the record ID in a smaller caption; helpful for debugging/tracking.
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            variant: "caption",
            content: `ID: ${input.id}`,
        },
    };
    return {
        // The top-level component is a VerticalCard combining header, content, and footer.
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=42.js.map