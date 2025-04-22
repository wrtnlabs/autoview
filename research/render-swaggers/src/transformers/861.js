export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there is no data, render a simple markdown message.
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No rule suite data available",
        };
    }
    // Helper to map a result string to a coloured chip
    function makeResultChip(label, filled = true) {
        // Choose a color based on the label
        const colorMap = {
            pass: "green",
            fail: "red",
            bypass: "orange",
        };
        const color = colorMap[label] || "gray";
        return {
            type: "Chip",
            label: label.toUpperCase(),
            color,
            variant: filled ? "filled" : "outlined",
            size: "small",
        };
    }
    // Build a list item for each rule suite entry
    const items = input.map((suite) => {
        // Actor display: avatar + name
        const actorName = suite.actor_name || "Unknown";
        const actorAvatar = {
            type: "Avatar",
            name: actorName,
            variant: "primary",
            size: 32,
        };
        // Repository display: icon + repo name
        const repoName = suite.repository_name || "Unknown repo";
        const repoIcon = {
            type: "Icon",
            id: "code-branch",
            color: "blue",
            size: 16,
        };
        const repoText = {
            type: "Text",
            content: repoName,
            variant: "body2",
            color: "primary",
        };
        // Main evaluation result: pass/fail/bypass
        const resultChip = makeResultChip(suite.result || "bypass", true);
        // Hypothetical evaluation result (what-if)
        const evalChip = makeResultChip(suite.evaluation_result || "bypass", false);
        // Compose the label (actor + ID + time)
        const timestamp = suite.pushed_at
            ? new Date(suite.pushed_at).toLocaleString()
            : "N/A";
        const timeText = {
            type: "Text",
            content: timestamp,
            variant: "caption",
            color: "tertiary",
        };
        // The DataListItemProps
        return {
            type: "DataListItem",
            // Label side: avatar + actor name + timestamp
            label: [
                actorAvatar,
                {
                    type: "Text",
                    content: actorName,
                    variant: "body1",
                    color: "primary",
                },
                timeText,
            ],
            // Value side: repo + result chips
            value: [
                repoIcon,
                repoText,
                resultChip,
                evalChip,
            ],
        };
    });
    // Return a DataList to render all items in a responsive list
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=861.js.map