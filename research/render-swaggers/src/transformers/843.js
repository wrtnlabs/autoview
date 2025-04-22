export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely format a Date string into a human-readable form
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Map each review comment into a DataListItemProps
    const items = input.map((comment) => {
        var _a, _b, _c;
        // Safely extract user info; fall back to anonymous if missing
        const login = (_b = (_a = comment.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Anonymous";
        const avatarSrc = (_c = comment.user) === null || _c === void 0 ? void 0 : _c.avatar_url;
        // Avatar component for the comment author
        const avatar = {
            type: "Avatar",
            src: avatarSrc,
            name: login,
            size: 32,
            variant: "primary",
        };
        // Username text
        const userText = {
            type: "Text",
            content: login,
            variant: "subtitle1",
        };
        // Compose markdown body:
        // 1. The comment text
        // 2. A horizontal rule
        // 3. Reactions summary (if any)
        // 4. Timestamp (italicized)
        const parts = [];
        // Raw comment body as markdown
        parts.push(comment.body);
        // Separator
        parts.push("\n\n---\n\n");
        // Reactions summary
        if (comment.reactions) {
            const r = comment.reactions;
            parts.push("**Reactions:** " +
                [
                    r["+1"] ? `👍 ${r["+1"]}` : null,
                    r["-1"] ? `👎 ${r["-1"]}` : null,
                    r.laugh ? `😄 ${r.laugh}` : null,
                    r.confused ? `😕 ${r.confused}` : null,
                    r.heart ? `❤️ ${r.heart}` : null,
                    r.hooray ? `🎉 ${r.hooray}` : null,
                    r.eyes ? `👀 ${r.eyes}` : null,
                    r.rocket ? `🚀 ${r.rocket}` : null,
                ]
                    .filter((s) => s)
                    .join("  "));
        }
        else {
            parts.push("_No reactions yet_");
        }
        // Timestamp
        parts.push(`\n\n*Commented at ${formatDate(comment.created_at)}*`);
        const markdown = {
            type: "Markdown",
            content: parts.join(""),
        };
        // Assemble the DataListItemProps
        return {
            type: "DataListItem",
            // Label shows avatar + username
            label: [avatar, userText],
            // Value renders the comment with markdown formatting
            value: markdown,
        };
    });
    // Return a DataList component containing all comments
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=843.js.map