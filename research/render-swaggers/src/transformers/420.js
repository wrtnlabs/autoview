export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each campaign summary into a DataListItem with rich visual elements
    const items = input.map((campaign) => {
        var _a, _b;
        // 1. Prepare manager avatars for the AvatarGroup
        const managerAvatars = campaign.managers.map((mgr) => ({
            type: "Avatar",
            src: mgr.avatar_url,
            name: mgr.login,
            size: 24,
            variant: "primary",
        }));
        // 2. Safely extract alert stats or default to zeros
        const stats = (_a = campaign.alert_stats) !== null && _a !== void 0 ? _a : {
            open_count: 0,
            in_progress_count: 0,
            closed_count: 0,
        };
        // 3. Build a ChipGroup to display open/in-progress/closed counts
        const statsChips = [
            {
                type: "Chip",
                label: `Open: ${stats.open_count}`,
                color: "info",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `In Progress: ${stats.in_progress_count}`,
                color: "warning",
                size: "small",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `Closed: ${stats.closed_count}`,
                color: "success",
                size: "small",
                variant: "outlined",
            },
        ];
        // 4. Prepare the label: campaign title and manager avatars
        const labelComponents = [
            {
                type: "Text",
                content: `#${campaign.number} ${(_b = campaign.name) !== null && _b !== void 0 ? _b : "Unnamed Campaign"}`,
                variant: "h6",
                color: "primary",
            },
            {
                type: "AvatarGroup",
                // Show up to 3 avatars, rest can be seen via totalItems
                childrenProps: managerAvatars,
                maxItems: 3,
                totalItems: managerAvatars.length,
            },
        ];
        // 5. Prepare the value: description, stats, and key dates as markdown
        const valueComponents = [];
        // Description in Markdown for better readability
        if (campaign.description) {
            valueComponents.push({
                type: "Markdown",
                content: campaign.description,
            });
        }
        // Stats ChipGroup for visual alert counts
        valueComponents.push({
            type: "ChipGroup",
            childrenProps: statsChips,
            maxItems: statsChips.length,
        });
        // Show creation, end, and optional close dates
        const datesLines = [
            `- **Created:** ${campaign.created_at}`,
            `- **Ends:** ${campaign.ends_at}`,
            campaign.closed_at != null ? `- **Closed:** ${campaign.closed_at}` : null,
        ].filter((line) => Boolean(line));
        valueComponents.push({
            type: "Markdown",
            content: datesLines.join("\n"),
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=420.js.map