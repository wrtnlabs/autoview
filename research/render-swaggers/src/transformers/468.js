export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no installations, show a simple text message.
    if (!input.installations || input.installations.length === 0) {
        return {
            type: "Text",
            content: "No installations found.",
            variant: "body1",
        };
    }
    // Transform each installation into a DataListItemProps.
    const items = input.installations.map((inst) => {
        // Extract account data safely.
        const account = inst.account || {};
        const login = typeof account.login === "string" ? account.login : "Unknown";
        const avatarUrl = typeof account.avatar_url === "string" ? account.avatar_url : undefined;
        // Build the label: avatar (if exists) and username text.
        const labelChildren = [];
        if (avatarUrl) {
            labelChildren.push({
                type: "Avatar",
                src: avatarUrl,
                name: login,
            });
        }
        labelChildren.push({
            type: "Text",
            content: login,
            variant: "body1",
        });
        // Build chips for repository selection and events.
        const chips = [];
        // Repo selection chip
        chips.push({
            type: "Chip",
            label: `Repos: ${inst.repository_selection}`,
            variant: "outlined",
            color: inst.repository_selection === "all" ? "green" : "warning",
            size: "small",
        });
        // Event chips
        if (Array.isArray(inst.events) && inst.events.length > 0) {
            inst.events.forEach((evt) => {
                chips.push({
                    type: "Chip",
                    label: evt,
                    variant: "outlined",
                    size: "small",
                });
            });
        }
        else {
            // No events subscribed
            chips.push({
                type: "Chip",
                label: "No events",
                variant: "outlined",
                size: "small",
                color: "gray",
            });
        }
        // Prepare markdown for creation/update timestamps.
        const datesMarkdown = `**Dates**\n- Created: ${inst.created_at}\n- Updated: ${inst.updated_at}`;
        return {
            type: "DataListItem",
            label: labelChildren,
            // Combine ChipGroup and Markdown under value as an array.
            value: [
                {
                    type: "ChipGroup",
                    childrenProps: chips,
                },
                {
                    type: "Markdown",
                    content: datesMarkdown,
                },
            ],
        };
    });
    // Compose the final DataList component.
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=468.js.map