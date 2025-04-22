export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No events to display**"
        };
    }
    // Transform each GitHub event into a DataListItem
    const items = input.map(evt => {
        // 1. Actor avatar for quick visual identification
        const avatar = {
            type: "Avatar",
            src: evt.actor.avatar_url,
            name: evt.actor.login,
            size: 36
        };
        // 2. Actor login as headline
        const actorText = {
            type: "Text",
            content: evt.actor.login,
            variant: "subtitle1",
            color: "primary"
        };
        // 3. Repository name as secondary text
        const repoText = {
            type: "Text",
            content: evt.repo.name,
            variant: "body2",
            color: "secondary"
        };
        // 4. Chips to represent the action and event type visually
        const chips = [];
        if (evt.payload.action) {
            chips.push({
                type: "Chip",
                label: evt.payload.action,
                variant: "filled",
                color: "success",
                size: "small"
            });
        }
        if (evt.type) {
            chips.push({
                type: "Chip",
                label: evt.type,
                variant: "outlined",
                color: "info",
                size: "small"
            });
        }
        // Compose the DataListItemProps
        // - label: avatar + actor login
        // - value: repo name + chips (action & event type)
        return {
            type: "DataListItem",
            label: [avatar, actorText],
            value: [repoText, ...chips]
        };
    });
    // Compose the DataList containing all items
    const list = {
        type: "DataList",
        childrenProps: items
    };
    return list;
}
//# sourceMappingURL=747.js.map