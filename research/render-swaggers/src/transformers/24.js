export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Create list items for each comment
    const listItems = input.data.map((comment) => {
        var _a, _b;
        // Use the latest snapshot (last in the array), or fallback to first if empty
        const snapshots = comment.snapshots || [];
        const latestSnapshot = snapshots[snapshots.length - 1] || snapshots[0];
        // Build a label with a user icon and comment identifier
        const labelComponents = [
            {
                type: "Icon",
                id: "user", // user silhouette icon
                color: "gray",
                size: 20,
            },
            {
                type: "Text",
                // Fallback to comment.id if writer has no name property
                content: [typeof ((_a = comment.writer) === null || _a === void 0 ? void 0 : _a.name) === "string"
                        ? comment.writer.name
                        : comment.id],
                variant: "subtitle2",
            },
        ];
        // If the snapshot has markdown or html, we render it directly
        // Use Markdown component for richer formatting support
        const valueComponent = {
            type: "Markdown",
            content: (_b = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.body) !== null && _b !== void 0 ? _b : "",
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent,
        };
    });
    // Build a DataList or fallback text if no comments
    const commentsSection = listItems.length > 0
        ? {
            type: "DataList",
            childrenProps: listItems,
        }
        : {
            type: "Text",
            // Inform the user there are no comments
            content: ["No comments found for this inquiry."],
            variant: "body2",
        };
    // Wrap everything in a VerticalCard to be responsive on mobile
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Comments (Page ${input.pagination.current} of ${input.pagination.pages})`,
                description: `Total: ${input.pagination.records}`,
                startElement: {
                    type: "Icon",
                    id: "comment", // comment bubble icon
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed the comments list or empty message
                childrenProps: commentsSection,
            },
        ],
    };
}
//# sourceMappingURL=24.js.map