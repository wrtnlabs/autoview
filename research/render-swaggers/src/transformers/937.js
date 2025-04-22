export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Derive machine display name or fallback
    const machineName = (_b = (_a = input.machine) === null || _a === void 0 ? void 0 : _a.display_name) !== null && _b !== void 0 ? _b : "N/A";
    // Normalize Git status values
    const ahead = (_d = (_c = input.git_status) === null || _c === void 0 ? void 0 : _c.ahead) !== null && _d !== void 0 ? _d : 0;
    const behind = (_f = (_e = input.git_status) === null || _e === void 0 ? void 0 : _e.behind) !== null && _f !== void 0 ? _f : 0;
    // Compose a human-friendly Git status label
    const gitStatusLabel = ahead > 0 || behind > 0
        ? `${ahead > 0 ? `${ahead}↑ ` : ""}${behind > 0 ? `${behind}↓` : ""}`.trim()
        : "Up to date";
    // Choose a chip color: warning if there are pending commits, success otherwise
    const gitChipColor = ahead > 0 || behind > 0 ? "warning" : "success";
    // Build the list of key/value pairs for the DataList
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Repository:",
                    variant: "body2",
                },
            ],
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                // Show repo full name as button label and link to HTML URL
                label: input.repository.full_name,
                href: input.repository.html_url,
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "gray",
                    size: 16,
                },
            },
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Machine:",
                    variant: "body2",
                },
            ],
            value: {
                type: "Text",
                content: machineName,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Last Used:",
                    variant: "body2",
                },
            ],
            value: {
                type: "Text",
                // Format timestamp into local string for readability
                content: new Date(input.last_used_at).toLocaleString(),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Git Status:",
                    variant: "body2",
                },
            ],
            value: {
                type: "Chip",
                label: gitStatusLabel,
                color: gitChipColor,
                size: "small",
                variant: "filled",
            },
        },
    ];
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with avatar, display name, and state badge
            {
                type: "CardHeader",
                title: (_g = input.display_name) !== null && _g !== void 0 ? _g : input.name,
                description: input.state,
                startElement: {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                    size: 40,
                    variant: "secondary",
                },
            },
            // Main content: key/value DataList
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                ],
            },
            // Footer with action buttons
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        variant: "contained",
                        color: "success",
                        size: "small",
                        label: "Start",
                        href: input.start_url,
                    },
                    {
                        type: "Button",
                        variant: "outlined",
                        color: "error",
                        size: "small",
                        label: "Stop",
                        href: input.stop_url,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=937.js.map