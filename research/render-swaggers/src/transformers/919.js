export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub simple_user records into an AutoView DataList
function visualizeData(input) {
    // Sort users alphabetically by login for consistent ordering
    const users = [...input].sort((a, b) => a.login.localeCompare(b.login));
    // Map each user to a DataListItemProps
    const items = users.map(user => {
        // Compose the label: avatar + login link + optional admin chip
        const labelComponents = [];
        // User avatar
        labelComponents.push({
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            variant: "gray",
            size: 40,
        });
        // Login as a clickable text button linking to the user's GitHub profile
        labelComponents.push({
            type: "Button",
            label: user.login,
            variant: "text",
            size: "small",
            href: user.html_url,
        });
        // If the user is a site admin, show a red "ADMIN" chip
        if (user.site_admin) {
            labelComponents.push({
                type: "Chip",
                label: "ADMIN",
                variant: "outlined",
                size: "small",
                color: "error",
            });
        }
        // Compose the value: name, email tooltip, and user type
        const valueComponents = [];
        // Show the user's real name if available
        if (user.name) {
            valueComponents.push({
                type: "Text",
                content: user.name,
                variant: "body1",
                color: "secondary",
            });
        }
        // If an email is present, show an envelope icon with tooltip
        if (user.email) {
            valueComponents.push({
                type: "Tooltip",
                message: user.email,
                childrenProps: {
                    type: "Icon",
                    id: "envelope",
                    size: 16,
                    color: "gray",
                },
            });
        }
        // Always display the GitHub account type (e.g. "User", "Organization")
        valueComponents.push({
            type: "Icon",
            id: "user",
            size: 16,
            color: "blue",
        });
        valueComponents.push({
            type: "Text",
            content: user.type,
            variant: "caption",
            color: "gray",
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return the full DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=919.js.map