export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no gists are available, show a friendly message using Markdown
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No gists available**\n\nThere are no public gists to display at this time.",
        };
    }
    // Sort gists by creation date descending, so the newest appear first
    const sorted = [...input].sort((a, b) => {
        const da = new Date(a.created_at).getTime();
        const db = new Date(b.created_at).getTime();
        return db - da;
    });
    // Map each gist to a ListItemProps
    const items = sorted.map((gist) => {
        var _a, _b;
        // Determine the gist owner; fallback from `user` to `owner`
        const owner = (_b = (_a = gist.user) !== null && _a !== void 0 ? _a : gist.owner) !== null && _b !== void 0 ? _b : null;
        // Build an avatar component if we have an owner
        const avatar = owner
            ? {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                size: 40,
                variant: "primary",
            }
            : undefined;
        // Format creation date for display
        const createdDate = new Date(gist.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        // Fallback title if the description is empty
        const titleText = gist.description && gist.description.trim().length > 0
            ? gist.description
            : `Gist ${gist.id}`;
        // Badge showing number of comments, wrapping a comment icon
        const commentBadge = {
            type: "Badge",
            count: gist.comments,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "gray",
                size: 16,
            },
        };
        // Build the ListItemProps. We make the entire item a link to the gist.
        const listItem = {
            type: "ListItem",
            // Clicking the item will open the gist in a new tab/browser window
            href: gist.html_url,
            title: titleText,
            description: `Created on ${createdDate}`,
            // Show the owner's avatar, if present
            startElement: avatar,
            // Show the comments badge at the end
            endElement: commentBadge,
        };
        return listItem;
    });
    // Prepend a sticky subheader to label the list
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            content: "Public Gists",
            variant: "h5",
            color: "primary",
        },
    };
    // Return a List component containing all the gists
    const list = {
        type: "List",
        childrenProps: [subheader, ...items],
    };
    return list;
}
//# sourceMappingURL=993.js.map