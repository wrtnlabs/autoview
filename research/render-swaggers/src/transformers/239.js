export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { managers = [], onlines = [], session, bookmark, group } = input;
    // 1. Build card header showing group title, description and scope tag
    const header = {
        type: "CardHeader",
        title: group === null || group === void 0 ? void 0 : group.title,
        description: group === null || group === void 0 ? void 0 : group.description,
        // use a users icon to indicate this is a group
        startElement: {
            type: "Icon",
            id: "users",
            color: "blue",
            size: 24,
        },
        // show group scope as a chip
        endElement: (group === null || group === void 0 ? void 0 : group.scope)
            ? {
                type: "Chip",
                label: group.scope,
                variant: "outlined",
                size: "small",
                // map scope to a semantic color
                color: group.scope === "all"
                    ? "blue"
                    : group.scope === "public"
                        ? "green"
                        : "gray",
            }
            : undefined,
    };
    // 2. Build card content: avatar group for managers + data list for online people
    const contentChildren = [];
    if (managers.length > 0) {
        // Transform each manager into an avatar
        const avatars = managers.map((mgr) => ({
            type: "Avatar",
            src: mgr.avatarUrl,
            name: mgr.name,
            variant: "cyan",
            size: 32,
        }));
        contentChildren.push({
            type: "AvatarGroup",
            childrenProps: avatars,
            maxItems: 5,
            totalItems: managers.length,
        });
    }
    if (onlines.length > 0) {
        // Build a data list of online users
        const items = onlines.map((o) => {
            var _a, _b, _c;
            return ({
                type: "DataListItem",
                // label slot: show person type or fallback to "User"
                label: [
                    {
                        type: "Text",
                        content: `${(_a = o.personType) !== null && _a !== void 0 ? _a : "User"}: ${(_c = (_b = o.personId) !== null && _b !== void 0 ? _b : o.id) !== null && _c !== void 0 ? _c : ""}`,
                    },
                ],
                // value slot: we could show channelId or id
                value: [
                    {
                        type: "Text",
                        content: o.channelId ? `Channel: ${o.channelId}` : "",
                    },
                ],
            });
        });
        contentChildren.push({
            type: "DataList",
            childrenProps: items,
        });
    }
    // If there's no content to show, render a markdown notice
    if (contentChildren.length === 0) {
        contentChildren.push({
            type: "Markdown",
            content: "### No group members or online sessions available",
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // 3. Build card footer: unread badge and bookmark chip
    const footerChildren = [];
    if ((session === null || session === void 0 ? void 0 : session.unread) !== undefined) {
        footerChildren.push({
            type: "Badge",
            count: session.unread,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "blue",
                size: 20,
            },
        });
    }
    if (bookmark === null || bookmark === void 0 ? void 0 : bookmark.bookmarkKey) {
        footerChildren.push({
            type: "Chip",
            label: bookmark.bookmarkKey,
            startElement: {
                type: "Icon",
                id: "bookmark",
                color: "orange",
                size: 20,
            },
            variant: "filled",
            color: "orange",
            size: "small",
        });
    }
    // If no footer elements, add a subtle note
    if (footerChildren.length === 0) {
        footerChildren.push({
            type: "Text",
            content: "No active sessions or bookmarks",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // 4. Assemble into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=239.js.map