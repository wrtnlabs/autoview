export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform timeline events into a DataList of DataListItems
    const items = input.map((evt) => {
        var _a, _b;
        // Extract actor information; provide graceful fallbacks
        const actor = (_a = evt.actor) !== null && _a !== void 0 ? _a : {};
        const actorLogin = typeof actor.login === 'string' ? actor.login : 'unknown';
        const actorAvatar = typeof actor.avatar_url === 'string' ? actor.avatar_url : undefined;
        // Build the label section: an avatar + actor name
        const labelComponents = [
            {
                type: "Avatar",
                src: actorAvatar,
                name: actorLogin,
            },
            {
                type: "Text",
                content: actorLogin,
                variant: "body1",
                color: "primary",
            },
        ];
        // Build the value section: event type and timestamp
        const valueComponents = [];
        // Show the event name and timestamp
        const when = evt.created_at ? new Date(evt.created_at).toLocaleString() : "";
        valueComponents.push({
            type: "Text",
            content: `${(_b = evt.event) !== null && _b !== void 0 ? _b : "event"} at ${when}`,
            variant: "caption",
            color: "gray",
        });
        // If the event adds or removes a label, show a Chip for the label name
        if (evt.label && typeof evt.label.name === "string") {
            valueComponents.push({
                type: "Chip",
                label: evt.label.name,
                variant: "outlined",
                color: "primary",
            });
        }
        // If the event has a body or message, render it as markdown (for readability and mobile responsiveness)
        if (typeof evt.body === "string" && evt.body.trim() !== "") {
            valueComponents.push({
                type: "Markdown",
                content: evt.body,
            });
        }
        else if (evt.commit && typeof evt.commit.message === "string") {
            // Some timeline events (commits) might carry a commit.message
            valueComponents.push({
                type: "Markdown",
                content: "\n" + evt.commit.message + "\n```",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=795.js.map