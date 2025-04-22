export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map visibility to a corresponding icon and color for better visual cues
    const visibilityIconMap = {
        all: { id: "globe", color: "blue" },
        private: { id: "lock", color: "red" },
        selected: { id: "users", color: "orange" },
    };
    // Transform each secret into a ListItem with icon, title, description, and Chips for timestamps
    const listItems = input.secrets.map(secret => {
        // Choose icon/color based on visibility, fallback to a generic icon
        const vis = secret.visibility;
        const iconSpec = visibilityIconMap[vis] || { id: "question-circle", color: "gray" };
        // Format dates into human-readable local strings
        const createdAt = new Date(secret.created_at).toLocaleString();
        const updatedAt = new Date(secret.updated_at).toLocaleString();
        // Compose two chips: one for created time, one for updated time
        const timestampChips = [
            {
                type: "Chip",
                label: `Created: ${createdAt}`,
                color: "gray",
                size: "small",
                variant: "filled",
            },
            {
                type: "Chip",
                label: `Updated: ${updatedAt}`,
                color: "gray",
                size: "small",
                variant: "filled",
            },
        ];
        return {
            type: "ListItem",
            // Secret name as the main title
            title: secret.name,
            // Show raw URL of selected repositories as a secondary text
            description: `Repo URL: ${secret.selected_repositories_url}`,
            // Start element: an icon representing visibility
            startElement: {
                type: "Icon",
                id: iconSpec.id,
                color: iconSpec.color,
                size: 20,
            },
            // End elements: chips for timestamps
            endElement: timestampChips,
            // If desired, clicking could open details via href; omitted for now
        };
    });
    // Wrap all items into a responsive List component
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=931.js.map