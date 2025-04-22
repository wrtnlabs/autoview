export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare a sticky subheader showing total users count
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            // Display count of users
            content: `GitHub Users (${input.length})`,
            variant: "subtitle1",
        },
    };
    // Map each GitHub user to a list item
    const items = input.map((user) => {
        var _a;
        // Avatar showing user's GitHub avatar
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
        };
        // Action buttons: view profile and (optionally) send email
        const actions = [
            {
                type: "Button",
                variant: "text",
                // Use FontAwesome's GitHub icon
                startElement: { type: "Icon", id: "github", size: 16 },
                label: "Profile",
                href: user.html_url,
            },
        ];
        if (user.email) {
            actions.push({
                type: "Button",
                variant: "text",
                startElement: { type: "Icon", id: "envelope", size: 16 },
                label: "Email",
                href: `mailto:${user.email}`,
            });
        }
        // Build the list item
        const listItem = {
            type: "ListItem",
            title: user.login,
            // Show email if available, otherwise the profile URL
            description: (_a = user.email) !== null && _a !== void 0 ? _a : user.html_url,
            startElement: avatar,
            endElement: actions,
            // Make the entire item clickable to the profile if no other action is pressed
            href: user.html_url,
        };
        return listItem;
    });
    // Compose the List component for responsive display
    const list = {
        type: "List",
        childrenProps: [subheader, ...items],
    };
    return list;
}
//# sourceMappingURL=655.js.map