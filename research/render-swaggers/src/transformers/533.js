export function transform($input) {
    return visualizeData($input);
}
// Transform a `Schema.team_full` object into a visual AutoView component (a vertical card)
function visualizeData(input) {
    var _a;
    // 1. Header: show team name, description, avatar, and member count badge
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : "No description provided",
        // show the organization avatar as a circle
        startElement: {
            type: "Avatar",
            src: input.organization.avatar_url,
            name: input.organization.login,
            size: 40,
            variant: "primary"
        },
        // show a badge with the members_count and a "users" icon
        endElement: {
            type: "Badge",
            count: input.members_count,
            maxCount: 999,
            showZero: true,
            color: "info",
            childrenProps: {
                type: "Icon",
                id: "users",
                color: "gray",
                size: 16
            }
        }
    };
    // 2. Content: list key properties in a data list
    const listItems = [];
    // Helper to push a labeled text pair
    const pushPair = (labelText, valueText) => {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: labelText },
            value: { type: "Text", content: valueText }
        });
    };
    pushPair("Team ID", String(input.id));
    pushPair("Permission", input.permission);
    if (input.privacy)
        pushPair("Privacy", input.privacy);
    if (input.notification_setting)
        pushPair("Notifications", input.notification_setting);
    pushPair("Repositories", String(input.repos_count));
    pushPair("Created At", new Date(input.created_at).toLocaleDateString());
    pushPair("Updated At", new Date(input.updated_at).toLocaleDateString());
    // build the DataList component
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };
    // 3. Footer: action buttons for navigating to team page and repos page
    const footerButtons = [
        {
            type: "Button",
            label: "View Team",
            href: input.html_url,
            variant: "contained",
            color: "primary",
            size: "medium"
        },
        {
            type: "Button",
            label: "View Repos",
            href: input.repositories_url,
            variant: "outlined",
            color: "secondary",
            size: "medium"
        }
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons
    };
    // 4. Assemble a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=533.js.map