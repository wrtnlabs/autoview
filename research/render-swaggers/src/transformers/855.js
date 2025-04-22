export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no assets, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No release assets available\n\nThere are currently no assets to display."
        };
    }
    // Helper to format bytes into KB/MB for readability
    const formatSize = (bytes) => {
        if (bytes < 1024)
            return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024)
            return `${kb.toFixed(2)} KB`;
        return `${(kb / 1024).toFixed(2)} MB`;
    };
    // Transform each asset into a ListItem component
    const listItems = input.map(asset => {
        var _a;
        // Prepare uploader avatar; if missing, show a placeholder avatar
        const uploader = asset.uploader;
        const avatar = {
            type: "Avatar",
            src: uploader === null || uploader === void 0 ? void 0 : uploader.avatar_url,
            name: (_a = uploader === null || uploader === void 0 ? void 0 : uploader.login) !== null && _a !== void 0 ? _a : "Unknown",
            size: 32,
            variant: "primary"
        };
        // Download badge to show the number of downloads with a download icon
        const downloadBadge = {
            type: "Badge",
            count: asset.download_count,
            childrenProps: {
                type: "Icon",
                id: "download",
                size: 16,
                color: "blue"
            },
            showZero: true
        };
        // Download button linking directly to the browser_download_url
        const downloadButton = {
            type: "Button",
            variant: "outlined",
            size: "small",
            label: "Download",
            href: asset.browser_download_url
        };
        // Compose human-friendly description: size and upload date
        const sizeText = formatSize(asset.size);
        const dateText = new Date(asset.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        const description = `${sizeText} · Uploaded on ${dateText}`;
        // Each list item is clickable, takes user to download link
        return {
            type: "ListItem",
            title: asset.name,
            description,
            startElement: avatar,
            endElement: [downloadButton, downloadBadge],
            href: asset.browser_download_url
        };
    });
    // Return a responsive list of assets
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=855.js.map