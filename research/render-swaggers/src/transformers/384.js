export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map runner status to chip color
    const statusColorMap = {
        Ready: "success",
        Provisioning: "info",
        Shutdown: "gray",
        Deleting: "error",
        Stuck: "warning",
    };
    // Helper to create a Text component
    const makeText = (text) => ({
        type: "Text",
        content: text,
    });
    // Helper to create a Chip component
    const makeChip = (label, color) => (Object.assign({ type: "Chip", label }, (color ? { color } : {})));
    // Build the list of data list items
    const items = [];
    // Status
    items.push({
        type: "DataListItem",
        label: [makeText("Status")],
        value: [
            makeChip(input.status, statusColorMap[input.status] || "primary"),
        ],
    });
    // Platform
    items.push({
        type: "DataListItem",
        label: [makeText("Platform")],
        value: [makeText(input.platform)],
    });
    // Runner Group ID (optional)
    if (input.runner_group_id !== undefined) {
        items.push({
            type: "DataListItem",
            label: [makeText("Runner Group")],
            value: [makeText(input.runner_group_id.toString())],
        });
    }
    // Maximum Runners
    if (input.maximum_runners !== undefined) {
        items.push({
            type: "DataListItem",
            label: [makeText("Max Runners")],
            value: [makeText(input.maximum_runners.toString())],
        });
    }
    // Image details (nullable)
    if (input.image_details) {
        const img = input.image_details;
        const chips = [];
        chips.push(makeChip(img.display_name));
        chips.push(makeChip(`${img.size_gb} GB`));
        chips.push(makeChip(img.source));
        items.push({
            type: "DataListItem",
            label: [makeText("Image")],
            value: [{
                    type: "ChipGroup",
                    childrenProps: chips,
                }],
        });
    }
    // Machine spec details
    {
        const spec = input.machine_size_details;
        const chips = [];
        chips.push(makeChip(`${spec.cpu_cores} cores`));
        chips.push(makeChip(`${spec.memory_gb} GB RAM`));
        chips.push(makeChip(`${spec.storage_gb} GB SSD`));
        items.push({
            type: "DataListItem",
            label: [makeText("Machine Spec")],
            value: [{
                    type: "ChipGroup",
                    childrenProps: chips,
                }],
        });
    }
    // Public IP enabled
    items.push({
        type: "DataListItem",
        label: [makeText("Public IP")],
        value: [
            makeChip(input.public_ip_enabled ? "Enabled" : "Disabled", input.public_ip_enabled ? "success" : "gray"),
        ],
    });
    // Public IP ranges (optional array)
    if (Array.isArray(input.public_ips) && input.public_ips.length > 0) {
        const ipChips = [];
        for (const ip of input.public_ips) {
            if (ip.prefix && ip.length !== undefined) {
                ipChips.push(makeChip(`${ip.prefix}/${ip.length}`));
            }
        }
        if (ipChips.length > 0) {
            items.push({
                type: "DataListItem",
                label: [makeText("IP Ranges")],
                value: [{
                        type: "ChipGroup",
                        childrenProps: ipChips,
                    }],
            });
        }
    }
    // Last active time
    const lastActive = input.last_active_on
        ? new Date(input.last_active_on).toLocaleString()
        : "Never";
    items.push({
        type: "DataListItem",
        label: [makeText("Last Active")],
        value: [makeText(lastActive)],
    });
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Build the card header with an icon and basic info
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "server", // generic server icon
            color: "blue",
            size: 32,
        },
    };
    // Wrap everything in a vertical card for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                // we can pass a single presentation component directly
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=384.js.map