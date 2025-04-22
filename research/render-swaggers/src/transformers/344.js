export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each gist into a ListItem component
    const listItems = input.map((gist) => {
        var _a, _b;
        // Owner avatar or fallback icon
        const startElement = gist.owner
            ? {
                type: "Avatar",
                src: gist.owner.avatar_url,
                name: gist.owner.login,
                size: 32,
                variant: "gray",
            }
            : {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 24,
            };
        // Count of files in this gist
        const fileCount = Object.keys(gist.files || {}).length;
        // Number of comments
        const commentsCount = (_a = gist.comments) !== null && _a !== void 0 ? _a : 0;
        // Format creation date for display
        const createdDate = new Date(gist.created_at).toLocaleDateString();
        // Chips to summarize key metrics at the end of the list item
        const endElement = [
            {
                type: "Chip",
                label: `${fileCount} file${fileCount !== 1 ? "s" : ""}`,
                color: "primary",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `${commentsCount} comment${commentsCount !== 1 ? "s" : ""}`,
                color: "secondary",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: createdDate,
                startElement: {
                    type: "Icon",
                    id: "calendar",
                    size: 12,
                    color: "gray",
                },
                color: "gray",
                size: "small",
                variant: "outlined",
            },
        ];
        return {
            type: "ListItem",
            // Use gist ID as the title
            title: gist.id,
            // Provide a default message if description is absent
            description: (_b = gist.description) !== null && _b !== void 0 ? _b : "No description",
            startElement,
            endElement,
        };
    });
    // Wrap all items in a responsive List component
    const list = {
        type: "List",
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=344.js.map