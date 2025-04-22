export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Helper to guess the syntax highlighting language from file extension.
     */
    function guessLanguage(filename) {
        var _a, _b;
        const ext = (_b = (_a = filename.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
        switch (ext) {
            case "ts":
            case "js":
            case "jsx":
            case "tsx":
                return ext;
            case "py":
                return "python";
            case "java":
                return "java";
            case "md":
                return "markdown";
            case "json":
                return "json";
            case "html":
            case "htm":
                return "html";
            case "css":
                return "css";
            default:
                return "";
        }
    }
    /**
     * Convert raw byte size into human-readable string.
     */
    function formatSize(bytes) {
        if (bytes >= 1 << 20) {
            return (bytes / (1 << 20)).toFixed(2) + " MB";
        }
        else if (bytes >= 1 << 10) {
            return (bytes / (1 << 10)).toFixed(2) + " KB";
        }
        else {
            return bytes + " B";
        }
    }
    // Build the card header: shows file icon, name and path
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.path,
        startElement: {
            type: "Icon",
            id: "file", // generic file icon
            size: 24,
            color: "blue"
        }
    };
    // Build the card content: render file content in a markdown code block
    const codeLang = guessLanguage(input.name);
    const fenced = codeLang
        ? "" + codeLang + "\n" + input.content + "\n```"
        : "```\n" + input.content + "\n```";
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                content: fenced
            }
        ]
    };
    // Build data list items for metadata
    const items = [];
    // File type
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Type" },
        value: { type: "Text", content: input.type }
    });
    // Encoding
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Encoding" },
        value: { type: "Text", content: input.encoding }
    });
    // Size (human readable)
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Size" },
        value: { type: "Text", content: formatSize(input.size) }
    });
    // SHA
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "SHA" },
        value: { type: "Text", content: input.sha }
    });
    // Build buttons for available links dynamically
    const linkButtons = [];
    if (input.download_url) {
        linkButtons.push({
            type: "Button",
            label: "Download",
            variant: "outlined",
            size: "small",
            color: "primary",
            href: input.download_url,
            startElement: { type: "Icon", id: "download", size: 16 }
        });
    }
    if (input.html_url) {
        linkButtons.push({
            type: "Button",
            label: "View",
            variant: "contained",
            size: "small",
            color: "secondary",
            href: input.html_url,
            startElement: { type: "Icon", id: "external-link-alt", size: 16 }
        });
    }
    if (linkButtons.length) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Links" },
            value: linkButtons
        });
    }
    // Wrap metadata items in a DataList
    const metadataList = {
        type: "DataList",
        childrenProps: items
    };
    // Footer holds the metadata DataList
    const footer = {
        type: "CardFooter",
        childrenProps: metadataList
    };
    // Compose everything into a vertical card for a clean, responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=845.js.map