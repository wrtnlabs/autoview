export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each gist into a ListItem component with avatar or icon, title, description, and metadata chips
    const listItems = input.map((gist) => {
        // Determine the avatar or fallback icon for the gist owner
        const ownerAvatar = gist.owner
            ? {
                type: "Avatar",
                src: gist.owner.avatar_url,
                name: gist.owner.login,
                size: 40,
            }
            : {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 24,
            };
        // Count number of files in the gist
        const fileCount = Object.keys(gist.files || {}).length;
        // Compose visual chips for file count and comments count
        const metadataChips = [
            {
                type: "Chip",
                label: `${fileCount} file${fileCount !== 1 ? "s" : ""}`,
                size: "small",
                variant: "outlined",
                color: "info",
            },
            {
                type: "Chip",
                label: `${gist.comments} comment${gist.comments !== 1 ? "s" : ""}`,
                size: "small",
                variant: "outlined",
                color: "secondary",
            },
        ];
        // Format the creation date in a human‐friendly way
        let createdAt = "Unknown date";
        try {
            createdAt = new Date(gist.created_at).toLocaleDateString();
        }
        catch (_a) {
            // If date parsing fails, fallback to raw string
            createdAt = gist.created_at;
        }
        return {
            type: "ListItem",
            // Use the description or a placeholder if missing
            title: gist.description && gist.description.trim() !== "" ? gist.description : "No description",
            // Provide the creation date in the description field
            description: `Created on ${createdAt}`,
            // Clicking on the item navigates to the gist HTML URL
            href: gist.html_url,
            startElement: ownerAvatar,
            endElement: metadataChips,
        };
    });
    // Wrap all items into a List component for responsive display
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=343.js.map