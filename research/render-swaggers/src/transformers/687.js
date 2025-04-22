export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Helper to create a simple Text component
    function makeText(content, variant = "body2") {
        return {
            type: "Text",
            content,
            variant,
        };
    }
    // Map codespace states to semantic colors for the state chip
    const stateColorMap = {
        Available: "success",
        Created: "info",
        Queued: "secondary",
        Provisioning: "info",
        Awaiting: "warning",
        Unavailable: "error",
        Deleted: "gray",
        Moved: "secondary",
        Shutdown: "error",
        Archived: "gray",
        Starting: "info",
        ShuttingDown: "warning",
        Failed: "error",
        Exporting: "info",
        Updating: "info",
        Rebuilding: "info",
        Unknown: "gray",
    };
    // Prepare chip list: state, location and machine info
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: [
            {
                type: "Chip",
                label: input.state,
                color: stateColorMap[input.state] || "gray",
                variant: "filled",
                size: "small",
            },
            {
                type: "Chip",
                label: input.location,
                variant: "outlined",
                size: "small",
            },
            {
                type: "Chip",
                label: (_b = (_a = input.machine) === null || _a === void 0 ? void 0 : _a.display_name) !== null && _b !== void 0 ? _b : "Unknown machine",
                variant: "outlined",
                size: "small",
            },
        ],
    };
    // Safely extract git status fields, defaulting to zero/false
    const git = (_c = input.git_status) !== null && _c !== void 0 ? _c : {};
    const ahead = (_d = git.ahead) !== null && _d !== void 0 ? _d : 0;
    const behind = (_e = git.behind) !== null && _e !== void 0 ? _e : 0;
    const unpushed = git.has_unpushed_changes ? "Yes" : "No";
    const uncommitted = git.has_uncommitted_changes ? "Yes" : "No";
    // Format ISO timestamps to human-readable dates
    const createdAt = new Date(input.created_at).toLocaleDateString();
    const lastUsed = new Date(input.last_used_at).toLocaleDateString();
    // Build a DataList of key status indicators
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [makeText("Ahead")],
                value: [makeText(String(ahead))],
            },
            {
                type: "DataListItem",
                label: [makeText("Behind")],
                value: [makeText(String(behind))],
            },
            {
                type: "DataListItem",
                label: [makeText("Unpushed Changes")],
                value: [makeText(unpushed)],
            },
            {
                type: "DataListItem",
                label: [makeText("Uncommitted Changes")],
                value: [makeText(uncommitted)],
            },
            {
                type: "DataListItem",
                label: [makeText("Created")],
                value: [makeText(createdAt)],
            },
            {
                type: "DataListItem",
                label: [makeText("Last Used")],
                value: [makeText(lastUsed)],
            },
        ],
    };
    // Action button to open the codespace in a browser
    const openButton = {
        type: "Button",
        label: "Open in Browser",
        href: input.web_url,
        variant: "contained",
        color: "primary",
        size: "small",
    };
    // Compose everything into a VerticalCard for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_f = input.display_name) !== null && _f !== void 0 ? _f : input.name,
                description: input.repository.full_name,
                startElement: {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                    variant: "primary",
                    size: 40,
                },
            },
            {
                type: "CardContent",
                childrenProps: [chipGroup, dataList],
            },
            {
                type: "CardFooter",
                childrenProps: openButton,
            },
        ],
    };
}
//# sourceMappingURL=687.js.map