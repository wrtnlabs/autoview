export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination and list data
    const { data: { list, page, totalPage, totalResult }, } = input;
    // Edge case: no alarms to display
    if (!Array.isArray(list) || list.length === 0) {
        return {
            type: "Markdown",
            content: "### No alarms found",
        };
    }
    // Build each DataListItem for alarms
    const dataListItems = list.map((alarm) => {
        // Icon to denote an alarm
        const alarmIcon = {
            type: "Icon",
            id: "bell", // FontAwesome bell icon
            color: "orange",
            size: 24,
        };
        // Text showing the user ID
        const userText = {
            type: "Text",
            variant: "body2",
            content: `User ${alarm.userId}`,
        };
        // Assemble label: [Icon, Text]
        const labelComponents = [
            alarmIcon,
            userText,
        ];
        // Build chips for resource info if available
        const chips = [];
        if (typeof alarm.resourceName === "string") {
            chips.push({
                type: "Chip",
                label: alarm.resourceName,
                variant: "filled",
                size: "small",
                color: "primary",
            });
        }
        if (typeof alarm.resourceId === "number") {
            chips.push({
                type: "Chip",
                label: `#${alarm.resourceId}`,
                variant: "outlined",
                size: "small",
                color: "secondary",
            });
        }
        // Wrap chips in a ChipGroup if any exist
        const valueComponent = chips.length > 0
            ? {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: chips.length,
            }
            : undefined;
        return {
            type: "DataListItem",
            // label can be an array of presentation components
            label: labelComponents,
            // value can be a single presentation component (ChipGroup)
            value: valueComponent,
        };
    });
    // The DataList component to list all alarms
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card header with title and pagination summary
    const cardHeader = {
        type: "CardHeader",
        title: "Alarm Notifications",
        description: `Page ${page} of ${totalPage} • ${totalResult} total`,
        startElement: {
            type: "Icon",
            id: "bell",
            color: "orange",
            size: 32,
        },
    };
    // Card content to embed the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Wrap everything in a vertical card for a clean, responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=281.js.map