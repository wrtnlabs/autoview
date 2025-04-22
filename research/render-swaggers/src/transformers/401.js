export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const runner = input.runner;
    // Map runner.status to a color for visual emphasis
    const statusColorMap = {
        online: "success",
        offline: "error",
        idle: "warning",
    };
    const statusColor = (_a = statusColorMap[runner.status]) !== null && _a !== void 0 ? _a : "info";
    // Helper to build a small status chip
    const makeStatusChip = (label, color) => ({
        type: "Chip",
        label: label,
        color: color,
        size: "small",
        variant: "filled",
    });
    // Build a list of DataListItemProps for each field we want to show
    const items = [];
    // Runner ID
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID" },
        value: { type: "Text", content: runner.id.toString() },
    });
    // Runner group ID (optional)
    if (runner.runner_group_id !== undefined) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Group ID" },
            value: { type: "Text", content: runner.runner_group_id.toString() },
        });
    }
    // Status
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Status" },
        value: makeStatusChip(runner.status, statusColor),
    });
    // Busy flag
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Busy" },
        value: makeStatusChip(runner.busy ? "Yes" : "No", runner.busy ? "error" : "success"),
    });
    // Ephemeral flag
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Ephemeral" },
        value: makeStatusChip(runner.ephemeral ? "Yes" : "No", runner.ephemeral ? "info" : "secondary"),
    });
    // Labels array
    if (Array.isArray(runner.labels) && runner.labels.length > 0) {
        // Convert each label into a Chip
        const labelChips = runner.labels.map(lbl => ({
            type: "Chip",
            label: lbl.name,
            variant: "outlined",
            size: "small",
            color: "primary",
        }));
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Labels" },
            value: {
                type: "ChipGroup",
                childrenProps: labelChips,
            },
        });
    }
    // Put all items into a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Prepare a download button for the JIT configuration
    // We use a data URI with application/json to allow direct download in-browser
    const downloadHref = `data:application/json;base64,${input.encoded_jit_config}`;
    const downloadButton = {
        type: "Button",
        label: "Download Config",
        variant: "outlined",
        color: "primary",
        size: "small",
        href: downloadHref,
    };
    // Assemble the card header with an icon and runner name & OS
    const cardHeader = {
        type: "CardHeader",
        title: runner.name,
        description: runner.os,
        startElement: {
            type: "Icon",
            id: "server", // server icon to represent a runner
            color: "cyan",
            size: 24,
        },
    };
    // Assemble the card content holding our DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Assemble the card footer with the download button
    const cardFooter = {
        type: "CardFooter",
        childrenProps: downloadButton,
    };
    // Return a VerticalCard wrapping header, content, and footer for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=401.js.map