export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract the acquaintance list from the input
    const acquaintances = input.data.list;
    // If there are no acquaintances, show a simple markdown message
    if (!acquaintances || acquaintances.length === 0) {
        return {
            type: "Markdown",
            content: "#### No users to display",
        };
    }
    // Map each user to a ListItem component
    const listItems = acquaintances.map((user) => {
        // Determine if this user follows me or I follow them
        const isFollower = user.reason.includes("팔로우한 사람");
        // Construct an Avatar for the startElement.
        // If profileImage is provided, use it; otherwise fallback to initials.
        const avatar = Object.assign({ type: "Avatar", variant: isFollower ? "success" : "info", size: 40, name: user.nickname }, (user.profileImage
            ? { src: user.profileImage }
            : {}));
        // A Chip to display the relationship reason
        const reasonChip = {
            type: "Chip",
            label: user.reason,
            color: isFollower ? "success" : "info",
            size: "small",
            variant: "filled",
        };
        // An Icon indicating the direction of follow relationship
        const directionIcon = {
            type: "Icon",
            id: isFollower ? "user-plus" : "user-check",
            color: isFollower ? "green" : "blue",
            size: 16,
        };
        return {
            type: "ListItem",
            title: user.nickname,
            // We use endElement array to place both chip and icon on the right
            startElement: avatar,
            endElement: [reasonChip, directionIcon],
        };
    });
    // Return a List component containing all acquaintances
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=294.js.map