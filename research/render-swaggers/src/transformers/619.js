export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Defensive default: if no runs present, show a friendly markdown message
    if (!Array.isArray(input.workflow_runs) || input.workflow_runs.length === 0) {
        return {
            type: "Markdown",
            content: "### No workflow runs found.\n\nThere are currently no runs to display.",
        };
    }
    // Helper to pick a color for the conclusion/status chip
    const conclusionColor = (conclusion) => {
        switch (conclusion) {
            case "success":
                return "green";
            case "failure":
            case "cancelled":
            case "timed_out":
                return "error";
            case "neutral":
            case "skipped":
            case "stale":
                return "gray";
            case null:
            default:
                return "yellow"; // in progress or unknown
        }
    };
    // Transform each workflow_run into a DataListItem
    const items = input.workflow_runs.map((run) => {
        var _a, _b, _c, _d;
        // Determine display title or fallback
        const title = (_b = (_a = run.display_title) !== null && _a !== void 0 ? _a : run.name) !== null && _b !== void 0 ? _b : `Run #${run.run_number}`;
        // Actor avatar if available
        const avatar = run.actor
            ? {
                type: "Avatar",
                src: run.actor.avatar_url,
                name: run.actor.login,
                variant: "primary",
                size: 32,
            }
            : undefined;
        // Chip indicating conclusion (or status if conclusion is null)
        const statusLabel = ((_d = (_c = run.conclusion) !== null && _c !== void 0 ? _c : run.status) !== null && _d !== void 0 ? _d : "unknown").toUpperCase();
        const statusChip = {
            type: "Chip",
            label: statusLabel,
            variant: "filled",
            color: conclusionColor(run.conclusion),
            size: "small",
        };
        // Timestamp text
        const timeText = {
            type: "Text",
            variant: "caption",
            content: new Date(run.created_at).toLocaleString(),
        };
        // Label area: avatar + title
        const labelComponents = [];
        if (avatar)
            labelComponents.push(avatar);
        labelComponents.push({
            type: "Text",
            variant: "body1",
            content: title,
        });
        // Value area: status chip + timestamp
        const valueComponents = [
            statusChip,
            {
                type: "Text",
                variant: "caption",
                content: timeText.content,
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Compose the final DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=619.js.map