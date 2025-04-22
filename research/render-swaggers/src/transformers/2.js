export function transform($input) {
    return visualizeData($input);
}
// Transforms administrator invert data into a visual AutoView component tree.
function visualizeData(input) {
    const { id: adminId, created_at: adminCreatedAt, member, customer, citizen, } = input;
    /**
     * Helper to build a DataListItemProps with an icon, label text, and value text.
     * Uses Text and Icon components for clarity.
     */
    function createItem(iconId, labelText, valueText) {
        return {
            type: "DataListItem",
            // Label shows a compact icon + text
            label: [
                { type: "Icon", id: iconId, size: 16, color: "blue" },
                {
                    type: "Text",
                    content: ` ${labelText}`,
                    variant: "body2",
                },
            ],
            // Value is rendered as plain text; fall back to "N/A"
            value: {
                type: "Text",
                content: valueText !== null && valueText !== void 0 ? valueText : "N/A",
                variant: "body2",
            },
        };
    }
    // Aggregate all relevant fields into list items
    const dataListItems = [
        createItem("user", "Member Nickname", member.nickname),
        createItem("envelope", "Emails", member.emails.map((e) => e.value).join(", ")),
        createItem("calendar", "Member Since", member.created_at),
        createItem("id-badge", "Customer ID", customer.id),
        createItem("globe", "Channel", `${customer.channel.name} (${customer.channel.code})`),
        createItem("network-wired", "IP", customer.ip),
        createItem("clock", "Connected At", customer.created_at),
        createItem("link", "Referrer", customer.referrer),
        createItem("user-check", "Real Name", citizen.name),
        createItem("mobile-alt", "Mobile", citizen.mobile),
        createItem("user-plus", "Admin Since", adminCreatedAt),
    ];
    // Compose a vertical card with header, content (data list), and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: citizen.name,
                description: "Administrator Profile",
                // Use an avatar with the administrator's name initials
                startElement: {
                    type: "Avatar",
                    name: citizen.name,
                    size: 40,
                    variant: "primary",
                },
                // Show the admin's ID as a chip for quick reference
                endElement: {
                    type: "Chip",
                    label: adminId,
                    variant: "outlined",
                    color: "secondary",
                    size: "small",
                },
            },
            {
                type: "CardContent",
                // Embed the data list as the main body of the card
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            {
                type: "CardFooter",
                // Action button for further navigation or detail view
                childrenProps: {
                    type: "Button",
                    label: "View Details",
                    variant: "contained",
                    color: "primary",
                    size: "medium",
                },
            },
        ],
    };
}
//# sourceMappingURL=2.js.map