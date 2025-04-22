export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, render a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No GPG Keys Found\n\nThere are no GPG keys to display."
        };
    }
    // Map each gpg_key to a ListItem component
    const items = input.map((key) => {
        // Format the created date for human readability
        let createdLabel;
        try {
            createdLabel = new Date(key.created_at).toLocaleDateString();
        }
        catch (_a) {
            createdLabel = key.created_at; // fallback to raw string if parsing fails
        }
        // Build a description: show the optional name and the creation date
        const descriptionParts = [];
        if (key.name)
            descriptionParts.push(key.name);
        descriptionParts.push(`Created: ${createdLabel}`);
        const description = descriptionParts.join(" | ");
        // Icon at the start to visually represent GPG key
        const startIcon = {
            type: "Icon",
            id: "key", // FontAwesome icon name
            color: "blue",
            size: 24
        };
        // Chips at the end to show counts of emails and subkeys
        const emailChip = {
            type: "Chip",
            label: `${key.emails.length} email${key.emails.length !== 1 ? "s" : ""}`,
            variant: "outlined",
            color: "teal",
            startElement: {
                type: "Icon",
                id: "envelope",
                color: "gray",
                size: 16
            }
        };
        const subkeyChip = {
            type: "Chip",
            label: `${key.subkeys.length} subkey${key.subkeys.length !== 1 ? "s" : ""}`,
            variant: "outlined",
            color: "green",
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 16
            }
        };
        return {
            type: "ListItem",
            title: key.key_id,
            description,
            startElement: startIcon,
            // You can pass a single component or an array of components here
            endElement: [emailChip, subkeyChip]
        };
    });
    // Compose the overall List component
    const list = {
        type: "List",
        childrenProps: items
    };
    return list;
}
//# sourceMappingURL=949.js.map