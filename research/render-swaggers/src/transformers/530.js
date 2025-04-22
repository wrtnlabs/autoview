export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map compute_service to a relevant FontAwesome icon name
    const computeIconMap = {
        none: "ban",
        actions: "tasks",
        codespaces: "code-branch",
    };
    const serviceKey = (_a = input.compute_service) !== null && _a !== void 0 ? _a : "none";
    const iconName = computeIconMap[serviceKey] || computeIconMap.none;
    // Prepare the compute service display as an icon + text chip
    const computeServiceChip = {
        type: "Chip",
        label: (_b = input.compute_service) !== null && _b !== void 0 ? _b : "none",
        startElement: {
            type: "Icon",
            id: iconName,
            color: input.compute_service === "none" ? "gray" : "blue",
            size: 16,
        },
        variant: "filled",
        size: "small",
    };
    // Format network settings IDs into markdown list (for readability on small screens)
    const settingsIds = (_c = input.network_settings_ids) !== null && _c !== void 0 ? _c : [];
    const settingsContent = settingsIds.length > 0
        ? settingsIds.map((id) => `- \`${id}\``).join("\n")
        : "_No network settings_";
    const settingsMarkdown = {
        type: "Markdown",
        content: settingsContent,
    };
    // Format creation date into a human-readable string
    let createdOnDisplay;
    if (input.created_on) {
        const d = new Date(input.created_on);
        // e.g. "2023-08-04 14:23"
        createdOnDisplay = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }
    else {
        createdOnDisplay = "N/A";
    }
    // Build a DataList of the network configuration details
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Compute Service",
                    variant: "subtitle2",
                },
                value: computeServiceChip,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Settings IDs",
                    variant: "subtitle2",
                },
                value: settingsMarkdown,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Created On",
                    variant: "subtitle2",
                },
                value: {
                    type: "Text",
                    content: createdOnDisplay,
                },
            },
        ],
    };
    // Assemble a vertical card to display the configuration
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "network-wired",
            color: "teal",
            size: 24,
        },
    };
    const content = {
        type: "CardContent",
        childrenProps: detailsList,
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=530.js.map