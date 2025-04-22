export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination metadata for header information
    const { list, totalResult, totalPage, page, } = input.data;
    // Map each user to a DataListItemProps for display
    const dataListItems = list.map((user) => {
        var _a;
        // Avatar: show user's profile image if available; otherwise fallback to initials via name
        const avatar = {
            type: "Avatar",
            src: (_a = user.profileImage) !== null && _a !== void 0 ? _a : undefined,
            name: user.nickname,
            size: 40,
        };
        // Nickname rendered as text
        const nameText = {
            type: "Text",
            content: user.nickname,
            variant: "body1",
        };
        // Reason rendered as a chip for visual emphasis
        const reasonChip = {
            type: "Chip",
            label: user.reason,
            size: "small",
            variant: "outlined",
        };
        return {
            type: "DataListItem",
            // Label section contains avatar + nickname
            label: [avatar, nameText],
            // Value section contains the reason chip
            value: reasonChip,
        };
    });
    // Construct the DataList component containing all items
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // CardHeader showing pagination status
    const header = {
        type: "CardHeader",
        title: `Page ${page} of ${totalPage}`,
        description: `Showing ${list.length} of ${totalResult} total results`,
    };
    // CardContent wrapping the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card combining header and content for a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=301.js.map