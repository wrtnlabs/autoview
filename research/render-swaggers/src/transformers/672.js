export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map each status to a FontAwesome icon identifier
    const statusIconMap = {
        success: "check",
        error: "times-circle",
        pending: "hourglass-half",
        outdated: "clock",
    };
    // Map each status to a Chip color variant (supported by IAutoViewChipProps.color)
    const chipVariantMap = {
        success: "success",
        error: "error",
        pending: "warning",
        outdated: "gray",
    };
    // Map each status to a base color for the icon (supported by IAutoViewIconProps.color)
    const iconColorMap = {
        success: "green",
        error: "red",
        pending: "yellow",
        outdated: "gray",
    };
    const iconId = (_a = statusIconMap[input.status]) !== null && _a !== void 0 ? _a : "question-circle";
    const chipColor = (_b = chipVariantMap[input.status]) !== null && _b !== void 0 ? _b : "gray";
    const iconColor = (_c = iconColorMap[input.status]) !== null && _c !== void 0 ? _c : "gray";
    // Compose a Chip showing the status with an icon
    const statusChip = {
        type: "Chip",
        label: input.status.charAt(0).toUpperCase() + input.status.slice(1),
        startElement: {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 16,
        },
        color: chipColor,
        size: "small",
        variant: "filled",
    };
    // Use Markdown to render potentially multi-line or null description
    const descriptionMarkdown = {
        type: "Markdown",
        content: input.description !== null && input.description !== undefined
            ? input.description
            : "_No description provided._",
    };
    // Safely format the ISO timestamp into a human-readable string
    const formattedDate = (() => {
        try {
            const d = new Date(input.started_at);
            return isNaN(d.getTime()) ? input.started_at : d.toLocaleString();
        }
        catch (_a) {
            return input.started_at;
        }
    })();
    const dateText = {
        type: "Text",
        content: formattedDate,
        variant: "caption",
    };
    // Build a DataList with three items: Status, Description, Started At
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "Status" },
                value: statusChip,
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Description" },
                value: descriptionMarkdown,
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Started At" },
                value: dateText,
            },
        ],
    };
    return dataList;
}
//# sourceMappingURL=672.js.map