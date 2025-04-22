export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure paging information and list of users
    const { data: { list, count, totalPage, page }, } = input;
    // Map each acquaintance to a DataListItem with an avatar, name, and reason chip
    const dataListItems = list.map((user) => {
        var _a;
        // Avatar component: uses profileImage if present, otherwise the user's initials
        const avatar = {
            type: "Avatar",
            src: (_a = user.profileImage) !== null && _a !== void 0 ? _a : undefined,
            name: user.nickname,
            variant: "primary",
            size: 40,
        };
        // Text component for the user's nickname
        const nameText = {
            type: "Text",
            content: user.nickname,
            variant: "body1",
        };
        // Chip component showing the reason for acquaintance
        const reasonChip = {
            type: "Chip",
            label: user.reason,
            variant: "outlined",
            size: "small",
        };
        return {
            type: "DataListItem",
            // Label shows avatar and name side by side
            label: [avatar, nameText],
            // Value shows the reason chip
            value: reasonChip,
        };
    });
    // Wrap the items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card header showing title and paging summary, with a users icon
    const cardHeader = {
        type: "CardHeader",
        title: "Acquaintances",
        description: `${count} total · Page ${page} of ${totalPage}`,
        startElement: {
            type: "Icon",
            id: "users",
            color: "teal",
            size: 24,
        },
    };
    // Card content containing our DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card that encapsulates header and list content.
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=300.js.map