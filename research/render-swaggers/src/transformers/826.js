export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no comments, show a simple text indicator
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No comments to display",
            variant: "body1",
            color: "gray",
        };
    }
    // Map GitHub author associations to avatar color variants
    const associationColorMap = {
        OWNER: "primary",
        COLLABORATOR: "success",
        MEMBER: "secondary",
        CONTRIBUTOR: "info",
        FIRST_TIMER: "orange",
        FIRST_TIME_CONTRIBUTOR: "yellow",
        MANNEQUIN: "gray",
        NONE: "darkGray",
    };
    // Compose a DataList component where each entry is one PR review comment
    const items = input.map((comment) => {
        var _a, _b, _c, _d, _e;
        const user = comment.user;
        // Format the creation date for display
        const dateString = new Date(comment.created_at).toLocaleString();
        // Choose a color variant for the avatar based on author association
        const avatarVariant = associationColorMap[(_a = comment.author_association) !== null && _a !== void 0 ? _a : "NONE"] ||
            "gray";
        // Build the avatar for the comment author
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            variant: avatarVariant,
            size: 32,
        };
        // Text showing filename and line number context
        const fileContext = {
            type: "Text",
            content: `${comment.path}:${(_c = (_b = comment.line) !== null && _b !== void 0 ? _b : comment.position) !== null && _c !== void 0 ? _c : "?"}`,
            variant: "body2",
            color: "tertiary",
        };
        // Markdown for the comment body to render any markdown or code snippets
        const bodyMarkdown = {
            type: "Markdown",
            content: comment.body,
        };
        // Small caption showing when the comment was created
        const dateCaption = {
            type: "Text",
            content: dateString,
            variant: "caption",
            color: "gray",
        };
        // A chip indicating the total number of reactions
        const reactionChip = {
            type: "Chip",
            label: `Reactions: ${(_e = (_d = comment.reactions) === null || _d === void 0 ? void 0 : _d.total_count) !== null && _e !== void 0 ? _e : 0}`,
            size: "small",
            variant: "outlined",
        };
        return {
            type: "DataListItem",
            // Combine avatar, username, and file context into the label
            label: [
                avatar,
                {
                    type: "Text",
                    content: user.login,
                    variant: "subtitle1",
                    color: "primary",
                },
                fileContext,
            ],
            // Combine the rendered comment, date, and reactions into the value
            value: [bodyMarkdown, dateCaption, reactionChip],
        };
    });
    // Return the DataList component wrapping all comment items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=826.js.map