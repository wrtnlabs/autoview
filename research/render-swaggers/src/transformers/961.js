export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each organization membership into a ListItem with visual elements:
    const listItems = input.map((membership) => {
        const { user, organization, role, state, url } = membership;
        // Determine avatar or fallback icon for the user
        const startElement = user
            ? {
                type: "Avatar",
                src: user.avatar_url, // show user's avatar
                name: user.name || user.login, // tooltip on hover
                size: 32,
            }
            : {
                // If user data is missing, show a generic user icon
                type: "Icon",
                id: "user",
                color: "gray",
                size: 32,
            };
        // Role chip: use color coding for different roles
        const roleChip = {
            type: "Chip",
            label: role.toUpperCase(),
            size: "small",
            variant: "filled",
            // assign a theme color per role
            color: role === "admin"
                ? "error"
                : role === "billing_manager"
                    ? "warning"
                    : "primary",
        };
        // State chip: active vs pending
        const stateChip = {
            type: "Chip",
            label: state.charAt(0).toUpperCase() + state.slice(1),
            size: "small",
            variant: "outlined",
            color: state === "active" ? "success" : "info",
        };
        return {
            type: "ListItem",
            // Display user's login or a placeholder
            title: user ? user.login : "Unknown User",
            // Show the organization login as description
            description: organization.login,
            startElement,
            // Place the role and state chips as end elements
            endElement: [roleChip, stateChip],
            // Link to the membership URL on click
            href: url,
        };
    });
    // Compose the List component with all list items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=961.js.map