export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper: convert bytes into a human-readable string
    const formatBytes = (bytes) => {
        if (bytes === 0)
            return "0 Bytes";
        const k = 1024;
        const units = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
        return `${value} ${units[i]}`;
    };
    // Build a list of metadata entries
    const items = [];
    // Artifact ID
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "subtitle2" },
        value: { type: "Markdown", content: `${input.id}` },
    });
    // Created at
    if (input.created_at) {
        const created = new Date(input.created_at).toLocaleString();
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "subtitle2" },
            value: { type: "Markdown", content: created },
        });
    }
    // Updated at
    if (input.updated_at) {
        const updated = new Date(input.updated_at).toLocaleString();
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Updated", variant: "subtitle2" },
            value: { type: "Markdown", content: updated },
        });
    }
    // Expires at
    if (input.expires_at) {
        const expires = new Date(input.expires_at).toLocaleString();
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Expires", variant: "subtitle2" },
            value: { type: "Markdown", content: expires },
        });
    }
    // SHA256 digest (if any)
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Digest", variant: "subtitle2" },
        value: {
            type: "Markdown",
            content: (_a = input.digest) !== null && _a !== void 0 ? _a : "_N/A_",
        },
    });
    // Workflow run details (rendered as a JSON code block)
    if (input.workflow_run) {
        const json = JSON.stringify(input.workflow_run, null, 2);
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Workflow Run", variant: "subtitle2" },
            value: {
                type: "Markdown",
                content: ["json", json, "```"].join("\n"),
            },
        });
    }
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Icon representing the artifact
    const fileIcon = {
        type: "Icon",
        id: "archive",
        size: 40,
        color: "blue",
    };
    // Status indicator chip
    const statusChip = {
        type: "Chip",
        label: input.expired ? "Expired" : "Active",
        color: input.expired ? "error" : "success",
        variant: "filled",
        size: "small",
    };
    // Card header with title, size, icon, and status
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Size: ${formatBytes(input.size_in_bytes)}`,
        startElement: fileIcon,
        endElement: statusChip,
    };
    // Wrap the metadata list in the card content
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Action buttons for viewing and downloading
    const viewButton = {
        type: "Button",
        variant: "outlined",
        color: "primary",
        size: "small",
        label: "View Artifact",
        href: input.url,
    };
    const downloadButton = {
        type: "Button",
        variant: "contained",
        color: "primary",
        size: "small",
        label: "Download",
        href: input.archive_download_url,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [viewButton, downloadButton],
    };
    // Final vertical card combining header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=573.js.map