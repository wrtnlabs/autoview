export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to format ISO timestamp or return placeholder
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Map scan status to chip color
    const statusColorMap = {
        completed: "green",
        running: "orange",
        pending: "blue",
    };
    // Flatten all scans into a unified array with a human-friendly type label
    const allScans = [];
    if (input.incremental_scans && input.incremental_scans.length > 0) {
        for (const scan of input.incremental_scans) {
            allScans.push({
                typeLabel: "Incremental Scan",
                status: scan.status,
                started_at: scan.started_at,
                completed_at: scan.completed_at,
            });
        }
    }
    if (input.pattern_update_scans && input.pattern_update_scans.length > 0) {
        for (const scan of input.pattern_update_scans) {
            allScans.push({
                typeLabel: "Pattern Update Scan",
                status: scan.status,
                started_at: scan.started_at,
                completed_at: scan.completed_at,
            });
        }
    }
    if (input.backfill_scans && input.backfill_scans.length > 0) {
        for (const scan of input.backfill_scans) {
            allScans.push({
                typeLabel: "Backfill Scan",
                status: scan.status,
                started_at: scan.started_at,
                completed_at: scan.completed_at,
            });
        }
    }
    if (input.custom_pattern_backfill_scans && input.custom_pattern_backfill_scans.length > 0) {
        for (const scan of input.custom_pattern_backfill_scans) {
            const name = (_a = scan.pattern_name) !== null && _a !== void 0 ? _a : "Custom Pattern";
            allScans.push({
                typeLabel: `Custom Pattern: ${name}`,
                status: scan.status,
                started_at: scan.started_at,
                completed_at: scan.completed_at,
            });
        }
    }
    // If there are no scans, show a friendly markdown notice
    if (allScans.length === 0) {
        return {
            type: "Markdown",
            content: "## 🔍 No secret scanning history available.",
        };
    }
    // Build a DataList of scan entries with visual chips for status and timestamps
    const dataListItems = allScans.map(scan => {
        var _a;
        // Compose chips: status + timestamps
        const chips = [];
        // Status chip with color coding
        if (scan.status) {
            chips.push({
                type: "Chip",
                label: scan.status.charAt(0).toUpperCase() + scan.status.slice(1),
                color: (_a = statusColorMap[scan.status]) !== null && _a !== void 0 ? _a : "gray",
                size: "small",
                variant: "filled",
            });
        }
        // Started timestamp chip
        chips.push({
            type: "Chip",
            label: `Started: ${formatDate(scan.started_at)}`,
            size: "small",
            variant: "outlined",
        });
        // Completed timestamp chip (only if available)
        if (scan.completed_at) {
            chips.push({
                type: "Chip",
                label: `Completed: ${formatDate(scan.completed_at)}`,
                size: "small",
                variant: "outlined",
            });
        }
        // Wrap chips in a ChipGroup for better layout
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        // Label text for the scan type
        const labelText = {
            type: "Text",
            content: scan.typeLabel,
            variant: "subtitle2",
        };
        return {
            type: "DataListItem",
            label: labelText,
            value: chipGroup,
        };
    });
    // Return the DataList component
    return {
        type: "DataList",
        childrenProps: dataListItems,
    };
}
//# sourceMappingURL=872.js.map