export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each migration into a ListItem component
    const listItems = input.map((migration) => {
        // Format dates in a human‐readable form
        const created = new Date(migration.created_at).toLocaleDateString();
        const updated = new Date(migration.updated_at).toLocaleDateString();
        // Build a badge showing number of repos in this migration
        const repoCountBadge = {
            type: "Badge",
            count: migration.repositories.length,
            maxCount: 99,
            color: "blue",
            // Use a branch icon to represent repos
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "blue",
                size: 16,
            },
        };
        // Build a visual representation of the owner: avatar or fallback icon
        const ownerElement = migration.owner
            ? {
                type: "Avatar",
                src: migration.owner.avatar_url,
                name: migration.owner.login,
                size: 40,
                variant: "cyan",
            }
            : {
                type: "Icon",
                id: "user-secret",
                color: "gray",
                size: 24,
            };
        // Compose the title and description for the list item
        const title = `Migration #${migration.id}`;
        const description = `${migration.state} • Created: ${created} • Updated: ${updated}`;
        return {
            type: "ListItem",
            title,
            description,
            startElement: ownerElement,
            endElement: repoCountBadge,
            // Link the whole item to the migration URL
            href: migration.url,
        };
    });
    // Return a List component containing all migrations
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=964.js.map