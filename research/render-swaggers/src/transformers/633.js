export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine chip properties based on enforcement status
    const statusChip = {
        type: "Chip",
        // Use a green chip for enabled, red for disabled
        color: input.enabled ? "success" : "error",
        variant: "filled",
        label: input.enabled ? "Enabled" : "Disabled",
        // Prepend an icon to indicate state
        startElement: {
            type: "Icon",
            id: input.enabled ? "check-circle" : "times-circle",
            color: input.enabled ? "green" : "red",
            size: 20,
        },
    };
    // Prepare the URL field as a clickable button with a link icon
    const urlButton = {
        type: "Button",
        variant: "text",
        size: "small",
        color: "primary",
        href: input.url,
        label: input.url,
        startElement: {
            type: "Icon",
            id: "link",
            color: "blue",
            size: 20,
        },
    };
    // Build list items for each property
    const listItems = [
        {
            type: "DataListItem",
            // Label for the URL field
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Repository URL",
            },
            // Value is a button linking to the URL
            value: urlButton,
        },
        {
            type: "DataListItem",
            // Label for the enforcement status
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Admin Enforcement",
            },
            // Value is a colored chip indicating the status
            value: statusChip,
        },
    ];
    // DataList to display the fields in a tidy fashion
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Header for the card: showing a lock icon and a title
    const cardHeader = {
        type: "CardHeader",
        title: "Protected Branch Admin Enforced",
        // Use a lock icon to convey protection
        startElement: {
            type: "Icon",
            id: "lock",
            color: "gray",
            size: 24,
        },
    };
    // Wrap the list in CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=633.js.map