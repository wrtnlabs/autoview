export function transform($input) {
    return visualizeData($input);
}
// Transforms a list of GitHub simple_user objects into an AutoView data list UI
function visualizeData(input) {
    // If no users, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users found.",
        };
    }
    // Build a DataListItem for each user
    const items = input.map(user => {
        var _a;
        // Create the base avatar component
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: (_a = user.name) !== null && _a !== void 0 ? _a : user.login,
            variant: "gray",
            size: 40,
        };
        // If the user is a site admin, wrap avatar in a red badge (dot)
        const avatarDisplay = user.site_admin
            ? {
                type: "Badge",
                dot: true,
                color: "error",
                childrenProps: avatar,
            }
            : avatar;
        // Label: avatar (or badge), username, and optional email
        const labelComponents = [
            avatarDisplay,
            {
                type: "Text",
                variant: "body1",
                content: user.login,
            },
        ];
        if (user.email) {
            labelComponents.push({
                type: "Text",
                variant: "caption",
                content: user.email,
            });
        }
        // Value: a button linking to the user's GitHub profile
        const profileButton = {
            type: "Button",
            label: "View",
            variant: "outlined",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "arrow-right",
                size: 16,
            },
            href: user.html_url,
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: profileButton,
        };
    });
    // Return the assembled data list
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=947.js.map