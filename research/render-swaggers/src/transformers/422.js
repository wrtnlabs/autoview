export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to safely format ISO datetime strings to locale format
    const formatDateTime = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Title fallback when name is missing
    const title = (_a = input.name) !== null && _a !== void 0 ? _a : `Campaign #${input.number}`;
    // Map campaign state to a chip color
    const stateColor = input.state === "open" ? "success" : "gray";
    // Build the CardHeader with title, description, and a state chip
    const header = {
        type: "CardHeader",
        title,
        description: input.description,
        endElement: {
            type: "Chip",
            label: input.state.charAt(0).toUpperCase() + input.state.slice(1),
            color: stateColor,
            variant: "outlined",
            size: "small",
        },
    };
    // Build an avatar group for campaign managers
    const managerAvatars = input.managers.map((mgr) => ({
        type: "Avatar",
        src: mgr.avatar_url,
        name: mgr.login,
        size: 24,
        variant: "primary",
    }));
    const managersGroup = {
        type: "AvatarGroup",
        childrenProps: managerAvatars,
        maxItems: 4,
        totalItems: input.managers.length,
    };
    // Create DataListItems for key campaign metadata
    const listItems = [];
    // Created At
    listItems.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "calendar", size: 16, color: "gray" },
            { type: "Text", content: ["Created"], variant: "body2" }
        ],
        value: { type: "Text", content: [formatDateTime(input.created_at)], variant: "body2" }
    });
    // Updated At
    listItems.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "sync-alt", size: 16, color: "gray" },
            { type: "Text", content: ["Updated"], variant: "body2" }
        ],
        value: { type: "Text", content: [formatDateTime(input.updated_at)], variant: "body2" }
    });
    // Published At (if available)
    if (input.published_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "upload", size: 16, color: "gray" },
                { type: "Text", content: ["Published"], variant: "body2" }
            ],
            value: { type: "Text", content: [formatDateTime(input.published_at)], variant: "body2" }
        });
    }
    // Ends At
    listItems.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "hourglass-end", size: 16, color: "gray" },
            { type: "Text", content: ["Ends"], variant: "body2" }
        ],
        value: { type: "Text", content: [formatDateTime(input.ends_at)], variant: "body2" }
    });
    // Closed At (if campaign is closed)
    if (input.closed_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "times-circle", size: 16, color: "gray" },
                { type: "Text", content: ["Closed"], variant: "body2" }
            ],
            value: { type: "Text", content: [formatDateTime(input.closed_at)], variant: "body2" }
        });
    }
    // Contact Link (if provided)
    if (input.contact_link) {
        listItems.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "link", size: 16, color: "gray" },
                { type: "Text", content: ["Contact"], variant: "body2" }
            ],
            value: {
                type: "Markdown",
                content: `[Open Contact](${input.contact_link})`
            }
        });
    }
    // Managers (avatar group)
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Managers"], variant: "body2" },
        value: managersGroup
    });
    // Optionally show team managers count
    if (input.team_managers && input.team_managers.length > 0) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Team Managers"], variant: "body2" },
            value: {
                type: "Text",
                content: [`${input.team_managers.length} teams`],
                variant: "body2"
            }
        });
    }
    // Assemble DataList
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Assemble CardContent
    const content = {
        type: "CardContent",
        childrenProps: [dataList]
    };
    // Build footer chips for alert stats, if available
    let footer;
    if (input.alert_stats) {
        const stats = input.alert_stats;
        const chips = [
            { type: "Chip", label: `${stats.open_count} Open`, color: "error", size: "small", variant: "filled" },
            { type: "Chip", label: `${stats.in_progress_count} In-Progress`, color: "warning", size: "small", variant: "filled" },
            { type: "Chip", label: `${stats.closed_count} Closed`, color: "success", size: "small", variant: "filled" },
        ];
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 3
        };
        footer = {
            type: "CardFooter",
            childrenProps: chipGroup
        };
    }
    // Compose the vertical card and return
    const cardChildren = footer
        ? [header, content, footer]
        : [header, content];
    return {
        type: "VerticalCard",
        childrenProps: cardChildren
    };
}
//# sourceMappingURL=422.js.map