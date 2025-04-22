export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no licenses, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No licenses available"
        };
    }
    // List of allowed color variants for Avatar components
    const avatarVariants = [
        "primary", "secondary", "success", "error", "warning", "info",
        "red", "orange", "yellow", "lime", "green", "teal", "cyan",
        "blue", "indigo", "violet", "pink", "gray", "darkGray"
    ];
    /**
     * Generate a deterministic color variant based on the input text.
     * This way each license gets a consistent avatar color.
     */
    const getAvatarVariant = (text) => {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = (hash << 5) - hash + text.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return avatarVariants[Math.abs(hash) % avatarVariants.length];
    };
    // Transform each license into a ListItemProps
    const listItems = input.map((license) => {
        var _a;
        // Take the first character of the name (uppercase) for the avatar
        const initial = license.name ? license.name.charAt(0).toUpperCase() : "?";
        const avatar = {
            type: "Avatar",
            name: initial,
            variant: getAvatarVariant(license.name || ""),
            size: 32
        };
        // If an HTML URL is provided, create a "View License" button
        const viewButton = license.html_url
            ? {
                type: "Button",
                label: "View License",
                variant: "outlined",
                size: "small",
                href: license.html_url
            }
            : undefined;
        return {
            type: "ListItem",
            title: license.name,
            description: (_a = license.spdx_id) !== null && _a !== void 0 ? _a : "Unknown SPDX ID",
            startElement: avatar,
            // endElement accepts a single component or array. We provide the button if available.
            endElement: viewButton
        };
    });
    // Return a responsive List component containing all licenses
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=358.js.map