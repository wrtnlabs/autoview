export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, show a friendly message
    if (input.length === 0) {
        return {
            type: "Text",
            // Use a subdued color and body text for empty state
            variant: "body1",
            color: "gray",
            content: "No users found."
        };
    }
    // Transform each GitHub user into a DataListItem
    const items = input.map((user) => {
        // Avatar for the user
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "gray"
        };
        // Primary text: username
        const loginText = {
            type: "Text",
            content: user.login,
            variant: "subtitle1",
            color: "primary"
        };
        // Secondary text: real name, if available
        const nameText = {
            type: "Text",
            content: user.name || "",
            variant: "body2",
            color: "secondary"
        };
        // Arrange avatar and text horizontally in the label area
        const labelComponents = [
            avatar,
            loginText
        ];
        if (user.name) {
            labelComponents.push(nameText);
        }
        // Icon for the GitHub logo
        const githubIcon = {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 16
        };
        // A button linking to the user's GitHub profile
        const profileButton = {
            type: "Button",
            label: "Profile",
            variant: "outlined",
            color: "primary",
            startElement: githubIcon,
            href: user.html_url
        };
        return {
            type: "DataListItem",
            // Composite label: avatar + texts
            label: labelComponents,
            // Action value: view profile button
            value: profileButton
        };
    });
    // Return the complete data list
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=991.js.map