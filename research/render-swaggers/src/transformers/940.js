export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Map the codespace state to a visual color for the Chip component.
    const mapStateToColor = (state) => {
        switch (state) {
            case "Available": return "green";
            case "Provisioning": return "cyan";
            case "Queued": return "yellow";
            case "Created": return "blue";
            case "Awaiting": return "orange";
            case "Unavailable": return "error";
            case "Deleted": return "darkGray";
            case "Failed": return "error";
            case "Shutdown": return "gray";
            case "ShuttingDown": return "orange";
            case "Starting": return "blue";
            case "Exporting":
            case "Updating":
            case "Rebuilding": return "secondary";
            default: return "gray";
        }
    };
    // Safely format an ISO date-time string into the user's locale.
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a list of key/value pairs for the codespace metadata.
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "State" },
            value: {
                type: "Chip",
                label: input.state,
                variant: "filled",
                color: mapStateToColor(input.state),
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Machine" },
            value: {
                type: "Chip",
                label: (_b = (_a = input.machine) === null || _a === void 0 ? void 0 : _a.display_name) !== null && _b !== void 0 ? _b : "N/A",
                variant: "outlined",
                color: input.machine ? "teal" : "gray",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Owner" },
            value: {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 32,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: {
                type: "Button",
                label: "Open Repo",
                variant: "text",
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 16,
                },
                href: input.repository.html_url,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
            },
        },
    ];
    // Compose a VerticalCard that contains:
    // 1) A header with the codespace name, environment, location, and owner avatar.
    // 2) A content section with a DataList of metadata items.
    // 3) A footer with action buttons to open the codespace or repository.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_c = input.display_name) !== null && _c !== void 0 ? _c : input.name,
                description: `Env ID: ${(_d = input.environment_id) !== null && _d !== void 0 ? _d : "N/A"} | Location: ${input.location}`,
                startElement: {
                    type: "Avatar",
                    src: input.owner.avatar_url,
                    name: input.owner.login,
                    size: 40,
                },
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                ],
            },
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "Open Codespace",
                        variant: "contained",
                        color: "primary",
                        startElement: {
                            type: "Icon",
                            id: "external-link-alt",
                            size: 16,
                        },
                        href: input.web_url,
                    },
                    {
                        type: "Button",
                        label: "Open Repository",
                        variant: "outlined",
                        color: "secondary",
                        startElement: {
                            type: "Icon",
                            id: "github",
                            size: 16,
                        },
                        href: input.repository.html_url,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=940.js.map