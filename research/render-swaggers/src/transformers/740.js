export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Edge case: no secrets available
    if (!input.secrets || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: `### No Secrets Found

The repository environment has no secrets configured.`
        };
    }
    // Transform each secret into a DataListItem with visual components
    const listItems = input.secrets.map((secret) => {
        // Human‑readable date formatting (will render according to user's locale)
        const createdAt = new Date(secret.created_at).toLocaleString();
        const updatedAt = new Date(secret.updated_at).toLocaleString();
        return {
            type: "DataListItem",
            // Label section: lock icon + secret name
            label: [
                {
                    type: "Icon",
                    id: "lock",
                    color: "teal",
                    size: 16
                },
                {
                    type: "Text",
                    content: secret.name,
                    variant: "body1"
                }
            ],
            // Value section: two chips showing created and updated timestamps
            value: [
                {
                    type: "Chip",
                    label: `Created: ${createdAt}`,
                    variant: "outlined",
                    size: "small",
                    color: "info"
                },
                {
                    type: "Chip",
                    label: `Updated: ${updatedAt}`,
                    variant: "outlined",
                    size: "small",
                    color: "info"
                }
            ]
        };
    });
    // Wrap the items in a DataList for responsive rendering
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
//# sourceMappingURL=740.js.map