export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each commit into a DataListItem with avatar, login, message, date, and a view button.
    const listItems = input.items.map((item) => {
        var _a, _b;
        // Determine author information, falling back to commit author if needed.
        const author = item.author;
        const authorLogin = (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : item.commit.author.name;
        const authorAvatar = (_b = author === null || author === void 0 ? void 0 : author.avatar_url) !== null && _b !== void 0 ? _b : "";
        // Format the commit date for display.
        const dateStr = new Date(item.commit.author.date).toLocaleString();
        // Avatar component for the author.
        const avatar = {
            type: "Avatar",
            src: authorAvatar,
            name: authorLogin,
            size: 32,
            variant: "primary",
        };
        // Text component for the author's login.
        const loginText = {
            type: "Text",
            content: authorLogin,
            variant: "body1",
            color: "gray",
        };
        // Markdown component to render the commit message (supports multi-line, bullet lists, etc.).
        const messageMd = {
            type: "Markdown",
            content: item.commit.message,
        };
        // Caption text for the commit date.
        const dateText = {
            type: "Text",
            content: dateStr,
            variant: "caption",
            color: "secondary",
        };
        // Button to navigate to the full commit on GitHub.
        const viewButton = {
            type: "Button",
            label: "View",
            href: item.html_url,
            startElement: { type: "Icon", id: "link", size: 16 },
            variant: "text",
            color: "primary",
            size: "small",
        };
        return {
            type: "DataListItem",
            // Use an array of presentation components for the label (avatar + login).
            label: [avatar, loginText],
            // Use an array for the value (message, date, and action).
            value: [messageMd, dateText, viewButton],
        };
    });
    // Wrap all items into a single DataList for responsive display.
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=900.js.map