export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // If all sections are empty or missing, show a fallback message
    const hasData = !!input.group ||
        ((_b = (_a = input.managers) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0 ||
        ((_d = (_c = input.onlines) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 ||
        !!input.bookmark ||
        !!input.session;
    if (!hasData) {
        return {
            type: "Text",
            content: "No group data available",
            variant: "body1",
        };
    }
    // Collect children for the VerticalCard
    const cardChildren = [];
    // 1. Header: show group title, description, and an icon if present
    if (input.group) {
        const { title, description, icon, id } = input.group;
        const startElement = icon
            ? {
                type: "Icon",
                id: icon,
                size: 36,
                color: "blue",
            }
            : undefined;
        cardChildren.push(Object.assign({ type: "CardHeader", title,
            description }, (startElement ? { startElement } : {})));
    }
    // 2. Content: build a DataList of managers, online users, bookmark, session
    const listItems = [];
    // 2.a Managers list
    if (input.managers && input.managers.length > 0) {
        input.managers.forEach((manager) => {
            // Avatar for the manager
            const avatar = {
                type: "Avatar",
                src: manager.avatarUrl,
                name: manager.name,
                variant: "info",
                size: 32,
            };
            // Manager name
            const nameText = {
                type: "Text",
                content: manager.name,
                variant: "body1",
            };
            // Manager detail (email or description)
            const detailText = {
                type: "Text",
                content: manager.email || manager.description || "No details",
                variant: "body2",
                color: "secondary",
            };
            listItems.push({
                type: "DataListItem",
                label: [avatar, nameText],
                value: detailText,
            });
        });
    }
    // 2.b Online users avatar group
    if (input.onlines && input.onlines.length > 0) {
        const avatars = input.onlines.map((online) => {
            const name = online.personId || online.id || "User";
            return {
                type: "Avatar",
                name,
                variant: "success",
                size: 24,
            };
        });
        const avatarGroup = {
            type: "AvatarGroup",
            childrenProps: avatars,
            maxItems: Math.min(avatars.length, 5),
            totalItems: avatars.length,
        };
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Online Users",
                variant: "body1",
            },
            value: avatarGroup,
        });
    }
    // 2.c Bookmark tooltip
    if (input.bookmark) {
        const icon = {
            type: "Icon",
            id: "bookmark",
            size: 20,
            color: "teal",
        };
        const tooltip = {
            type: "Tooltip",
            message: input.bookmark.bookmarkKey || input.bookmark.chatKey || "Bookmark",
            childrenProps: icon,
        };
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Bookmark",
                variant: "body1",
            },
            value: tooltip,
        });
    }
    // 2.d Session unread badge
    if (input.session) {
        const envelope = {
            type: "Icon",
            id: "envelope",
            size: 20,
            color: "blue",
        };
        const badge = {
            type: "Badge",
            count: input.session.unread,
            showZero: false,
            maxCount: 99,
            childrenProps: envelope,
            color: "error",
        };
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Unread Messages",
                variant: "body1",
            },
            value: badge,
        });
    }
    // Only add the DataList if we have items
    if (listItems.length > 0) {
        const dataList = {
            type: "DataList",
            childrenProps: listItems,
        };
        cardChildren.push({
            type: "CardContent",
            childrenProps: dataList,
        });
    }
    // 3. Footer: navigational button to the group details page
    if (input.group && input.group.id) {
        const viewButton = {
            type: "Button",
            label: "View Details",
            variant: "contained",
            color: "primary",
            size: "medium",
            href: `/group/${input.group.id}`,
        };
        cardChildren.push({
            type: "CardFooter",
            childrenProps: viewButton,
        });
    }
    // Final assembly: a responsive vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
    return verticalCard;
}
//# sourceMappingURL=238.js.map