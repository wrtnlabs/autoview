export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map runner status to icon names and colors
    const statusIconMap = {
        Ready: "check-circle",
        Provisioning: "spinner",
        Shutdown: "power-off",
        Deleting: "trash-alt",
        Stuck: "exclamation-triangle",
    };
    const statusColorMap = {
        Ready: "green",
        Provisioning: "blue",
        Shutdown: "orange",
        Deleting: "red",
        Stuck: "red",
    };
    // Fallbacks for optional fields
    const maxRunners = (_a = input.maximum_runners) !== null && _a !== void 0 ? _a : 10;
    const lastActive = input.last_active_on
        ? new Date(input.last_active_on).toLocaleString()
        : "Never";
    // Build list items for runner details
    const listItems = [];
    // Runner group ID if present
    if (input.runner_group_id != null) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Group ID"] },
            value: { type: "Text", content: [input.runner_group_id.toString()] },
        });
    }
    // Platform
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Platform"] },
        value: { type: "Text", content: [input.platform] },
    });
    // Maximum runners
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Max Runners"] },
        value: { type: "Text", content: [maxRunners.toString()] },
    });
    // Last active time
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Last Active"] },
        value: { type: "Text", content: [lastActive] },
    });
    // Image details if available
    if (input.image_details) {
        const img = input.image_details;
        // Show image display name and size
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Image"] },
            value: {
                type: "Markdown",
                content: `**${img.display_name}**  \nSize: ${img.size_gb} GB  \nSource: ${img.source}`,
            },
        });
    }
    else {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Image"] },
            value: { type: "Text", content: ["N/A"] },
        });
    }
    // Machine spec summary as markdown
    const spec = input.machine_size_details;
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Machine Specs"] },
        value: {
            type: "Markdown",
            content: `- CPU cores: ${spec.cpu_cores}  \n` +
                `- Memory: ${spec.memory_gb} GB  \n` +
                `- Storage: ${spec.storage_gb} GB`,
        },
    });
    // Public IPs: show chip group if enabled
    if (input.public_ip_enabled) {
        if (input.public_ips && input.public_ips.length > 0) {
            const ipChips = input.public_ips.map((ip, idx) => {
                var _a;
                const label = ip.prefix && ip.length != null
                    ? `${ip.prefix}/${ip.length}`
                    : (_a = ip.prefix) !== null && _a !== void 0 ? _a : "Unknown";
                return {
                    type: "Chip",
                    label,
                    variant: "filled",
                    size: "small",
                };
            });
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: ["Public IPs"] },
                value: {
                    type: "ChipGroup",
                    childrenProps: ipChips,
                },
            });
        }
        else {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: ["Public IPs"] },
                value: { type: "Text", content: ["Enabled (no ranges)"] },
            });
        }
    }
    else {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Public IPs"] },
            value: { type: "Text", content: ["Disabled"] },
        });
    }
    // Header: show name, status icon, and runner ID
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.status,
        startElement: {
            type: "Icon",
            id: statusIconMap[input.status],
            color: statusColorMap[input.status],
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: `ID: ${input.id}`,
            variant: "outlined",
            size: "small",
        },
    };
    // Content: a DataList of all items
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: listItems,
            },
        ],
    };
    // Assemble a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=378.js.map