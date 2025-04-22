export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no secrets, display a friendly markdown message.
    if (!input.secrets || input.secrets.length === 0) {
        return {
            type: "Markdown",
            content: "### No secrets found"
        };
    }
    // Map visibility levels to chip colors.
    const getVisibilityColor = (vis) => {
        switch (vis) {
            case "all":
                return "success";
            case "private":
                return "error";
            case "selected":
                return "info";
            default:
                return "gray";
        }
    };
    // Build a sticky subheader that shows the total number of secrets.
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                variant: "h5",
                content: `${input.total_count} secret${input.total_count === 1 ? "" : "s"}`
            }
        ]
    };
    // Transform each secret into a ListItem with visual cues.
    const listItems = input.secrets.map((secret) => {
        // A colored chip indicating visibility scope.
        const visibilityChip = {
            type: "Chip",
            label: secret.visibility,
            color: getVisibilityColor(secret.visibility),
            variant: "filled",
            size: "small"
        };
        // An icon to hint at the existence of a repository link (if any).
        const repoIcon = {
            type: "Icon",
            id: "link",
            color: secret.selected_repositories_url ? "blue" : "gray",
            size: 16
        };
        // Format ISO timestamps into user‐friendly strings.
        const createdAt = new Date(secret.created_at).toLocaleString();
        const updatedAt = new Date(secret.updated_at).toLocaleString();
        return {
            type: "ListItem",
            title: secret.name,
            // Show both timestamps in a concise, inline description.
            description: `Created: ${createdAt}, Updated: ${updatedAt}`,
            startElement: {
                type: "Icon",
                id: "lock",
                color: "gray",
                size: 24
            },
            endElement: [visibilityChip, repoIcon]
        };
    });
    // Return the composed List component.
    return {
        type: "List",
        childrenProps: [subheader, ...listItems]
    };
}
//# sourceMappingURL=433.js.map