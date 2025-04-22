export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort comments chronologically so the oldest appear first
    const sortedComments = [...input].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    // Map each comment to a DataListItem
    const items = sortedComments.map((comment) => {
        var _a, _b, _c, _d;
        const user = comment.user;
        // Build the avatar (falls back to a blank src if missing)
        const avatar = {
            type: "Avatar",
            src: (_a = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _a !== void 0 ? _a : "",
            name: (_b = user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "",
            variant: "gray",
            size: 32,
        };
        // Build the header text: "username • date"
        const timeString = new Date(comment.created_at).toLocaleString();
        const headerText = {
            type: "Text",
            content: `${(_c = user === null || user === void 0 ? void 0 : user.login) !== null && _c !== void 0 ? _c : "Unknown"} • ${timeString}`,
            variant: "subtitle2",
            color: "tertiary",
        };
        // Compose the label as [avatar, headerText]
        const labelComponents = [
            avatar,
            headerText,
        ];
        // Comment body: use Markdown to render rich text
        const bodyMarkdown = {
            type: "Markdown",
            content: ((_d = comment.body) === null || _d === void 0 ? void 0 : _d.trim()) && comment.body !== null
                ? comment.body
                : "_No content available_",
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: bodyMarkdown,
        };
    });
    // Return a DataList wrapping all comment items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=785.js.map