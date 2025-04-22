export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract plugins array, defaulting to empty if undefined.
    const plugins = (_a = input.plugins) !== null && _a !== void 0 ? _a : [];
    // If there are no plugins, show a friendly Markdown message.
    if (plugins.length === 0) {
        return {
            type: "Markdown",
            content: `### No plugins available\n\nThere are currently no plugins to display.`
        };
    }
    // Build list children: a subheader plus one ListItem per plugin.
    const listChildren = [];
    // Add a sticky subheader for the list.
    listChildren.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            // Use Text for the section title.
            type: "Text",
            variant: "h6",
            content: "Installed Plugins"
        }
    });
    // Map each plugin to a ListItem.
    for (const plugin of plugins) {
        // Prepare the avatar or icon for the plugin.
        const startElement = plugin.deskImageUrl
            ? {
                type: "Avatar",
                src: plugin.deskImageUrl,
                name: plugin.name,
                variant: "primary",
                size: 32
            }
            : {
                type: "Icon",
                id: "puzzle-piece",
                color: "cyan",
                size: 24
            };
        // Format the creation date if available.
        const createdAtText = plugin.createdAt
            ? new Date(plugin.createdAt).toLocaleDateString()
            : "Unknown date";
        // Build a status chip for the plugin state.
        const stateChip = {
            type: "Chip",
            label: (_b = plugin.state) !== null && _b !== void 0 ? _b : "waiting",
            color: plugin.state === "active" ? "green" : "warning",
            variant: "filled",
            size: "small"
        };
        // Optional display of channelId as a chip if present.
        const channelChip = plugin.channelId
            ? {
                type: "Chip",
                label: plugin.channelId,
                color: "blue",
                variant: "outlined",
                size: "small"
            }
            : undefined;
        // Assemble endElement array: always show state, then optional channel.
        const endElements = [stateChip];
        if (channelChip)
            endElements.push(channelChip);
        // Compose the ListItemProps.
        const item = {
            type: "ListItem",
            title: plugin.name,
            description: `Created: ${createdAtText}`,
            startElement,
            endElement: endElements
        };
        listChildren.push(item);
    }
    // Return the List component wrapping all plugins.
    return {
        type: "List",
        childrenProps: listChildren
    };
}
//# sourceMappingURL=197.js.map