export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "#### No events to display"
        };
    }
    // Map each GitHub event to a ListItem with avatar, title, timestamp, and a "View" button
    const childrenProps = input.map((evt) => {
        var _a, _b, _c;
        const actor = evt.actor;
        const repo = evt.repo;
        // Choose the most descriptive action: payload.action if present, otherwise evt.type
        const action = (_c = (_b = (_a = evt.payload) === null || _a === void 0 ? void 0 : _a.action) !== null && _b !== void 0 ? _b : evt.type) !== null && _c !== void 0 ? _c : "Event";
        // Format the timestamp for readability; fall back to empty string if missing
        const timestamp = evt.created_at
            ? new Date(evt.created_at).toLocaleString()
            : "";
        // Avatar for the event actor
        const avatar = {
            type: "Avatar",
            src: actor.avatar_url,
            name: actor.login,
            size: 28
        };
        // Button linking to the repository page
        const viewButton = {
            type: "Button",
            variant: "text",
            size: "small",
            label: "View",
            href: repo.url
        };
        return {
            type: "ListItem",
            // e.g. "octocat opened on octo-repo"
            title: `${actor.login} ${action} on ${repo.name}`,
            // human-readable date/time
            description: timestamp,
            startElement: avatar,
            // allow the whole item to be clickable as well as the button
            href: repo.url,
            // show a small action button on the right
            endElement: viewButton
        };
    });
    // Wrap the list items in a responsive List component
    return {
        type: "List",
        childrenProps
    };
}
//# sourceMappingURL=448.js.map