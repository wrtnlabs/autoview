export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Destructure seat breakdown, with safe defaults
    const breakdown = input.seat_breakdown;
    const { total = 0, added_this_cycle = 0, pending_cancellation = 0, pending_invitation = 0, active_this_cycle = 0, inactive_this_cycle = 0, } = breakdown;
    // Helper to map policy values to chip colors
    const statusColor = {
        enabled: "success",
        disabled: "error",
        unconfigured: "warning",
        allow: "success",
        block: "error",
        assign_all: "primary",
        assign_selected: "secondary",
        business: "primary",
        enterprise: "indigo",
    };
    // Build an array of policy chips
    const policyChips = [];
    // Code suggestion policy
    policyChips.push({
        type: "Chip",
        label: `Public Code Suggestions: ${input.public_code_suggestions}`,
        color: (_a = statusColor[input.public_code_suggestions]) !== null && _a !== void 0 ? _a : "warning",
        size: "small",
        variant: "outlined",
    });
    // IDE Chat policy
    {
        const val = (_b = input.ide_chat) !== null && _b !== void 0 ? _b : "unconfigured";
        policyChips.push({
            type: "Chip",
            label: `IDE Chat: ${val}`,
            color: (_c = statusColor[val]) !== null && _c !== void 0 ? _c : "warning",
            size: "small",
            variant: "outlined",
        });
    }
    // Platform Chat policy
    {
        const val = (_d = input.platform_chat) !== null && _d !== void 0 ? _d : "unconfigured";
        policyChips.push({
            type: "Chip",
            label: `Platform Chat: ${val}`,
            color: (_e = statusColor[val]) !== null && _e !== void 0 ? _e : "warning",
            size: "small",
            variant: "outlined",
        });
    }
    // CLI policy
    {
        const val = (_f = input.cli) !== null && _f !== void 0 ? _f : "unconfigured";
        policyChips.push({
            type: "Chip",
            label: `CLI: ${val}`,
            color: (_g = statusColor[val]) !== null && _g !== void 0 ? _g : "warning",
            size: "small",
            variant: "outlined",
        });
    }
    // Seat management setting
    {
        const val = input.seat_management_setting;
        policyChips.push({
            type: "Chip",
            label: `Seat Management: ${val}`,
            color: (_h = statusColor[val]) !== null && _h !== void 0 ? _h : "secondary",
            size: "small",
            variant: "outlined",
        });
    }
    // Plan type (optional)
    if (input.plan_type) {
        policyChips.push({
            type: "Chip",
            label: `Plan: ${input.plan_type}`,
            color: (_j = statusColor[input.plan_type]) !== null && _j !== void 0 ? _j : "gray",
            size: "small",
            variant: "outlined",
        });
    }
    // Compose a DataList of seat breakdown metrics
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Total Seats" }],
                value: { type: "Text", content: `${total}` },
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Added This Cycle" }],
                value: { type: "Text", content: `${added_this_cycle}` },
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Pending Cancellation" }],
                value: { type: "Text", content: `${pending_cancellation}` },
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Pending Invitations" }],
                value: { type: "Text", content: `${pending_invitation}` },
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Active This Cycle" }],
                value: { type: "Text", content: `${active_this_cycle}` },
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Inactive This Cycle" }],
                value: { type: "Text", content: `${inactive_this_cycle}` },
            },
        ],
    };
    // Assemble the final card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with icon, title, and plan description
                type: "CardHeader",
                title: "Copilot Organization Details",
                description: input.plan_type ? `Plan Type: ${input.plan_type}` : undefined,
                startElement: {
                    type: "Icon",
                    id: "building", // FontAwesome building icon
                    color: "blue",
                    size: 28,
                },
            },
            {
                // Content section with breakdown and policy chips
                type: "CardContent",
                childrenProps: [
                    dataList,
                    { type: "Divider", orientation: "horizontal" },
                    {
                        type: "ChipGroup",
                        childrenProps: policyChips,
                    },
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=438.js.map