export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a responsive list of users with avatar, basic info, and a link button.
    const items = input.map(user => {
        var _a;
        // Fallback to login if no display name is provided.
        const title = (_a = user.name) !== null && _a !== void 0 ? _a : user.login;
        // Compose description with email (if any) and user ID for quick glance.
        const descriptionParts = [];
        if (user.email) {
            descriptionParts.push(user.email);
        }
        descriptionParts.push(`ID: ${user.id}`);
        return {
            type: "ListItem",
            title,
            description: descriptionParts.join(" • "),
            // Show user's avatar as a visual start element.
            startElement: {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 32,
                // Use a consistent color theme.
                variant: "blue",
            },
            // Provide a button linking to the user's GitHub profile.
            endElement: {
                type: "Button",
                label: "View",
                href: user.html_url,
                variant: "outlined",
                color: "primary",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "arrow-right",
                    size: 16,
                    color: "blue",
                },
            },
        };
    });
    // Wrap items in a List component for a clean, mobile-friendly UI.
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=477.js.map