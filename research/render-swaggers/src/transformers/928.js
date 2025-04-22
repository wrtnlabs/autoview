export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users found\n\nThere are currently no users to display."
        };
    }
    // Transform each GitHub user into a DataListItem
    const items = input.map((user) => {
        // Compose the label as an array of presentation components:
        // - Avatar with the user's avatar URL
        // - Primary text for the login
        // - Secondary text for the full name or email if available
        const labelComponents = [
            {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40
            },
            {
                type: "Text",
                variant: "subtitle1",
                content: user.login
            }
        ];
        if (user.name) {
            labelComponents.push({
                type: "Text",
                variant: "caption",
                content: user.name,
                color: "gray"
            });
        }
        else if (user.email) {
            labelComponents.push({
                type: "Text",
                variant: "caption",
                content: user.email,
                color: "gray"
            });
        }
        // Create a button that links to the user's GitHub profile
        const profileButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "blue"
            },
            label: "Profile",
            href: user.html_url
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: profileButton
        };
    });
    // Return a DataList containing all user items
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=928.js.map