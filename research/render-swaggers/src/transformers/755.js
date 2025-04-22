export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format byte sizes into human-readable strings
    function formatBytes(bytes) {
        if (bytes == null)
            return "-";
        if (bytes < 1024)
            return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024)
            return `${kb.toFixed(2)} KB`;
        const mb = kb / 1024;
        if (mb < 1024)
            return `${mb.toFixed(2)} MB`;
        const gb = mb / 1024;
        return `${gb.toFixed(2)} GB`;
    }
    // If there are no entries, show a simple markdown notice
    if (!input.tree || input.tree.length === 0) {
        return {
            type: "Markdown",
            content: `### Empty tree

The Git tree \`${input.sha}\` contains no entries.`,
        };
    }
    // Build list children: start with a subheader showing the tree SHA
    const children = [
        {
            type: "ListSubheader",
            stickToTop: true,
            childrenProps: [
                {
                    type: "Text",
                    variant: "h6",
                    content: `Tree SHA: ${input.sha}`,
                },
            ],
        },
    ];
    // If the tree has a URL, expose it as a clickable list item
    if (input.url) {
        children.push({
            type: "ListItem",
            title: "View Tree on Remote",
            description: input.url,
            startElement: {
                type: "Icon",
                id: "link",
                color: "blue",
                size: 20,
            },
            href: input.url,
        });
    }
    // If the tree is truncated, warn the user
    if (input.truncated) {
        children.push({
            type: "ListItem",
            title: "Warning: Tree truncated",
            description: "Some entries may have been omitted.",
            startElement: {
                type: "Icon",
                id: "exclamation-triangle",
                color: "red",
                size: 20,
            },
        });
    }
    // For each entry in the tree, render a file/folder list item
    for (const entry of input.tree) {
        // Determine icon and color by entry type
        const isFolder = entry.type === "tree";
        const iconId = isFolder ? "folder" : "file";
        const iconColor = isFolder ? "orange" : "blue";
        // Prepare chips for type and size
        const typeChip = {
            type: "Chip",
            label: entry.type,
            variant: "outlined",
            size: "small",
        };
        const sizeChip = {
            type: "Chip",
            label: formatBytes(entry.size),
            variant: "filled",
            size: "small",
            color: "gray",
        };
        const item = Object.assign({ type: "ListItem", title: entry.path, description: `mode: ${entry.mode}`, startElement: {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 20,
            }, endElement: [typeChip, sizeChip] }, (entry.url ? { href: entry.url } : {}));
        children.push(item);
    }
    // Return a responsive list for both desktop and mobile consumption
    const list = {
        type: "List",
        childrenProps: children,
    };
    return list;
}
//# sourceMappingURL=755.js.map