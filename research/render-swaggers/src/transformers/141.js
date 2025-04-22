export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to detect image files by extension
    const imageExtensions = new Set(["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"]);
    // Transform each snapshot into a DataListItem
    const snapshotItems = input.snapshots.map((snapshot) => {
        // Build attachment components: images or download buttons
        const attachmentComponents = snapshot.files.map((file) => {
            var _a;
            const ext = ((_a = file.extension) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
            if (imageExtensions.has(ext)) {
                // Render inline image preview for image attachments
                return {
                    type: "Image",
                    src: file.url,
                    alt: file.name || "attachment",
                };
            }
            else {
                // Non-image attachments: provide a download link button
                return {
                    type: "Button",
                    label: `Download ${file.name}${ext ? "." + ext : ""}`,
                    href: file.url,
                    variant: "text",
                };
            }
        });
        return {
            type: "DataListItem",
            // Use the snapshot timestamp as the label
            label: [
                {
                    type: "Text",
                    content: snapshot.created_at,
                    variant: "caption",
                },
            ],
            // Show markdown content followed by any attachments
            value: [
                {
                    type: "Markdown",
                    content: snapshot.body,
                },
                // Spread attachments (if any)
                ...attachmentComponents,
            ],
        };
    });
    // Compose the DataList of snapshots
    const dataList = {
        type: "DataList",
        childrenProps: snapshotItems,
    };
    // Finally wrap everything in a collapsible comment section
    return {
        type: "Collapse",
        header: {
            type: "CollapseHeader",
            // Prepend a user icon and writer info
            childrenProps: [
                {
                    type: "Icon",
                    id: "user",
                    size: 24,
                    color: "blue",
                },
                {
                    type: "Text",
                    content: `Writer: ${String(input.writer)}`,
                    variant: "subtitle2",
                },
                {
                    type: "Text",
                    content: `Comment ID: ${input.id}`,
                    variant: "caption",
                },
            ],
            // Use a caret icon for expand/collapse toggle
            toggleIcon: {
                type: "Icon",
                id: "caret-down",
                size: 20,
                color: "gray",
            },
        },
        content: {
            type: "CollapseContent",
            // Embed the DataList of snapshot history
            childrenProps: [
                dataList,
            ],
        },
    };
}
//# sourceMappingURL=141.js.map