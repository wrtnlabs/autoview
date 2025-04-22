export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no secrets, show a friendly markdown message
    if (!input.secrets || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: "## No Dependabot secrets found for this organization."
        };
    }
    // Map visibility to chip color for quick visual distinction
    const visibilityColorMap = {
        all: "green",
        private: "red",
        selected: "orange"
    };
    // Build a list item for each secret
    const listItems = input.secrets.map(secret => {
        // Format dates to a more human‑readable form
        const createdDate = new Date(secret.created_at).toLocaleDateString();
        const updatedDate = new Date(secret.updated_at).toLocaleDateString();
        // An icon to indicate this is a secret (lock icon)
        const lockIcon = {
            type: "Icon",
            id: "lock",
            color: "teal",
            size: 20
        };
        // A chip to indicate visibility status
        const visibilityChip = {
            type: "Chip",
            label: secret.visibility,
            color: visibilityColorMap[secret.visibility] || "gray",
            size: "small",
            variant: "outlined"
        };
        // Compose the list item
        const item = Object.assign({ type: "ListItem", title: secret.name, 
            // Show created and updated dates in the description
            description: `Created: ${createdDate} • Updated: ${updatedDate}`, startElement: lockIcon, endElement: visibilityChip }, (secret.selected_repositories_url
            ? { href: secret.selected_repositories_url }
            : {}));
        return item;
    });
    // Return a responsive list of secrets
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=442.js.map