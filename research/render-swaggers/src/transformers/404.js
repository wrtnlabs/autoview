export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map the OS string to a FontAwesome icon ID.
    const osIconId = (() => {
        const os = input.os.toLowerCase();
        if (os.includes("linux"))
            return "linux";
        if (os.includes("windows"))
            return "windows";
        if (os.includes("mac") || os.includes("darwin") || os.includes("os x"))
            return "apple";
        return "desktop";
    })();
    // Map the runner status to a semantic color for a Chip.
    const statusLower = input.status.toLowerCase();
    const statusColor = statusLower === "online" || statusLower === "idle"
        ? "success"
        : statusLower === "offline"
            ? "error"
            : "primary";
    // Busy indicator mapping.
    const busyLabel = input.busy ? "Busy" : "Idle";
    const busyColor = input.busy ? "warning" : "success";
    // 1. Build the card header with name, OS icon, group id, and ephemeral/persistent chip.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Group: ${(_a = input.runner_group_id) !== null && _a !== void 0 ? _a : "N/A"}`,
        startElement: {
            type: "Icon",
            id: osIconId,
            color: "gray",
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.ephemeral ? "Ephemeral" : "Persistent",
            variant: "filled",
            color: input.ephemeral ? "info" : "secondary",
            size: "small",
        },
    };
    // 2. Build a list of key/value pairs to show the runner properties.
    const listItems = [
        // ID
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID", variant: "subtitle2" },
            value: { type: "Text", content: String(input.id), variant: "body1" },
        },
        // Status
        {
            type: "DataListItem",
            label: { type: "Text", content: "Status", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: input.status,
                color: statusColor,
                size: "small",
                variant: "filled",
            },
        },
        // Busy
        {
            type: "DataListItem",
            label: { type: "Text", content: "Busy", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: busyLabel,
                color: busyColor,
                size: "small",
                variant: "outlined",
            },
        },
        // OS (text fallback)
        {
            type: "DataListItem",
            label: { type: "Text", content: "OS", variant: "subtitle2" },
            value: { type: "Text", content: input.os, variant: "body1" },
        },
    ];
    // Optionally show the runner_group_id if present.
    if (input.runner_group_id !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Group ID", variant: "subtitle2" },
            value: { type: "Text", content: String(input.runner_group_id), variant: "body1" },
        });
    }
    // 3. Wrap the list in a DataList inside CardContent.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // 4. If there are labels, render them as a ChipGroup in the CardFooter.
    let footer;
    if ((_b = input.labels) === null || _b === void 0 ? void 0 : _b.length) {
        const chips = input.labels.map((lbl) => ({
            type: "Chip",
            label: lbl.name,
            variant: "outlined",
            size: "small",
            color: lbl.type === "read-only" ? "gray" : "primary",
        }));
        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        };
    }
    // 5. Assemble the VerticalCard with header, content, and optional footer.
    const cardChildren = footer ? [header, content, footer] : [header, content];
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=404.js.map