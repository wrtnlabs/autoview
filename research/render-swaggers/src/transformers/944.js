export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no email records, show a friendly markdown message instead of an empty list
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No email addresses available\n\nYou have no email addresses on record."
        };
    }
    // Build DataListItem components for each email entry
    const emailItems = input.map(item => {
        // Text component for the email address
        const emailLabel = {
            type: "Text",
            variant: "body1",
            content: item.email
        };
        // Chip indicating primary vs. secondary
        const primaryChip = {
            type: "Chip",
            label: item.primary ? "Primary" : "Secondary",
            color: item.primary ? "primary" : "secondary",
            size: "small",
            variant: item.primary ? "filled" : "outlined"
        };
        // Chip indicating verification status
        const verifiedChip = {
            type: "Chip",
            label: item.verified ? "Verified" : "Unverified",
            color: item.verified ? "success" : "warning",
            size: "small",
            variant: item.verified ? "filled" : "outlined"
        };
        return {
            type: "DataListItem",
            // Show the email address as the label
            label: emailLabel,
            // Show two chips side-by-side for primary & verification status
            value: [primaryChip, verifiedChip]
        };
    });
    // Compose the overall list of emails
    const emailList = {
        type: "DataList",
        childrenProps: emailItems
    };
    // Header for the card, with an envelope icon
    const header = {
        type: "CardHeader",
        title: "Email Addresses",
        startElement: {
            type: "Icon",
            id: "envelope",
            size: 24,
            color: "blue"
        }
    };
    // Wrap the list in a CardContent component for spacing and layout
    const content = {
        type: "CardContent",
        childrenProps: emailList
    };
    // Use a vertical card to stack header and content in a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=944.js.map