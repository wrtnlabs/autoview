export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine avatar color based on verification status
    const avatar = {
        type: "Avatar",
        name: input.title,
        variant: input.verified ? "green" : "red",
        size: 40,
    };
    // Compose the card header with title, creation date, and an avatar
    const header = {
        type: "CardHeader",
        title: input.title,
        // Format the date if valid, otherwise fall back to the raw string
        description: (() => {
            const d = new Date(input.created_at);
            return isNaN(d.getTime()) ? input.created_at : d.toLocaleDateString();
        })(),
        startElement: avatar,
    };
    // Build a data list of key details for a concise, responsive layout
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Key" },
            value: { type: "Text", content: input.key },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Verified" },
            // Use a checkmark icon for visual clarity
            value: {
                type: "Icon",
                id: input.verified ? "check-circle" : "times-circle",
                color: input.verified ? "green" : "red",
                size: 20,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Read Only" },
            value: { type: "Text", content: input.read_only ? "Yes" : "No" },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Wrap the details list in a card content section
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Provide a button that opens the URL, with an icon to indicate navigation
    const openButton = {
        type: "Button",
        label: "Open Link",
        href: input.url,
        startElement: {
            type: "Icon",
            id: "external-link-alt",
            color: "blue",
            size: 16,
        },
        variant: "outlined",
        color: "primary",
        size: "small",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: openButton,
    };
    // Compose the vertical card layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=958.js.map