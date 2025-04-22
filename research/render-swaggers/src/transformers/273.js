export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { user, online } = input;
    // Helper: safely format any primitive or undefined
    const formatValue = (value, placeholder = "N/A") => value !== undefined && value !== null && value !== "" ? String(value) : placeholder;
    // If no user data, render a friendly markdown message
    if (!user) {
        return {
            type: "Markdown",
            content: "### No user data available\nPlease check back later or contact support."
        };
    }
    // 1. Build the card header with avatar, name and online status indicator
    const header = {
        type: "CardHeader",
        // Display user name or fallback to ID
        title: user.name || formatValue(user.id),
        // Show user type as subtitle (e.g. member, lead, unified)
        description: user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : undefined,
        // Avatar: show image if available, otherwise initials derived from name
        startElement: {
            type: "Avatar",
            src: user.avatarUrl,
            name: user.name,
            size: 40,
            variant: "primary"
        },
        // Status indicator: green when online object exists, gray otherwise
        endElement: {
            type: "Icon",
            id: "circle",
            color: online ? "green" : "gray",
            size: 12
        }
    };
    // 2. Prepare a list of key user properties for details view
    const dataItems = [];
    function addDetail(label, value) {
        dataItems.push({
            type: "DataListItem",
            // Label cell
            label: {
                type: "Text",
                content: label + ":",
                variant: "body2",
                color: "secondary"
            },
            // Value cell
            value: {
                type: "Text",
                content: formatValue(value),
                variant: "body1"
            }
        });
    }
    addDetail("Email", user.emailQualified ? user.email : undefined);
    addDetail("Mobile", user.mobileNumberQualified ? user.mobileNumber : undefined);
    addDetail("Country", user.country);
    addDetail("Language", user.language);
    addDetail("Sessions", user.sessionsCount);
    addDetail("Last Seen", user.lastSeenAt ? new Date(user.lastSeenAt).toLocaleString() : undefined);
    // 3. Assemble the data list component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems
    };
    // 4. Build a chip group to display user tags (if any)
    const tagsList = Array.isArray(user.tags) ? user.tags : [];
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: tagsList.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "primary"
        }))
    };
    // 5. Combine data list and tags into card content
    const content = {
        type: "CardContent",
        childrenProps: [dataList, chipGroup]
    };
    // 6. Return a vertical card wrapping header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=273.js.map