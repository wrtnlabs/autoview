export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no packages are provided, show a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No packages available\n\nPlease check back later or try another query."
        };
    }
    // Sort packages by version_count descending to highlight the most updated ones
    const sortedPackages = [...input].sort((a, b) => b.version_count - a.version_count);
    // Map package_type to a friendly color for the Chip component
    const packageTypeColor = {
        npm: "orange",
        maven: "indigo",
        rubygems: "pink",
        docker: "cyan",
        nuget: "blue",
        container: "teal"
    };
    // Transform each package into a DataListItemProps
    const items = sortedPackages.map(pkg => {
        // A chip showing the package ecosystem/type
        const typeChip = {
            type: "Chip",
            label: pkg.package_type.toUpperCase(),
            variant: "outlined",
            color: packageTypeColor[pkg.package_type] || "gray",
            size: "small"
        };
        // A badge showing the number of versions, with a tag icon
        const versionBadge = {
            type: "Badge",
            count: pkg.version_count,
            maxCount: 999,
            showZero: true,
            dot: false,
            childrenProps: {
                type: "Icon",
                id: "tag",
                size: 16,
                color: "green"
            }
        };
        // A button linking to the package's HTML URL
        const viewButton = {
            type: "Button",
            variant: "text",
            size: "small",
            label: "Open",
            href: pkg.html_url,
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 16,
                color: "blue"
            }
        };
        // The main label showing the package name
        const nameText = {
            type: "Text",
            content: pkg.name,
            variant: "subtitle1",
            color: "primary"
        };
        return {
            type: "DataListItem",
            // Combine the name and the ecosystem chip horizontally
            label: [nameText, typeChip],
            // Show version count badge and the "Open" button
            value: [versionBadge, viewButton]
        };
    });
    // Wrap all items in a DataList component for a clean, responsive list UI
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    return dataList;
}
//# sourceMappingURL=447.js.map