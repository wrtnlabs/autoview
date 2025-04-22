export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map over each package to create a ListItem representing it.
    const listItems = input.map((pkg) => {
        // Format the subtitle with version count and human-readable update time.
        const updatedDate = new Date(pkg.updated_at).toLocaleDateString();
        const subtitle = `${pkg.version_count} version${pkg.version_count !== 1 ? "s" : ""} • updated ${updatedDate}`;
        // Build the startElement: owner's avatar if available, otherwise omit.
        const startElement = pkg.owner
            ? {
                type: "Avatar",
                src: pkg.owner.avatar_url,
                name: pkg.owner.login,
                // Use a neutral variant and a standard size for consistent appearance.
                variant: "gray",
                size: 32,
            }
            : undefined;
        // Build endElement array: a View button, and Chips for type & visibility.
        const endElements = [];
        // Button to view the package HTML page.
        endElements.push({
            type: "Button",
            label: "View",
            href: pkg.html_url,
            variant: "outlined",
            size: "small",
            color: "primary",
        });
        // Chip showing package type.
        endElements.push({
            type: "Chip",
            label: pkg.package_type,
            color: "secondary",
            size: "small",
            variant: "filled",
        });
        // Chip showing visibility status.
        endElements.push({
            type: "Chip",
            label: pkg.visibility,
            color: pkg.visibility === "public" ? "success" : "error",
            size: "small",
            variant: "outlined",
        });
        return {
            type: "ListItem",
            title: pkg.name,
            description: subtitle,
            startElement,
            endElement: endElements,
            // Make the entire item clickable as well.
            href: pkg.html_url,
        };
    });
    // Compose a List component to hold all the ListItems.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=491.js.map