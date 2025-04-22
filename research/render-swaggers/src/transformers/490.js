export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, show a friendly message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No users to display.",
        };
    }
    // Map each GitHub user to a ListItem component
    const listItems = input.map((user) => {
        var _a, _b;
        // Use the user's name or email as a description, fallback to empty string
        const description = (_b = (_a = user.name) !== null && _a !== void 0 ? _a : user.email) !== null && _b !== void 0 ? _b : "";
        // Avatar component for the user's avatar URL
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
        };
        return {
            type: "ListItem",
            title: user.login,
            description: description,
            startElement: avatar,
        };
    });
    // Compose the List component containing all users
    const userList = {
        type: "List",
        childrenProps: listItems,
    };
    return userList;
}
//# sourceMappingURL=490.js.map