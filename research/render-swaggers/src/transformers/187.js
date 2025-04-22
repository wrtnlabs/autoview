export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // If no group data provided, show a simple markdown notice
    if (!input.group) {
        return {
            type: "Markdown",
            content: "### No Group Data Available"
        };
    }
    const { group, managers, onlines, session, bookmark } = input;
    // Prepare manager avatars for an AvatarGroup
    const managerAvatars = (managers !== null && managers !== void 0 ? managers : [])
        .filter(m => m.name) // ensure at least a name
        .map(m => ({
        type: "Avatar",
        src: m.avatarUrl,
        name: m.name,
        size: 32,
        variant: "blue"
    }));
    const managerCount = (_a = managers === null || managers === void 0 ? void 0 : managers.length) !== null && _a !== void 0 ? _a : 0;
    const onlineCount = (_b = onlines === null || onlines === void 0 ? void 0 : onlines.length) !== null && _b !== void 0 ? _b : 0;
    const unreadCount = (_c = session === null || session === void 0 ? void 0 : session.unread) !== null && _c !== void 0 ? _c : 0;
    const bookmarkKey = bookmark === null || bookmark === void 0 ? void 0 : bookmark.bookmarkKey;
    // Build data list items dynamically, skipping undefined values
    const listItems = [];
    // 1) Group scope
    if (group.scope) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Scope", variant: "subtitle2" }],
            value: [{ type: "Text", content: group.scope, variant: "body1" }]
        });
    }
    // 2) Managers (with AvatarGroup)
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Managers", variant: "subtitle2" }],
        value: {
            type: "AvatarGroup",
            childrenProps: managerAvatars,
            maxItems: 5,
            totalItems: managerCount
        }
    });
    // 3) Online members (with Badge + Icon)
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Online", variant: "subtitle2" }],
        value: {
            type: "Badge",
            count: onlineCount,
            showZero: true,
            childrenProps: {
                type: "Icon",
                id: "user",
                size: 20,
                color: "green"
            }
        }
    });
    // 4) Unread messages (if session info exists)
    if (session) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Unread", variant: "subtitle2" }],
            value: {
                type: "Badge",
                count: unreadCount,
                showZero: true,
                childrenProps: {
                    type: "Icon",
                    id: "comment",
                    size: 20,
                    color: "red"
                }
            }
        });
    }
    // 5) Bookmark (if exists)
    if (bookmarkKey) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Bookmark", variant: "subtitle2" }],
            value: {
                type: "Chip",
                label: bookmarkKey,
                variant: "outlined",
                size: "small"
            }
        });
    }
    // Compose the card header: group name and optional icon
    const header = {
        type: "CardHeader",
        title: group.name,
        description: group.description,
        // use group.icon as a FontAwesome icon if pattern matches
        startElement: group.icon
            ? {
                type: "Icon",
                id: group.icon,
                size: 32,
                color: "blue"
            }
            : undefined
    };
    // Compose the card content: a DataList of all items
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };
    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=187.js.map