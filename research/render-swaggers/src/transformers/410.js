export function transform($input) {
    return visualizeData($input);
}
// Transforms organization actions secrets data into a visual UI configuration
function visualizeData(input) {
    // Helper: map secret visibility to a chip color
    const mapVisibilityColor = (visibility) => {
        switch (visibility) {
            case "all":
                return "primary";
            case "private":
                return "error";
            case "selected":
                return "warning";
            default:
                return "gray";
        }
    };
    // Helper: format ISO date-time into a more readable string
    const formatDate = (iso) => {
        // Use locale-aware formatting
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };
    // If there are no secrets, show a friendly markdown message
    if (!Array.isArray(input.secrets) || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: "### No organization secrets found\n\nThere are currently no GitHub Actions secrets configured for this organization."
        };
    }
    // Build a list item for each secret
    const listItems = input.secrets.map(secret => ({
        type: "DataListItem",
        // Label: the secret name in a bold subtitle
        label: {
            type: "Text",
            variant: "subtitle2",
            content: `🔑 ${secret.name}`
        },
        // Value: combine visibility chip and timestamps
        value: [
            {
                type: "Chip",
                label: secret.visibility,
                color: mapVisibilityColor(secret.visibility),
                size: "small",
                variant: "filled"
            },
            {
                type: "Text",
                variant: "caption",
                color: "gray",
                content: `Created: ${formatDate(secret.created_at)}`
            },
            {
                type: "Text",
                variant: "caption",
                color: "gray",
                content: `Updated: ${formatDate(secret.updated_at)}`
            }
        ]
    }));
    // Compose the final UI: a vertical card with header and content (the data list)
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Show a key icon to denote secrets
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "blue",
                    size: 24
                },
                title: "Organization Actions Secrets",
                description: `${input.total_count} secret${input.total_count !== 1 ? "s" : ""}`
            },
            {
                type: "CardContent",
                // Embed the data list inside the card content
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems
                }
            }
        ]
    };
}
//# sourceMappingURL=410.js.map