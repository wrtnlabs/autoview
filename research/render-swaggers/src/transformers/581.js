export function transform($input) {
    return visualizeData($input);
}
// Transforms GitHub Actions organization secrets response into an AutoView component
function visualizeData(input) {
    // If there are no secrets, show a friendly markdown message
    if (!input.secrets || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: "# No Secrets Found\n" +
                "There are currently no secrets in this organization. " +
                "Add secrets to secure workflows and sensitive data."
        };
    }
    // Helper to format ISO date strings into a more readable form
    const formatDate = (iso) => {
        const d = new Date(iso);
        // Fallback for invalid dates
        if (isNaN(d.getTime()))
            return iso;
        // Use locale string for better readability on mobile & desktop
        return d.toLocaleString();
    };
    // Build DataListItem for each secret
    const items = input.secrets.map((secret) => ({
        type: "DataListItem",
        // Display the secret name prominently
        label: {
            type: "Text",
            variant: "body1",
            // Using markdown-style bold in Text content for emphasis
            content: `**${secret.name}**`
        },
        // Show the updated date with a clock icon
        value: [
            {
                type: "Icon",
                id: "clock",
                size: 16,
                color: "gray"
            },
            {
                type: "Text",
                variant: "caption",
                content: formatDate(secret.updated_at)
            }
        ]
    }));
    // Wrap items in a DataList for structured layout
    const list = {
        type: "DataList",
        childrenProps: items
    };
    // Compose a vertical card with a header and the data list
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Organization Secrets",
                description: `Total: ${input.total_count}`,
                // Use a lock icon to visually indicate "secrets"
                startElement: {
                    type: "Icon",
                    id: "lock",
                    size: 20,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: list
            }
        ]
    };
    return card;
}
//# sourceMappingURL=581.js.map