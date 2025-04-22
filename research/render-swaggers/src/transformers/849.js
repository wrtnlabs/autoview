export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a GitHub release asset into a visual representation using AutoView components.
 */
function visualizeData(input) {
    var _a;
    // Helper: Format bytes into human-readable string
    function formatBytes(bytes) {
        if (bytes < 1024)
            return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024)
            return `${kb.toFixed(1)} KB`;
        const mb = kb / 1024;
        if (mb < 1024)
            return `${mb.toFixed(1)} MB`;
        const gb = mb / 1024;
        return `${gb.toFixed(1)} GB`;
    }
    // Helper: Safely format a date-time string to the user's locale
    function formatDateTime(dt) {
        try {
            return new Date(dt).toLocaleString();
        }
        catch (_a) {
            return dt;
        }
    }
    // Build a list of key/value rows for the asset properties
    const listItems = [];
    // Asset unique identifier
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "body2" },
        value: { type: "Text", content: `${input.id}`, variant: "body2" },
    });
    // Asset name (redundant here since header shows it, but could be useful)
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Filename", variant: "body2" },
        value: { type: "Text", content: input.name, variant: "body2" },
    });
    // Download count
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Downloads", variant: "body2" },
        value: { type: "Text", content: `${input.download_count}`, variant: "body2" },
    });
    // Asset file size
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Size", variant: "body2" },
        value: { type: "Text", content: formatBytes(input.size), variant: "body2" },
    });
    // Upload state as a colored chip
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "State", variant: "body2" },
        value: {
            type: "Chip",
            label: input.state,
            // "uploaded" = success green, "open" = warning yellow
            color: input.state === "uploaded" ? "success" : "warning",
            variant: "filled",
            size: "small",
        },
    });
    // Timestamps
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created", variant: "body2" },
        value: { type: "Text", content: formatDateTime(input.created_at), variant: "body2" },
    });
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated", variant: "body2" },
        value: { type: "Text", content: formatDateTime(input.updated_at), variant: "body2" },
    });
    // Uploader info: avatar + login (or fallback to login only)
    if (input.uploader) {
        const uploader = input.uploader;
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Uploader", variant: "body2" },
            value: [
                {
                    type: "Avatar",
                    src: uploader.avatar_url,
                    name: uploader.login,
                    variant: "gray",
                    size: 24,
                },
                {
                    type: "Text",
                    content: uploader.login,
                    variant: "body2",
                },
            ],
        });
    }
    // Compile the DataList component
    const assetDataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header: asset name and optional label
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.label) !== null && _a !== void 0 ? _a : undefined,
        // show uploader avatar in header if available
        startElement: input.uploader
            ? {
                type: "Avatar",
                src: input.uploader.avatar_url,
                name: input.uploader.login,
                variant: "gray",
                size: 32,
            }
            : undefined,
    };
    // Card content: embed the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: assetDataList,
    };
    // Card footer: direct download button
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            variant: "outlined",
            color: "primary",
            size: "medium",
            label: "Download",
            href: input.browser_download_url,
            startElement: {
                type: "Icon",
                id: "download",
                size: 16,
                color: "blue",
            },
        },
    };
    // Wrap into a vertical card for responsive display
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return verticalCard;
}
//# sourceMappingURL=849.js.map