export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const { assignee, organization, pending_cancellation_date, last_activity_at, last_activity_editor, created_at, plan_type, } = input;
    // Map plan types to chip colors
    const planColorMap = {
        business: "success",
        enterprise: "info",
        unknown: "gray",
    };
    // Build a list of data fields for the DataList
    const dataItems = [];
    // Plan type
    dataItems.push({
        type: "DataListItem",
        label: [
            { type: "Text", content: "Plan", variant: "subtitle2" },
        ],
        value: {
            type: "Chip",
            label: plan_type !== null && plan_type !== void 0 ? plan_type : "unknown",
            variant: "filled",
            color: planColorMap[plan_type !== null && plan_type !== void 0 ? plan_type : "unknown"],
        },
    });
    // Created at date
    dataItems.push({
        type: "DataListItem",
        label: [
            { type: "Text", content: "Created At", variant: "subtitle2" },
        ],
        value: {
            type: "Text",
            content: new Date(created_at).toLocaleDateString(),
            variant: "body2",
        },
    });
    // Last activity timestamp, if available
    if (last_activity_at) {
        dataItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Last Activity", variant: "subtitle2" },
            ],
            value: {
                type: "Text",
                content: new Date(last_activity_at).toLocaleString(),
                variant: "body2",
            },
        });
        if (last_activity_editor) {
            dataItems.push({
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Editor Used", variant: "subtitle2" },
                ],
                value: {
                    type: "Text",
                    content: last_activity_editor,
                    variant: "body2",
                },
            });
        }
    }
    // Pending cancellation date
    if (pending_cancellation_date) {
        dataItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Will Cancel On", variant: "subtitle2" },
            ],
            value: {
                type: "Text",
                content: new Date(pending_cancellation_date).toLocaleDateString(),
                variant: "body2",
                color: "#d97706", // a warning amber tone
            },
        });
    }
    // Organization, if present
    if (organization) {
        dataItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Organization", variant: "subtitle2" },
            ],
            value: {
                type: "Text",
                content: organization.login,
                variant: "body2",
            },
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Header: show user avatar, login, and name (if any)
    const header = {
        type: "CardHeader",
        title: assignee.login,
        description: (_a = assignee.name) !== null && _a !== void 0 ? _a : undefined,
        startElement: {
            type: "Avatar",
            src: assignee.avatar_url,
            name: assignee.login,
            size: 56,
            variant: "primary",
        },
    };
    // Assemble into a VerticalCard for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: [dataList] },
        ],
    };
}
//# sourceMappingURL=480.js.map