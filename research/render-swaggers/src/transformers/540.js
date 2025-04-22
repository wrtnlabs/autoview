export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform an array of team discussion comments into a DataList UI component
    // Each comment will appear as a DataListItem with an author label and a value comprising the comment markdown and optional reaction chips.
    // Helper to build reaction chips for a comment
    function buildReactionChips(reactions) {
        if (!reactions)
            return [];
        // List of reaction keys we want to display (excluding url and total_count)
        const reactionKeys = [
            "+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"
        ];
        return reactionKeys
            .filter((key) => reactions[key] > 0)
            .map((key) => ({
            type: "Chip",
            label: `${key} ${reactions[key]}`,
            size: "small",
            variant: "outlined"
        }));
    }
    // Map each comment to a DataListItemProps
    const childrenProps = input.map((comment) => {
        var _a;
        const author = comment.author;
        // Determine display name, falling back to login or "Unknown"
        const authorName = author && ((_a = author.name) !== null && _a !== void 0 ? _a : author.login) ? (author.name || author.login) : "Unknown";
        // Avatar for the author
        const avatar = {
            type: "Avatar",
            src: author === null || author === void 0 ? void 0 : author.avatar_url,
            name: authorName,
            size: 32
        };
        // Text next to avatar showing the author name
        const authorText = {
            type: "Text",
            content: authorName,
            variant: "body2"
        };
        // Markdown component for the comment body
        const markdown = {
            type: "Markdown",
            content: comment.body
        };
        // Build chips for each non-zero reaction
        const chips = buildReactionChips(comment.reactions);
        const reactionChipGroup = chips.length > 0
            ? {
                type: "ChipGroup",
                childrenProps: chips
            }
            : undefined;
        // Assemble value: always include markdown; append reaction chips if present
        const valueComponents = reactionChipGroup
            ? [markdown, reactionChipGroup]
            : [markdown];
        return {
            type: "DataListItem",
            label: [avatar, authorText],
            value: valueComponents
        };
    });
    // Return the top-level DataList component
    const dataList = {
        type: "DataList",
        childrenProps
    };
    return dataList;
}
//# sourceMappingURL=540.js.map