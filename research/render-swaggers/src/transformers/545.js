export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    /**
     * Map each GitHub reaction content to a FontAwesome icon name and a color
     * The color must match one of the allowed values in IAutoView.IAutoViewIconProps.color
     */
    const reactionMap = {
        "+1": { id: "thumbs-up", color: "green" },
        "-1": { id: "thumbs-down", color: "red" },
        laugh: { id: "laugh", color: "yellow" },
        confused: { id: "confused", color: "gray" },
        heart: { id: "heart", color: "red" },
        hooray: { id: "grin-beam", color: "blue" },
        rocket: { id: "rocket", color: "cyan" },
        eyes: { id: "eyes", color: "gray" },
    };
    const { id: iconId, color: iconColor } = reactionMap[input.content];
    // Format the ISO timestamp to a more user-friendly locale string.
    // If parsing fails, fall back to the raw string.
    let formattedTime = input.created_at;
    const dt = new Date(input.created_at);
    if (!isNaN(dt.getTime())) {
        formattedTime = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
    }
    // Build an Avatar component for the reacting user, if available.
    // If the user is a site admin, highlight the avatar with a 'warning' variant.
    const avatar = {
        type: "Avatar",
        src: (_a = input.user) === null || _a === void 0 ? void 0 : _a.avatar_url,
        name: (_b = input.user) === null || _b === void 0 ? void 0 : _b.login,
        size: 32,
        variant: ((_c = input.user) === null || _c === void 0 ? void 0 : _c.site_admin) ? "warning" : undefined,
    };
    // Build an Icon component to display the reaction.
    const reactionIcon = {
        type: "Icon",
        id: iconId,
        color: iconColor,
        size: 24,
    };
    // Assemble a ListItem showing avatar + user login on the left,
    // timestamp below, and the reaction icon on the right.
    const listItem = {
        type: "ListItem",
        title: (_e = (_d = input.user) === null || _d === void 0 ? void 0 : _d.login) !== null && _e !== void 0 ? _e : "Unknown User",
        description: formattedTime,
        startElement: avatar,
        endElement: reactionIcon,
        // If the user's profile URL is available, make the entire item a link.
        href: (_f = input.user) === null || _f === void 0 ? void 0 : _f.html_url,
    };
    // Wrap the single item into a responsive List container.
    // Even for a single reaction, using a List keeps the UI consistent
    // and makes it easy to extend to multiple reactions in the future.
    const list = {
        type: "List",
        childrenProps: listItem,
    };
    return list;
}
//# sourceMappingURL=545.js.map