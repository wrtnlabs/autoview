export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no packages, show a friendly message using markdown.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No packages available.**"
        };
    }
    // Build a DataList where each item represents one package.
    const items = input.map((pkg) => {
        // 1. Label: optionally show the owner's avatar + package name as a bold markdown link.
        const labelComponents = [];
        if (pkg.owner && pkg.owner.avatar_url) {
            // Avatar for the owner
            labelComponents.push({
                type: "Avatar",
                src: pkg.owner.avatar_url,
                name: pkg.owner.login,
                variant: "primary",
                size: 24
            });
        }
        // Bold link to the package HTML URL
        const nameMarkdown = {
            type: "Markdown",
            content: `**[${pkg.name}](${pkg.html_url})**`
        };
        labelComponents.push(nameMarkdown);
        // 2. Value: show key metadata as chips + created/updated dates.
        // Chip for version count
        const chips = [
            {
                type: "Chip",
                label: `${pkg.version_count} version${pkg.version_count === 1 ? "" : "s"}`,
                variant: "filled",
                color: "primary",
                size: "small"
            },
            // Chip for package type
            {
                type: "Chip",
                label: pkg.package_type,
                variant: "outlined",
                color: "teal",
                size: "small"
            },
            // Chip for visibility with color hint
            {
                type: "Chip",
                label: pkg.visibility,
                variant: "filled",
                color: pkg.visibility === "public" ? "green" : "gray",
                size: "small"
            }
        ];
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips
        };
        // Markdown for creation and update dates (formatted to locale date)
        const created = new Date(pkg.created_at).toLocaleDateString();
        const updated = new Date(pkg.updated_at).toLocaleDateString();
        const dateMarkdown = {
            type: "Markdown",
            content: `**Created**: ${created}\n**Updated**: ${updated}`
        };
        // Compose the value section with the chip group first, then dates
        const valueComponents = [
            chipGroup,
            dateMarkdown
        ];
        // Return the DataListItem for this package
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Wrap all items in a DataList for responsive display
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    return dataList;
}
//# sourceMappingURL=943.js.map