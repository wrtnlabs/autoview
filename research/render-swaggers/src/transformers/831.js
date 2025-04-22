export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Prepare the card header: show avatar and codespace name
    const header = {
        type: "CardHeader",
        title: (_a = input.display_name) !== null && _a !== void 0 ? _a : input.name,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 40,
            variant: "primary",
        },
    };
    // Map the codespace state to a visual chip color
    const stateColorMap = {
        Available: "success",
        Created: "info",
        Queued: "info",
        Provisioning: "info",
        Starting: "info",
        ShuttingDown: "warning",
        Shutdown: "warning",
        Failed: "error",
        Deleted: "gray",
    };
    const stateChip = {
        type: "Chip",
        label: input.state,
        color: (_b = stateColorMap[input.state]) !== null && _b !== void 0 ? _b : "primary",
        variant: "filled",
    };
    // Build a list of key/value rows to display in a DataList
    const dataListItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "ID" }],
            value: [{ type: "Text", content: input.id.toString() }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "State" }],
            value: stateChip,
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Owner" }],
            value: {
                type: "AvatarGroup",
                childrenProps: [
                    {
                        type: "Avatar",
                        src: input.owner.avatar_url,
                        name: input.owner.login,
                        size: 28,
                        variant: "secondary",
                    },
                ],
            },
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Repository" }],
            value: {
                type: "Button",
                label: input.repository.full_name,
                href: input.repository.html_url,
                variant: "text",
                color: "primary",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Machine" }],
            value: [{ type: "Text", content: (_d = (_c = input.machine) === null || _c === void 0 ? void 0 : _c.display_name) !== null && _d !== void 0 ? _d : "N/A" }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Created At" }],
            value: [
                {
                    type: "Text",
                    content: new Date(input.created_at).toLocaleString(),
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Last Used At" }],
            value: [
                {
                    type: "Text",
                    content: new Date(input.last_used_at).toLocaleString(),
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Open in Browser" }],
            value: {
                type: "Button",
                label: "Open",
                href: input.web_url,
                variant: "text",
                color: "primary",
                size: "small",
            },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Footer with primary actions
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "Open Codespace",
                href: input.web_url,
                variant: "contained",
                color: "primary",
                size: "medium",
            },
            {
                type: "Button",
                label: "View Repository",
                href: input.repository.html_url,
                variant: "outlined",
                color: "secondary",
                size: "medium",
            },
        ],
    };
    // Compose everything into a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            footer,
        ],
    };
}
//# sourceMappingURL=831.js.map