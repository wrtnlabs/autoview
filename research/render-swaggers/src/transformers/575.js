export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date strings into a human-readable format.
    // Falls back to the raw input if parsing fails.
    const formatDate = (iso) => {
        if (!iso)
            return "N/A";
        const d = new Date(iso);
        if (isNaN(d.getTime()))
            return iso;
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const { total_count, actions_caches } = input;
    // If there are no cache entries, show a friendly markdown message.
    if (!actions_caches || actions_caches.length === 0) {
        return {
            type: "Markdown",
            content: `**No action caches found.**\n\nYou can configure your workflow to generate caches by adding cache steps to your actions.`,
        };
    }
    // Transform each cache entry into a DataListItemProps.
    const listItems = actions_caches.map((cache) => {
        var _a, _b;
        // Chip for the version field
        const versionChip = {
            type: "Chip",
            label: (_a = cache.version) !== null && _a !== void 0 ? _a : "N/A",
            color: "teal",
            size: "small",
            variant: "outlined",
        };
        // Chip for the size_in_bytes field (converted to KB)
        const sizeLabel = typeof cache.size_in_bytes === "number"
            ? `${Math.round(cache.size_in_bytes / 1024)} KB`
            : "N/A";
        const sizeChip = {
            type: "Chip",
            label: sizeLabel,
            color: "violet",
            size: "small",
            variant: "outlined",
        };
        // Text component for the last accessed date
        const lastAccessText = {
            type: "Text",
            content: `Last accessed: ${formatDate(cache.last_accessed_at)}`,
            variant: "caption",
            color: "gray",
        };
        // Text component for the created date
        const createdText = {
            type: "Text",
            content: `Created: ${formatDate(cache.created_at)}`,
            variant: "caption",
            color: "gray",
        };
        return {
            type: "DataListItem",
            // Use the cache key as the primary label
            label: {
                type: "Text",
                content: (_b = cache.key) !== null && _b !== void 0 ? _b : "Unknown key",
                variant: "body1",
            },
            // Display version, size, and timestamps as value components
            value: [versionChip, sizeChip, lastAccessText, createdText],
        };
    });
    // Compose a card with a header and the data list
    const header = {
        type: "CardHeader",
        title: "Repository Actions Caches",
        description: `${total_count} entr${total_count === 1 ? "y" : "ies"}`,
        startElement: {
            type: "Icon",
            id: "database",
            color: "blue",
            size: 24,
        },
    };
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // Return a vertical card containing the header and the list of caches
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=575.js.map