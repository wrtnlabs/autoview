export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract the list of comments from the paginated input
    const comments = (_a = input.data) !== null && _a !== void 0 ? _a : [];
    // If there are no comments, show a friendly message
    if (comments.length === 0) {
        return {
            type: "Text",
            // Single string is also allowed for content
            content: "No comments available",
            variant: "body1",
        };
    }
    // Transform each comment into a DataListItemProps
    const listItems = comments.map((comment) => {
        var _a, _b;
        // Safely get the snapshots array
        const snapshots = (_a = comment.snapshots) !== null && _a !== void 0 ? _a : [];
        // Use the latest snapshot for display; fallback to a placeholder
        const latestSnapshot = snapshots.length > 0
            ? snapshots[snapshots.length - 1]
            : undefined;
        const bodyContent = (_b = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.body) !== null && _b !== void 0 ? _b : "_No content available_";
        // Build Markdown component for the comment body
        const commentMarkdown = {
            type: "Markdown",
            content: bodyContent,
        };
        // If there are any attached files in the latest snapshot, show them as chips
        let fileGroup;
        if (latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0) {
            const fileChips = latestSnapshot.files.map((file) => {
                const fileName = file.extension
                    ? `${file.name}.${file.extension}`
                    : file.name;
                return {
                    type: "Chip",
                    label: fileName,
                    size: "small",
                    variant: "outlined",
                    // Use a generic file icon to indicate attachments
                    startElement: {
                        type: "Icon",
                        id: "file",
                        color: "gray",
                        size: 16,
                    },
                };
            });
            fileGroup = {
                type: "ChipGroup",
                childrenProps: fileChips,
            };
        }
        // Compose the array of value components: markdown + optional file list
        const valueComponents = [
            commentMarkdown,
        ];
        if (fileGroup) {
            valueComponents.push(fileGroup);
        }
        // Build the DataListItem label showing created time & snapshot count
        const labelComponents = [];
        // Created timestamp
        labelComponents.push({
            type: "Text",
            content: [`📅 ${new Date(comment.created_at).toLocaleString()}`],
            variant: "subtitle2",
        });
        // Number of versions
        if (snapshots.length > 1) {
            labelComponents.push({
                type: "Text",
                content: [`🔄 ${snapshots.length} versions`],
                variant: "caption",
                color: "secondary",
            });
        }
        return {
            type: "DataListItem",
            // Use the composed label elements
            label: labelComponents,
            // Use the composed value elements
            value: valueComponents,
        };
    });
    // Return a DataList containing all comment items
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=97.js.map