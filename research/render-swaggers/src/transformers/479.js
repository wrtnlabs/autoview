export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility: map codespace state to a color for visual emphasis
    const mapStateToColor = (state) => {
        var _a;
        const mapping = {
            Available: "success",
            Provisioning: "info",
            Starting: "info",
            Created: "info",
            Queued: "info",
            Shutdown: "warning",
            ShuttingDown: "warning",
            Unavailable: "error",
            Deleted: "error",
            Failed: "error",
            Archived: "gray",
            Unknown: "gray",
        };
        return (_a = mapping[state]) !== null && _a !== void 0 ? _a : "gray";
    };
    // Utility: human‐readable formatting for ISO date‐time strings
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Compose the card header: avatar of owner + codespace name/repository
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.repository.full_name,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            variant: "primary",
            size: 40,
        },
    };
    // Build data list items for key properties
    const items = [];
    // State as a colored chip
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["State"],
                variant: "subtitle1",
                color: "tertiary",
            },
        ],
        value: {
            type: "Chip",
            label: input.state,
            color: mapStateToColor(input.state),
            variant: "filled",
        },
    });
    // Last used timestamp
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Last Used"],
                variant: "subtitle1",
                color: "tertiary",
            },
        ],
        value: {
            type: "Text",
            content: formatDate(input.last_used_at),
            variant: "body2",
        },
    });
    // Idle timeout
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Idle Timeout (min)"],
                variant: "subtitle1",
                color: "tertiary",
            },
        ],
        value: {
            type: "Chip",
            label: input.idle_timeout_minutes !== null
                ? input.idle_timeout_minutes.toString()
                : "∞",
            color: "secondary",
            variant: "outlined",
            size: "small",
        },
    });
    // Location
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Location"],
                variant: "subtitle1",
                color: "tertiary",
            },
        ],
        value: {
            type: "Text",
            content: input.location,
            variant: "body2",
        },
    });
    // Prebuild indicator
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: ["Prebuild"],
                variant: "subtitle1",
                color: "tertiary",
            },
        ],
        value: {
            type: "Chip",
            label: input.prebuild ? "Yes" : "No",
            color: input.prebuild ? "success" : "gray",
            size: "small",
            variant: "outlined",
        },
    });
    // Pending operation flag
    if (input.pending_operation !== undefined) {
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: ["Pending Operation"],
                    variant: "subtitle1",
                    color: "tertiary",
                },
            ],
            value: {
                type: "Chip",
                label: input.pending_operation ? "Pending" : "None",
                color: input.pending_operation ? "warning" : "success",
                size: "small",
                variant: "filled",
            },
        });
    }
    // Git status: ahead/behind/uncommitted changes
    const git = input.git_status;
    if (git) {
        const gitDetails = [];
        if (typeof git.ahead === "number") {
            gitDetails.push({
                type: "Chip",
                label: `↑${git.ahead}`,
                color: git.ahead > 0 ? "warning" : "gray",
                size: "small",
            });
        }
        if (typeof git.behind === "number") {
            gitDetails.push({
                type: "Chip",
                label: `↓${git.behind}`,
                color: git.behind > 0 ? "warning" : "gray",
                size: "small",
            });
        }
        if (git.has_unpushed_changes) {
            gitDetails.push({
                type: "Icon",
                id: "upload",
                color: "orange",
                size: 16,
            });
        }
        if (git.has_uncommitted_changes) {
            gitDetails.push({
                type: "Icon",
                id: "edit",
                color: "orange",
                size: 16,
            });
        }
        if (gitDetails.length) {
            items.push({
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: ["Git Status"],
                        variant: "subtitle1",
                        color: "tertiary",
                    },
                ],
                value: gitDetails,
            });
        }
    }
    // Wrap items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card content section
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Compose the final vertical card for display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=479.js.map