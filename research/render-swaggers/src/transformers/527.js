export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no configurations, show a friendly markdown message.
    if (input.network_configurations.length === 0) {
        return {
            type: "Markdown",
            content: "### No network configurations found.\nPlease check back later or create a new configuration."
        };
    }
    // Map compute service types to a chip color.
    const serviceColorMap = {
        none: "gray",
        actions: "cyan",
        codespaces: "violet"
    };
    // Build the list children: first a subheader, then one ListItem per configuration.
    const children = [];
    // Show total count at the top.
    children.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                // Use a subtitle variant to make it stand out.
                variant: "subtitle1",
                content: `Total configurations: ${input.total_count}`
            }
        ]
    });
    // For each network configuration, create a list item with visual chips and an icon.
    input.network_configurations.forEach((cfg) => {
        // Format the creation date for display.
        const createdOnText = cfg.created_on
            ? new Date(cfg.created_on).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
            : "N/A";
        // Compute the number of network settings.
        const settingsCount = Array.isArray(cfg.network_settings_ids)
            ? cfg.network_settings_ids.length
            : 0;
        // Build a chip to represent the compute service type.
        const serviceChip = {
            type: "Chip",
            label: cfg.compute_service ? cfg.compute_service : "none",
            color: serviceColorMap[cfg.compute_service || "none"] || "gray",
            variant: "outlined",
            size: "small"
        };
        // Build a chip to represent the number of network settings.
        const countChip = {
            type: "Chip",
            label: `${settingsCount} setting${settingsCount === 1 ? "" : "s"}`,
            color: settingsCount > 0 ? "primary" : "gray",
            variant: "filled",
            size: "small"
        };
        // Create the list item for this configuration.
        const item = {
            type: "ListItem",
            title: cfg.name,
            description: `Created on: ${createdOnText}`,
            // Show service chip as an icon-like start element.
            startElement: serviceChip,
            // Show the settings count chip on the right.
            endElement: [countChip]
        };
        children.push(item);
    });
    // Return a responsive list component containing all items.
    return {
        type: "List",
        childrenProps: children
    };
}
//# sourceMappingURL=527.js.map