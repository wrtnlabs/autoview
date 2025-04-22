export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { total_count, secrets } = input;
    // If there are no secrets, show a friendly markdown notice inside a card
    if (secrets.length === 0) {
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    type: "CardHeader",
                    title: "Codespaces Secrets",
                    description: "No secrets configured",
                    // Use a neutral icon to indicate emptiness
                    startElement: {
                        type: "Icon",
                        id: "key",
                        size: 20,
                        color: "gray",
                    },
                },
                {
                    type: "CardContent",
                    // Markdown allows us to include emoji and formatting
                    childrenProps: {
                        type: "Markdown",
                        content: "🔒 **No Codespaces secrets configured**",
                    },
                },
            ],
        };
    }
    // Map each secret to a DataListItem, using an icon + text label and a chip group for dates
    const items = secrets.map((secret) => {
        // Extract just the date portion (YYYY-MM-DD) for readability
        const createdDate = secret.created_at.split("T")[0];
        const updatedDate = secret.updated_at.split("T")[0];
        return {
            type: "DataListItem",
            // Label with a key icon and the secret name
            label: [
                {
                    type: "Icon",
                    id: "key",
                    size: 16,
                    color: "blue",
                },
                {
                    type: "Text",
                    content: secret.name,
                    variant: "body1",
                },
            ],
            // Value displayed as two small chips: created and updated dates
            value: {
                type: "ChipGroup",
                childrenProps: [
                    {
                        type: "Chip",
                        label: `Created: ${createdDate}`,
                        size: "small",
                        variant: "outlined",
                        color: "success",
                    },
                    {
                        type: "Chip",
                        label: `Updated: ${updatedDate}`,
                        size: "small",
                        variant: "outlined",
                        color: "info",
                    },
                ],
            },
        };
    });
    // The data list component containing all items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Wrap everything in a vertical card with a header summarizing the count
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Codespaces Secrets",
                description: `${total_count} secret${total_count !== 1 ? "s" : ""}`,
                startElement: {
                    type: "Icon",
                    id: "key",
                    size: 20,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // You can pass the data list directly as the single child
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=692.js.map