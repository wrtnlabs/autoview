export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure to access the rule and its app details
    const { id, node_id, enabled, app } = input;
    // Choose an icon to represent enabled/disabled state
    const statusIcon = {
        type: "Icon",
        id: enabled ? "check-circle" : "times-circle", // FontAwesome icon names
        color: enabled ? "green" : "gray",
        size: 20,
    };
    // Header of the card: shows rule id and status
    const header = {
        type: "CardHeader",
        title: `Rule #${id}`,
        description: enabled ? "Enabled" : "Disabled",
        startElement: statusIcon,
    };
    // Build a data list of key values for details
    const listItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                color: "secondary",
                content: "Rule Node ID",
            },
            value: {
                type: "Text",
                variant: "body1",
                content: node_id,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                color: "secondary",
                content: "App Slug",
            },
            value: {
                type: "Text",
                variant: "body1",
                content: app.slug,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                color: "secondary",
                content: "App Node ID",
            },
            value: {
                type: "Text",
                variant: "body1",
                content: app.node_id,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                color: "secondary",
                content: "App Integration URL",
            },
            value: {
                type: "Text",
                variant: "body1",
                // show URL as clickable markdown link for better UX on mobile
                content: `[Open](${app.integration_url})`,
            },
        },
    ];
    // Wrap the list items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card content: contains the data list
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Footer with a button to open the app integration link
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                variant: "outlined",
                color: "primary",
                size: "medium",
                label: "View App Details",
                href: app.integration_url,
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    size: 16,
                    color: "blue",
                },
            },
        ],
    };
    // Compose a vertical card to display the complete rule information
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=737.js.map