export function transform($input) {
    return visualizeData($input);
}
// Helper to format bytes into human-readable strings.
function formatBytes(bytes) {
    if (bytes === 0) {
        return "0 B";
    }
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${value} ${sizes[i]}`;
}
function visualizeData(input) {
    const usages = input.repository_cache_usages || [];
    // If there's no data, display a friendly markdown message.
    if (usages.length === 0) {
        return {
            type: "Markdown",
            content: "_No repository cache usage data available._"
        };
    }
    // Sort repositories by descending total cache size to highlight largest consumers.
    const sorted = [...usages].sort((a, b) => b.active_caches_size_in_bytes - a.active_caches_size_in_bytes);
    // Build a DataList where each item shows repo name and two chips: count & size.
    const items = sorted.map(repo => ({
        type: "DataListItem",
        // Use Markdown for the label to make the repository name stand out.
        label: [
            {
                type: "Markdown",
                content: `**${repo.full_name}**`
            }
        ],
        // Value is an array of chips for count and size.
        value: [
            {
                type: "Chip",
                label: `${repo.active_caches_count}`,
                // Database icon to represent count of caches.
                startElement: {
                    type: "Icon",
                    id: "database",
                    color: "blue",
                    size: 16
                },
                variant: "outlined",
                size: "small",
                color: "primary"
            },
            {
                type: "Chip",
                label: formatBytes(repo.active_caches_size_in_bytes),
                // Download icon to represent size in bytes.
                startElement: {
                    type: "Icon",
                    id: "download",
                    color: "teal",
                    size: 16
                },
                variant: "outlined",
                size: "small",
                color: "success"
            }
        ]
    }));
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=376.js.map