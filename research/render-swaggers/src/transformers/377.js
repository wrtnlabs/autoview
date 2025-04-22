export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map runner statuses to Chip color names for visual distinction.
    const statusColorMap = {
        Ready: "green",
        Provisioning: "warning",
        Shutdown: "gray",
        Deleting: "error",
        Stuck: "error",
    };
    // Build a ListSubheader to display the total runner count.
    const listHeader = {
        type: "ListSubheader",
        // Use a Text component inside the subheader.
        childrenProps: {
            type: "Text",
            content: `Total Runners: ${input.total_count}`,
            variant: "subtitle1",
        },
    };
    // Build one ListItem per runner.
    const runnerItems = input.runners.map(runner => {
        var _a;
        // Determine chip color based on status, fallback to 'info'.
        const chipColor = (_a = statusColorMap[runner.status]) !== null && _a !== void 0 ? _a : "info";
        return {
            type: "ListItem",
            title: runner.name,
            description: runner.image_details
                ? runner.image_details.display_name
                : undefined,
            // Use a generic desktop icon for all runners (could be refined per platform).
            startElement: {
                type: "Icon",
                id: "desktop",
                size: 20,
                color: "blue",
            },
            // Display runner status as a colored chip.
            endElement: {
                type: "Chip",
                label: runner.status,
                color: chipColor,
                variant: "outlined",
                size: "small",
            },
        };
    });
    // Compose the final List component containing header + items.
    const listProps = {
        type: "List",
        childrenProps: [listHeader, ...runnerItems],
    };
    return listProps;
}
//# sourceMappingURL=377.js.map