export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each interaction group to a human-readable label and a visual color for the chip.
    const limitMap = {
        existing_users: { label: "Existing Users", color: "info" },
        contributors_only: { label: "Contributors Only", color: "success" },
        collaborators_only: { label: "Collaborators Only", color: "secondary" },
    };
    const { label: limitLabel, color: limitColor } = limitMap[input.limit];
    // A Chip component to highlight which group is limited
    const limitChip = {
        type: "Chip",
        label: limitLabel,
        color: limitColor,
        size: "small",
        variant: "filled",
    };
    // An icon to represent the user interaction context
    const headerIcon = {
        type: "Icon",
        id: "users", // FontAwesome 'users' icon
        color: "blue",
        size: 24,
    };
    // The card header shows the origin and group as a chip
    const cardHeader = {
        type: "CardHeader",
        title: "Interaction Limits",
        description: input.origin,
        startElement: headerIcon,
        endElement: limitChip,
    };
    // Safely format the expiration date to a localized string
    let expiresText;
    try {
        const dt = new Date(input.expires_at);
        if (isNaN(dt.getTime()))
            throw new Error("Invalid date");
        // .toLocaleString() will adapt to the user's locale, helpful on mobile
        expiresText = dt.toLocaleString();
    }
    catch (_a) {
        // Fallback to raw string if parsing fails
        expiresText = input.expires_at;
    }
    // A single data-list item for the expiration timestamp
    const expirationItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Expires At",
            variant: "body2",
        },
        value: {
            type: "Text",
            content: expiresText,
            variant: "body2",
        },
    };
    // Wrap the expiration into a DataList for consistent styling
    const dataList = {
        type: "DataList",
        childrenProps: [expirationItem],
    };
    // Card content holds the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Assemble a vertical card with header and body
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=772.js.map