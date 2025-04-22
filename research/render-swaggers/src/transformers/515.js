export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data, show a friendly message using markdown
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No rule suite data available\n\nNo rule evaluations were returned from the API."
        };
    }
    // Avatar variants pool for consistent coloring per actor
    const avatarVariants = [
        "primary", "secondary", "success", "error", "warning", "info",
        "red", "orange", "yellow", "lime", "green", "teal", "cyan",
        "blue", "indigo", "violet", "pink", "gray", "darkGray"
    ];
    // Map each rule suite entry to a ListItem component
    const listItems = input.map((entry) => {
        var _a, _b, _c, _d, _e, _f;
        // Prepare avatar for the actor
        const actorName = entry.actor_name || "Unknown";
        const actorId = (_a = entry.actor_id) !== null && _a !== void 0 ? _a : 0;
        // Choose a color variant by actor ID
        const variant = avatarVariants[actorId % avatarVariants.length];
        const avatar = {
            type: "Avatar",
            name: actorName,
            variant,
            size: 24
        };
        // Helper to map result strings to chip colors
        const resultColorMap = {
            pass: "green",
            fail: "red",
            bypass: "orange"
        };
        // Primary result chip (filled)
        const resultChip = {
            type: "Chip",
            label: (_b = entry.result) !== null && _b !== void 0 ? _b : "unknown",
            color: (_c = resultColorMap[entry.result]) !== null && _c !== void 0 ? _c : "gray",
            variant: "filled",
            size: "small"
        };
        // Evaluation-result chip (outlined)
        const evaluationChip = {
            type: "Chip",
            label: (_d = entry.evaluation_result) !== null && _d !== void 0 ? _d : "unknown",
            color: (_e = resultColorMap[entry.evaluation_result]) !== null && _e !== void 0 ? _e : "gray",
            variant: "outlined",
            size: "small"
        };
        // Format the push date for readability
        const pushedAt = entry.pushed_at
            ? new Date(entry.pushed_at).toLocaleDateString()
            : "unknown date";
        // Build the description string
        const descriptionParts = [];
        if (entry.ref)
            descriptionParts.push(`Ref: ${entry.ref}`);
        descriptionParts.push(`Pushed: ${pushedAt}`);
        const description = descriptionParts.join(" • ");
        // Compose the ListItem props
        const item = {
            type: "ListItem",
            title: (_f = entry.repository_name) !== null && _f !== void 0 ? _f : "Unknown Repository",
            description,
            startElement: avatar,
            // Show both result chips side by side
            endElement: [resultChip, evaluationChip]
        };
        return item;
    });
    // Return the full list of items
    const list = {
        type: "List",
        childrenProps: listItems
    };
    return list;
}
//# sourceMappingURL=515.js.map