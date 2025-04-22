export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each tree entry into a DataListItem, with an icon + path on the left and
    // file metadata (size + sha) as chips on the right for blobs.
    const items = input.tree.map((entry) => {
        var _a;
        // Choose folder vs. file icon
        const icon = {
            type: "Icon",
            id: entry.type === "tree" ? "folder" : "file",
            color: entry.type === "tree" ? "yellow" : "gray",
            size: 20,
        };
        // For file blobs, show size and short SHA as small chips
        const metadata = [];
        if (entry.type === "blob") {
            metadata.push({
                type: "Chip",
                label: `${(_a = entry.size) !== null && _a !== void 0 ? _a : 0} B`,
                variant: "outlined",
                size: "small",
                color: "gray",
            });
            metadata.push({
                type: "Chip",
                label: entry.sha.slice(0, 7),
                variant: "outlined",
                size: "small",
                color: "secondary",
            });
        }
        return {
            type: "DataListItem",
            // label can be an array of presentation components: icon + file/folder name
            label: [
                icon,
                {
                    type: "Text",
                    content: entry.path,
                    variant: "body2",
                },
            ],
            // empty metadata array collapses to undefined (optional property)
            value: metadata.length > 0 ? metadata : undefined,
        };
    });
    // Wrap the list in a simple card with header + content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Git Repository Tree",
                description: `${input.tree.length} item${input.tree.length !== 1 ? "s" : ""}`,
            },
            {
                type: "CardContent",
                // The content is a DataList of all entries
                childrenProps: {
                    type: "DataList",
                    childrenProps: items,
                },
            },
        ],
    };
}
//# sourceMappingURL=754.js.map