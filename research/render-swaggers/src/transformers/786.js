export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each raw event into a DataListItem for display
    const items = input.map((event) => {
        // Derive a human-friendly event name from common fields
        const eventName = event.event ||
            event.action ||
            event.type ||
            "Event";
        // If the event has an actor/user with an avatar, use it; otherwise fall back to an icon
        const actor = event.actor || event.user;
        const hasAvatar = (actor === null || actor === void 0 ? void 0 : actor.avatar_url) || (actor === null || actor === void 0 ? void 0 : actor.avatar);
        const startElement = hasAvatar
            ? {
                type: "Avatar",
                src: actor.avatar_url || actor.avatar,
                name: actor.login || actor.name,
                size: 24,
            }
            : {
                type: "Icon",
                id: "bell",
                size: 24,
                color: "blue",
            };
        // Label combines the avatar/icon with the event name text
        const label = [
            startElement,
            {
                type: "Text",
                content: eventName,
                variant: "body1",
            },
        ];
        // Display the full event payload as a collapsible markdown code block
        // This keeps JSON pretty-printed but within a markdown renderer
        const markdownContent = "json\n" + JSON.stringify(event, null, 2) + "\n```";
        const value = {
            type: "Markdown",
            content: markdownContent,
        };
        return {
            type: "DataListItem",
            label,
            value,
        };
    });
    // Wrap all items in a responsive DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=786.js.map