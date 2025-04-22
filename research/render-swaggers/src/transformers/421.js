export function transform($input) {
    return visualizeData($input);
}
// Transforms Schema.campaign_summary into a rich AutoView component tree.
function visualizeData(input) {
    var _a, _b, _c;
    // Prepare a list of AvatarProps for each manager.
    const managerAvatars = input.managers.map(user => ({
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 32,
    }));
    // Prepare a Chip for each team manager (if any).
    const teamChips = (_b = (_a = input.team_managers) === null || _a === void 0 ? void 0 : _a.filter((t) => t !== null).map(team => ({
        type: "Chip",
        label: team.name,
        variant: "filled",
        size: "small",
    }))) !== null && _b !== void 0 ? _b : [];
    // Prepare chips summarizing alert statistics.
    const alertChips = input.alert_stats
        ? [
            {
                type: "Chip",
                label: `Open: ${input.alert_stats.open_count}`,
                color: "warning",
                size: "small",
            },
            {
                type: "Chip",
                label: `In Progress: ${input.alert_stats.in_progress_count}`,
                color: "info",
                size: "small",
            },
            {
                type: "Chip",
                label: `Closed: ${input.alert_stats.closed_count}`,
                color: "success",
                size: "small",
            },
        ]
        : [];
    // Build a DataList of campaign details.
    const dataListItems = [];
    // 1) Campaign number
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Campaign #", variant: "subtitle2" }],
        value: [{ type: "Text", content: input.number.toString(), variant: "body1" }],
    });
    // 2) Date fields (conditionally include published_at / closed_at)
    const dateFields = [
        { label: "Created At", value: input.created_at },
        { label: "Updated At", value: input.updated_at },
        { label: "Ends At", value: input.ends_at },
    ];
    if (input.published_at)
        dateFields.push({ label: "Published At", value: input.published_at });
    if (input.closed_at)
        dateFields.push({ label: "Closed At", value: input.closed_at });
    dateFields.forEach(({ label, value }) => {
        // Format date string for readability
        const formatted = new Date(value).toLocaleString();
        dataListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: label, variant: "subtitle2" }],
            value: [{ type: "Text", content: formatted, variant: "body2" }],
        });
    });
    // 3) State (open/closed) visualized as a colored chip
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "State", variant: "subtitle2" }],
        value: [
            {
                type: "Chip",
                label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
                color: input.state === "open" ? "success" : "error",
                size: "small",
                variant: "filled",
            },
        ],
    });
    // 4) Contact link rendered as an inline button
    if (input.contact_link) {
        dataListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Contact", variant: "subtitle2" }],
            value: [
                {
                    type: "Button",
                    label: "Open Link",
                    href: input.contact_link,
                    startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" },
                },
            ],
        });
    }
    // 5) Managers shown as an AvatarGroup
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Managers", variant: "subtitle2" }],
        value: managerAvatars.length
            ? {
                type: "AvatarGroup",
                childrenProps: managerAvatars,
                maxItems: 5,
            }
            : [{ type: "Text", content: "None", variant: "body2" }],
    });
    // 6) Team managers (if any) in a ChipGroup
    if (teamChips.length) {
        dataListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Team Managers", variant: "subtitle2" }],
            value: {
                type: "ChipGroup",
                childrenProps: teamChips,
                maxItems: 3,
            },
        });
    }
    // 7) Alert statistics chips
    if (alertChips.length) {
        dataListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Alerts", variant: "subtitle2" }],
            value: {
                type: "ChipGroup",
                childrenProps: alertChips,
            },
        });
    }
    // Compose the full VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon, title, and description
            {
                type: "CardHeader",
                startElement: { type: "Icon", id: "bullhorn", size: 24, color: "blue" },
                title: (_c = input.name) !== null && _c !== void 0 ? _c : `Campaign #${input.number}`,
                description: input.description,
            },
            // Main content: the DataList of details
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                ],
            },
            // Footer with a single Contact button (if link present)
            {
                type: "CardFooter",
                childrenProps: input.contact_link
                    ? [
                        {
                            type: "Button",
                            label: "Contact",
                            href: input.contact_link,
                            startElement: { type: "Icon", id: "envelope", size: 16, color: "blue" },
                        },
                    ]
                    : [],
            },
        ],
    };
}
//# sourceMappingURL=421.js.map