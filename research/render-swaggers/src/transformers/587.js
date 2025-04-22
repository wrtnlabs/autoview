export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no runners, display a friendly markdown message
    if (!input.runners || input.runners.length === 0) {
        return {
            type: "Markdown",
            content: "## No self-hosted runners available\nThere are currently no self-hosted GitHub Actions runners to display.",
        };
    }
    // Map runner status to a colored chip color
    const statusColor = (status) => {
        switch (status.toLowerCase()) {
            case "online":
                return "success";
            case "offline":
                return "error";
            default:
                return "info";
        }
    };
    // Map operating system name to an icon identifier
    const osIconId = (os) => {
        const lower = os.toLowerCase();
        if (lower.includes("windows"))
            return "windows";
        if (lower.includes("linux"))
            return "linux";
        if (lower.includes("mac"))
            return "apple";
        return "desktop";
    };
    // Build a DataListItem for each runner
    const dataListItems = input.runners.map((runner) => {
        // Text component for the runner's name
        const nameText = {
            type: "Text",
            content: runner.name,
            variant: "body1",
        };
        // OS Chip with an icon
        const osChip = {
            type: "Chip",
            label: runner.os,
            startElement: {
                type: "Icon",
                id: osIconId(runner.os),
                color: "gray",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "gray",
        };
        // Status chip indicating online/offline/etc.
        const statusChip = {
            type: "Chip",
            label: runner.status,
            color: statusColor(runner.status),
            size: "small",
            variant: "filled",
        };
        // Optional busy indicator chip
        const busyChip = runner.busy
            ? {
                type: "Chip",
                label: "Busy",
                color: "warning",
                size: "small",
                variant: "filled",
                startElement: {
                    type: "Icon",
                    id: "spinner",
                    color: "yellow",
                    size: 12,
                },
            }
            : null;
        // Chips for each runner label
        const labelChips = (runner.labels || []).map((lbl) => ({
            type: "Chip",
            label: lbl.name,
            color: lbl.type === "custom" ? "info" : "gray",
            size: "small",
            variant: "outlined",
        }));
        // Group status and busy chips together
        const statusGroup = {
            type: "ChipGroup",
            childrenProps: busyChip ? [statusChip, busyChip] : [statusChip],
        };
        // Group the runner's labels
        const labelsGroup = {
            type: "ChipGroup",
            childrenProps: labelChips,
        };
        return {
            type: "DataListItem",
            // Show name and OS in the label area
            label: [nameText, osChip],
            // Show status/busy and label chips in the value area
            value: [statusGroup, labelsGroup],
        };
    });
    // The DataList component that holds all runner items
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Header for the card, including a server icon and total count
    const header = {
        type: "CardHeader",
        title: `Self-hosted Runners (${input.total_count})`,
        description: "Overview of GitHub Actions self‑hosted runners",
        startElement: {
            type: "Icon",
            id: "server",
            color: "blue",
            size: 32,
        },
    };
    // Wrap the DataList inside card content
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card composed of the header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=587.js.map