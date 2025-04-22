export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no status entries, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No statuses available\n\nThere are currently no status updates to display."
        };
    }
    // Helper to map a status.state to an icon
    const mapStateToIcon = (state) => {
        const s = state.toLowerCase();
        switch (s) {
            case "success":
                return { type: "Icon", id: "check", color: "green", size: 16 };
            case "failure":
            case "error":
                return { type: "Icon", id: "times-circle", color: "red", size: 16 };
            case "pending":
            case "in_progress":
            case "running":
                return { type: "Icon", id: "hourglass-half", color: "blue", size: 16 };
            default:
                return { type: "Icon", id: "question-circle", color: "gray", size: 16 };
        }
    };
    // Build a DataListItem for each status
    const childrenProps = input.map((status) => {
        var _a, _b, _c, _d;
        // Avatar: show the creator's avatar or initials
        const avatar = {
            type: "Avatar",
            src: (_a = status.avatar_url) !== null && _a !== void 0 ? _a : undefined,
            name: (_c = (_b = status.creator) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : undefined,
            size: 32,
            variant: "secondary"
        };
        // Icon representing the state
        const stateIcon = mapStateToIcon(status.state);
        // A short text label of the state (for accessibility/clarity)
        const stateText = {
            type: "Text",
            content: status.state,
            variant: "body2",
            color: stateIcon.color
        };
        // Compose a markdown block for description, link, and timestamps
        const createdAt = new Date(status.created_at).toLocaleString();
        const updatedAt = new Date(status.updated_at).toLocaleString();
        const description = ((_d = status.description) === null || _d === void 0 ? void 0 : _d.trim()) || "_No description provided._";
        const detailsLink = status.target_url
            ? `- [View details](${status.target_url})`
            : "";
        const markdownContent = `
**${status.context}**  
${description}

${detailsLink}

_Created:_ ${createdAt}  
_Updated:_ ${updatedAt}
`.trim();
        const detailMarkdown = {
            type: "Markdown",
            content: markdownContent
        };
        return {
            type: "DataListItem",
            // label: avatar + state icon + state text laid out horizontally
            label: [avatar, stateIcon, stateText],
            // value: markdown with rich info
            value: detailMarkdown
        };
    });
    // Return a data list with all statuses
    const list = {
        type: "DataList",
        childrenProps
    };
    return list;
}
//# sourceMappingURL=709.js.map