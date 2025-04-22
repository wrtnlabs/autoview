export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input with defaults for safety
    const { managers = [], onlines = [], operatorStatuses = [], } = input;
    // Build a set of online manager IDs for quick lookup
    const onlineManagerIds = new Set(onlines.map((o) => o.personId));
    // Map managerId to its latest operator status
    const statusMap = {};
    for (const status of operatorStatuses) {
        if (status.managerId) {
            // If multiple statuses exist, latest in array wins (assuming input is time-ordered)
            statusMap[status.managerId] = status;
        }
    }
    // Utility to map status type to a chip color
    function getStatusColor(type) {
        switch (type) {
            case "waiting":
                return "warning";
            case "chat":
                return "success";
            case "call":
                return "info";
            case "meet":
                return "secondary";
            default:
                return "gray";
        }
    }
    // Compose a ListItem for each manager
    const listItems = managers.map((manager) => {
        var _a, _b, _c;
        const isOnline = manager.id != null && onlineManagerIds.has(manager.id);
        const status = manager.id != null ? statusMap[manager.id] : undefined;
        // Avatar: show image if URL provided, otherwise initials
        const avatar = Object.assign({ type: "Avatar", name: manager.name, size: 40 }, (manager.avatarUrl ? { src: manager.avatarUrl } : {}));
        // Online indicator: small circle icon
        const onlineIcon = {
            type: "Icon",
            id: "circle",
            size: 8,
            color: isOnline ? "green" : "gray",
        };
        // Status chip: only if we have a status entry
        const statusChip = status
            ? {
                type: "Chip",
                label: (_a = status.operatorStatusType) !== null && _a !== void 0 ? _a : "unknown",
                size: "small",
                variant: "outlined",
                color: getStatusColor((_b = status.operatorStatusType) !== null && _b !== void 0 ? _b : ""),
            }
            : undefined;
        // Build endElement array: online icon always, status chip if present
        const endElements = statusChip ? [onlineIcon, statusChip] : onlineIcon;
        return {
            type: "ListItem",
            // Primary text
            title: manager.name,
            // Use description if manager has it, otherwise show email if available
            description: (_c = manager.description) !== null && _c !== void 0 ? _c : manager.email,
            startElement: avatar,
            endElement: endElements,
            // If manager has a profile URL or channel link, one could set href here
        };
    });
    // Return a List component wrapping all manager items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=244.js.map