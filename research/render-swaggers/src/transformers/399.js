export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no runners, show a friendly markdown message
    if (input.runners.length === 0) {
        return {
            type: "Markdown",
            content: "### No self‑hosted runners found\n\nThere are currently no runners registered for this organization."
        };
    }
    // Map each runner to a DataListItem component
    const listItems = input.runners.map(runner => {
        // Avatar representing the runner by name initials, colored by busy status
        const avatar = {
            type: "Avatar",
            name: runner.name,
            variant: runner.busy ? "warning" : "success",
            size: 32
        };
        // Text component for the runner name
        const nameText = {
            type: "Text",
            content: runner.name,
            variant: "subtitle1",
            color: "primary"
        };
        // Icon representing the runner OS, wrapped in a tooltip for clarity
        const osIcon = {
            type: "Icon",
            id: runner.os.toLowerCase().replace(/\s+/g, "-"),
            color: "gray",
            size: 20
        };
        const osTooltip = {
            type: "Tooltip",
            message: `OS: ${runner.os}`,
            childrenProps: osIcon
        };
        // Chip for the runner status, colored semantically
        const statusChip = {
            type: "Chip",
            label: runner.status,
            variant: "filled",
            // Map common statuses to colors
            color: runner.status.toLowerCase() === "online"
                ? "success"
                : runner.status.toLowerCase() === "offline"
                    ? "error"
                    : "secondary",
            size: "small"
        };
        // Chip to highlight ephemeral runners
        const ephemeralChip = runner.ephemeral
            ? {
                type: "Chip",
                label: "Ephemeral",
                variant: "outlined",
                color: "warning",
                size: "small"
            }
            : undefined;
        // Transform runner labels into chips
        const labelChips = runner.labels.map(lbl => ({
            type: "Chip",
            label: lbl.name,
            variant: "outlined",
            color: lbl.type === "read-only" ? "secondary" : "primary",
            size: "small"
        }));
        const labelGroup = {
            type: "ChipGroup",
            childrenProps: labelChips,
            maxItems: 4
        };
        // Compose the label area: avatar + name
        const labelArea = [
            avatar,
            nameText
        ];
        // Compose the value area: OS tooltip, status, optional ephemeral chip, and label group
        const valueArea = [
            osTooltip,
            statusChip
        ];
        if (ephemeralChip) {
            valueArea.push(ephemeralChip);
        }
        valueArea.push(labelGroup);
        // Build the DataListItem
        const item = {
            type: "DataListItem",
            label: labelArea,
            value: valueArea
        };
        return item;
    });
    // Wrap all items in a DataList
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
//# sourceMappingURL=399.js.map