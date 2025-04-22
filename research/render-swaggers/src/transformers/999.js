export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no packages, show an informative markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No packages available",
        };
    }
    // Helper to convert ISO strings into a human‐friendly format.
    const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    // Transform each package into a DataListItem for presentation.
    const items = input.map((pkg) => {
        // Build the label: an optional avatar plus a markdown link as heading.
        const labelComponents = [];
        if (pkg.owner && pkg.owner.avatar_url) {
            labelComponents.push({
                type: "Avatar",
                src: pkg.owner.avatar_url,
                name: pkg.owner.login,
                size: 40,
            });
        }
        // Render the package name as a markdown link for better readability and clickability.
        labelComponents.push({
            type: "Markdown",
            content: `#### [${pkg.name}](${pkg.html_url})`,
        });
        // Build the value side: type chip, version badge, and dates.
        const valueComponents = [];
        // Package type indicator.
        valueComponents.push({
            type: "Chip",
            label: pkg.package_type,
            variant: "outlined",
        });
        // Version count as a badge with an icon.
        valueComponents.push({
            type: "Badge",
            count: pkg.version_count,
            maxCount: 9999,
            childrenProps: {
                type: "Icon",
                id: "tag", // font‑awesome "tag" icon
            },
        });
        // Created and updated dates, shown as caption text.
        valueComponents.push({
            type: "Text",
            content: `Created: ${formatDate(pkg.created_at)}`,
            variant: "caption",
        });
        valueComponents.push({
            type: "Text",
            content: `Updated: ${formatDate(pkg.updated_at)}`,
            variant: "caption",
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a responsive data list.
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=999.js.map