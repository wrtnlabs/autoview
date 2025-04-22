export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no packages are provided, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "# No Packages Available\n\nThere are no packages to display at this moment.",
        };
    }
    // Map each package into a ListItemProps for a responsive list
    const listItems = input.map((pkg) => {
        // Determine the start element: use owner's avatar if available, otherwise a generic icon
        const startElement = pkg.owner && pkg.owner.avatar_url
            ? {
                type: "Avatar",
                src: pkg.owner.avatar_url,
                name: pkg.owner.login, // will be shown as alt text / fallback
            }
            : {
                type: "Icon",
                id: "box", // generic box icon for packages
                color: "gray",
                size: 24,
            };
        // A chip to show the package type (npm, maven, docker, etc.)
        const typeChip = {
            type: "Chip",
            label: pkg.package_type,
            variant: "outlined",
            size: "small",
        };
        // A badge to display the number of versions
        const versionBadge = {
            type: "Badge",
            count: pkg.version_count,
            childrenProps: {
                type: "Icon",
                id: "tag", // tag icon for versions
                size: 16,
                color: "gray",
            },
            // use an info color to make the badge stand out
            color: "info",
        };
        // Format the updated date for readability
        const updatedDate = new Date(pkg.updated_at).toLocaleDateString();
        return Object.assign({ type: "ListItem", title: pkg.name, description: `Updated: ${updatedDate}`, startElement, 
            // Show both the type chip and version badge on the right side
            endElement: [typeChip, versionBadge] }, (pkg.html_url ? { href: pkg.html_url } : {}));
    });
    // Return a ListProps component containing all package list items
    const listProps = {
        type: "List",
        childrenProps: listItems,
    };
    return listProps;
}
//# sourceMappingURL=969.js.map