export function transform($input) {
    return visualizeData($input);
}
// Helper to truncate long text for preview
function getSnippet(content, maxLength = 100) {
    return content.length > maxLength
        ? content.slice(0, maxLength) + "…"
        : content;
}
function visualizeData(input) {
    // Map each article into a DataListItem
    const items = input.data.list.map((article) => {
        // Safely format the createdAt timestamp
        let dateStr;
        try {
            dateStr = new Date(article.createdAt).toLocaleDateString();
        }
        catch (_a) {
            dateStr = String(article.createdAt);
        }
        // Build the left side (label) components: optional thumbnail, snippet, and date
        const labelComponents = [];
        if (article.thumbnail) {
            labelComponents.push({
                type: "Image",
                src: article.thumbnail,
                alt: `Thumbnail for article ${article.id}`,
            });
        }
        labelComponents.push({
            type: "Text",
            variant: "body1",
            content: getSnippet(article.contents),
        });
        labelComponents.push({
            type: "Text",
            variant: "caption",
            color: "gray",
            content: dateStr,
        });
        // Build the right side (value) components: badges for comment count and likes
        const valueComponents = [];
        valueComponents.push({
            type: "Badge",
            count: article.comments.length,
            showZero: true,
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "gray",
            },
        });
        // Show like badge only when myPick is true; hide zero otherwise
        valueComponents.push({
            type: "Badge",
            count: article.myPick ? 1 : 0,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "heart",
                color: article.myPick ? "red" : "gray",
            },
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for responsive, scrollable display
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=290.js.map