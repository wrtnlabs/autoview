export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no activity, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No activities to display.",
        };
    }
    // Map each activity_type to a FontAwesome icon id and a color
    const iconMap = {
        push: { id: "arrow-up", color: "blue" },
        force_push: { id: "bolt", color: "orange" },
        branch_deletion: { id: "trash", color: "red" },
        branch_creation: { id: "code-branch", color: "green" },
        pr_merge: { id: "git-merge", color: "teal" },
        merge_queue_merge: { id: "tasks", color: "violet" },
    };
    // Transform each activity into a ListItem
    const listItems = input.map((act) => {
        var _a, _b, _c;
        const actor = act.actor;
        const login = (_a = actor === null || actor === void 0 ? void 0 : actor.login) !== null && _a !== void 0 ? _a : "Unknown";
        const avatarUrl = (_b = actor === null || actor === void 0 ? void 0 : actor.avatar_url) !== null && _b !== void 0 ? _b : "";
        // Format timestamp for display; fallback to raw string if parsing fails
        let timeLabel = act.timestamp;
        try {
            timeLabel = new Date(act.timestamp).toLocaleString();
        }
        catch ( /* keep raw */_d) { /* keep raw */ }
        const iconInfo = (_c = iconMap[act.activity_type]) !== null && _c !== void 0 ? _c : {
            id: "question",
            color: "gray",
        };
        return {
            type: "ListItem",
            title: login,
            description: `${act.activity_type.replace(/_/g, " ")} at ${timeLabel}`,
            startElement: {
                type: "Avatar",
                src: avatarUrl,
                name: login,
            },
            endElement: {
                type: "Icon",
                id: iconInfo.id,
                color: iconInfo.color,
                size: 24,
            },
        };
    });
    // Return a responsive list of activities
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=620.js.map