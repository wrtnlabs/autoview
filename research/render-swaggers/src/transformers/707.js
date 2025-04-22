export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Safely extract the check suites array (compiler will handle validation)
    const suites = input.check_suites || [];
    // If no suites, show friendly Markdown message
    if (suites.length === 0) {
        return {
            type: "Markdown",
            content: "### No check suites found.\nThere are currently no check suites to display.",
        };
    }
    // Map status values to chip colors
    const statusColorMap = {
        queued: "warning",
        in_progress: "info",
        waiting: "info",
        requested: "info",
        pending: "info",
        completed: "success",
        null: "gray",
    };
    // Map conclusion values to chip colors
    const conclusionColorMap = {
        success: "success",
        failure: "error",
        neutral: "gray",
        cancelled: "secondary",
        skipped: "orange",
        timed_out: "warning",
        action_required: "error",
        startup_failure: "error",
        stale: "info",
        null: "gray",
    };
    // Build a DataListItemProps for each suite
    const items = suites.map((suite) => {
        var _a, _b, _c, _d, _e;
        // Prepare the status chip
        const statusLabel = (_a = suite.status) !== null && _a !== void 0 ? _a : "unknown";
        const statusChip = {
            type: "Chip",
            label: statusLabel,
            color: (_b = statusColorMap[statusLabel]) !== null && _b !== void 0 ? _b : "gray",
            variant: "filled",
        };
        // Prepare the conclusion chip if available
        const conclusionLabel = (_c = suite.conclusion) !== null && _c !== void 0 ? _c : "none";
        const conclusionChip = {
            type: "Chip",
            label: conclusionLabel,
            color: (_d = conclusionColorMap[conclusionLabel]) !== null && _d !== void 0 ? _d : "gray",
            variant: "outlined",
        };
        // Group status and conclusion chips together
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: [statusChip, conclusionChip],
        };
        // Label for the list item: branch name and commit SHA
        const labelTexts = [
            {
                type: "Text",
                variant: "body1",
                content: [`Branch: ${(_e = suite.head_branch) !== null && _e !== void 0 ? _e : "unknown"}`],
            },
            {
                type: "Text",
                variant: "body2",
                content: [`SHA: ${suite.head_sha}`],
            },
        ];
        return {
            type: "DataListItem",
            // Display branch & SHA
            label: labelTexts,
            // Display visual chips for status and conclusion
            value: chipGroup,
        };
    });
    // Compose final DataList
    const list = {
        type: "DataList",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=707.js.map