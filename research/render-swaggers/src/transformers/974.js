export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each email record into a DataListItemProps that shows:
    // - An envelope icon + the email address
    // - Chips indicating primary status, verification status, and visibility
    const items = input.map((record) => {
        // Build the array of status chips
        const statusChips = [];
        // Primary email indicator
        if (record.primary) {
            statusChips.push({
                type: "Chip",
                label: "Primary",
                color: "primary",
                size: "small",
                variant: "outlined",
            });
        }
        // Verification status indicator
        statusChips.push({
            type: "Chip",
            label: record.verified ? "Verified" : "Unverified",
            color: record.verified ? "success" : "warning",
            size: "small",
            variant: "filled",
        });
        // Visibility status if available (e.g. "public", "private")
        if (record.visibility !== null) {
            statusChips.push({
                type: "Chip",
                label: record.visibility,
                color: "info",
                size: "small",
                variant: "outlined",
            });
        }
        return {
            type: "DataListItem",
            // Label: envelope icon + email string
            label: [
                {
                    type: "Icon",
                    id: "envelope",
                    color: "blue",
                    size: 20,
                },
                {
                    type: "Text",
                    content: record.email,
                    variant: "body1",
                },
            ],
            // Value: the collection of status chips
            value: statusChips,
        };
    });
    // If there are no emails, show a friendly markdown message instead of an empty table
    if (items.length === 0) {
        return {
            type: "Markdown",
            content: "## No email addresses found.\nPlease add an email to get started.",
        };
    }
    // Compose a VerticalCard with a header and the data list
    const header = {
        type: "CardHeader",
        title: "Email Addresses",
        description: `You have ${input.length} email address${input.length > 1 ? "es" : ""}.`,
        startElement: {
            type: "Icon",
            id: "envelope",
            color: "blue",
            size: 28,
        },
    };
    const content = {
        type: "CardContent",
        // Embed the DataList inside the card content
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=974.js.map