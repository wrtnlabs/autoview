export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map workflow run conclusions/statuses to chip colors
    const mapStatusToColor = (status) => {
        const s = (status || "").toLowerCase();
        if (s === "success")
            return "success";
        if (s === "failure" || s === "error")
            return "error";
        if (s === "cancelled" || s === "skipped")
            return "warning";
        if (s === "neutral" || s === "neutral")
            return "secondary";
        return "info"; // fallback for in_progress, queued, etc.
    };
    // Transform each workflow_run into a ListItem
    const items = input.workflow_runs.map((run) => {
        var _a, _b, _c, _d, _e, _f, _g;
        // Use the actor's avatar and login for the start element
        const startAvatar = {
            type: "Avatar",
            src: (_a = run.actor) === null || _a === void 0 ? void 0 : _a.avatar_url,
            name: (_b = run.actor) === null || _b === void 0 ? void 0 : _b.login,
            variant: "primary",
            size: 32,
        };
        // Compute a human-readable title
        const title = (_d = (_c = run.name) !== null && _c !== void 0 ? _c : run.display_title) !== null && _d !== void 0 ? _d : `Run #${run.run_number}`;
        // Compute a simple description
        const branch = (_e = run.head_branch) !== null && _e !== void 0 ? _e : "unknown branch";
        const created = new Date(run.created_at).toLocaleString();
        const description = `#${run.run_number} • ${branch} • ${created}`;
        // Prepare a status chip as the end element
        const statusLabel = (_g = (_f = run.conclusion) !== null && _f !== void 0 ? _f : run.status) !== null && _g !== void 0 ? _g : "pending";
        const statusChip = {
            type: "Chip",
            label: statusLabel,
            color: mapStatusToColor(statusLabel),
            size: "small",
            variant: "outlined",
        };
        return {
            type: "ListItem",
            title,
            description,
            startElement: startAvatar,
            endElement: statusChip,
            // If the workflow run has an HTML URL, make the item clickable
            href: run.html_url,
        };
    });
    // Return a responsive list of workflow runs
    const list = {
        type: "List",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=598.js.map