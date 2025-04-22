export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no user data, render a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users available\n\nThere are currently no GitHub users to display.",
        };
    }
    // Transform each GitHub user into a DataListItemProps
    const listItems = input.map((user) => {
        // 1. Avatar for the user
        const avatar = {
            type: "Avatar",
            src: user.avatar_url, // display their avatar image
            name: user.login, // fallback initials if image fails
            size: 40, // moderately sized for list layout
        };
        // 2. Primary text: the user's login
        const loginText = {
            type: "Text",
            content: user.login,
            variant: "body1",
        };
        // 3. Secondary text: the user's real name (if available)
        const nameText = user.name
            ? {
                type: "Text",
                content: user.name,
                variant: "caption",
                color: "gray",
            }
            : undefined;
        // 4. Action button linking to the user's GitHub profile
        const profileButton = {
            type: "Button",
            label: "View Profile",
            href: user.html_url,
            variant: "outlined",
            size: "small",
        };
        // Assemble the label region: avatar + texts
        const labelRegion = [
            avatar,
            loginText,
        ];
        if (nameText) {
            labelRegion.push(nameText);
        }
        return {
            type: "DataListItem",
            label: labelRegion,
            value: profileButton,
        };
    });
    // Return a DataList that will render responsively on all screen sizes
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=948.js.map