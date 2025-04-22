export function transform($input) {
    return visualizeData($input);
}
// Helper to map codespace state to a badge/chip color
function mapStateToColor(state) {
    switch (state) {
        case "Available":
            return "success";
        case "Provisioning":
        case "Starting":
        case "Queued":
            return "info";
        case "Failed":
        case "ShuttingDown":
        case "Shutdown":
            return "error";
        case "Deleted":
        case "Unavailable":
            return "gray";
        default:
            return "primary";
    }
}
function visualizeData(input) {
    var _a, _b, _c;
    // Build a list of chips describing Git status
    const gitStatusChips = [];
    if (input.git_status) {
        const { ahead, behind, has_unpushed_changes, has_uncommitted_changes } = input.git_status;
        if (typeof ahead === "number") {
            gitStatusChips.push({
                type: "Chip",
                label: `Ahead: ${ahead}`,
                size: "small",
                variant: "outlined",
                color: "info",
            });
        }
        if (typeof behind === "number") {
            gitStatusChips.push({
                type: "Chip",
                label: `Behind: ${behind}`,
                size: "small",
                variant: "outlined",
                color: "warning",
            });
        }
        if (has_unpushed_changes) {
            gitStatusChips.push({
                type: "Chip",
                label: "Unpushed Changes",
                size: "small",
                variant: "outlined",
                color: "error",
            });
        }
        if (has_uncommitted_changes) {
            gitStatusChips.push({
                type: "Chip",
                label: "Uncommitted Changes",
                size: "small",
                variant: "outlined",
                color: "error",
            });
        }
    }
    // Compose DataList items for main properties
    const listItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Owner", variant: "subtitle2" },
            value: [
                {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                    variant: "primary",
                    size: 32,
                },
                { type: "Text", content: input.owner.login, variant: "body1" },
            ],
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository", variant: "subtitle2" },
            value: {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                href: input.repository.html_url,
                startElement: { type: "Icon", id: "github", color: "gray", size: 16 },
                label: input.repository.full_name,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Machine", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: (_b = (_a = input.machine) === null || _a === void 0 ? void 0 : _a.display_name) !== null && _b !== void 0 ? _b : "N/A",
                size: "small",
                variant: "filled",
                color: "info",
                startElement: { type: "Icon", id: "microchip", color: "cyan", size: 16 },
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: { type: "Text", content: new Date(input.created_at).toLocaleString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Last Used", variant: "subtitle2" },
            value: { type: "Text", content: new Date(input.last_used_at).toLocaleString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Web URL", variant: "subtitle2" },
            value: {
                type: "Button",
                variant: "text",
                color: "secondary",
                size: "small",
                href: input.web_url,
                label: "Open Codespace",
            },
        },
    ];
    // If git status chips exist, show them as a group
    if (gitStatusChips.length > 0) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Git Status", variant: "subtitle2" },
            value: {
                type: "ChipGroup",
                childrenProps: gitStatusChips,
            },
        });
    }
    // Decide action button based on current state
    const isRunning = input.state === "Available";
    const actionButton = {
        type: "Button",
        variant: isRunning ? "contained" : "contained",
        color: isRunning ? "error" : "primary",
        size: "medium",
        href: isRunning ? input.stop_url : input.start_url,
        label: isRunning ? "Stop Codespace" : "Start Codespace",
    };
    // Build the composite card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_c = input.display_name) !== null && _c !== void 0 ? _c : input.name,
                description: `ID: ${input.id}`,
                startElement: {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                    size: 40,
                },
                endElement: {
                    type: "Chip",
                    label: input.state,
                    color: mapStateToColor(input.state),
                    size: "small",
                    variant: "filled",
                },
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
            {
                type: "CardFooter",
                childrenProps: actionButton,
            },
        ],
    };
}
//# sourceMappingURL=930.js.map