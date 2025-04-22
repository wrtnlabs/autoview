export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { id, created_at, member, customer, citizen } = input;
    // Format timestamps for human-readable display
    const sellerCreated = new Date(created_at).toLocaleString();
    const customerCreated = new Date(customer.created_at).toLocaleString();
    // Header with seller identity and signup time
    const cardHeader = {
        type: "CardHeader",
        title: `Seller #${id}`,
        description: `Signed up: ${sellerCreated}`,
        // Use a user icon to make it more visual
        startElement: {
            type: "Icon",
            id: "user",
            size: 28,
            color: "blue"
        }
    };
    // Build chips for each member email
    const emailChips = member.emails.map(email => ({
        type: "Chip",
        label: email.value,
        color: "teal",
        size: "small",
        variant: "outlined"
    }));
    // Build a list of DataListItemProps for all key fields
    const dataListItems = [
        // Member section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member Nickname" },
            value: { type: "Text", content: member.nickname }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member ID" },
            value: { type: "Text", content: member.id }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member Emails" },
            // Show a chip group if emails exist, else fallback to text
            value: emailChips.length > 0
                ? { type: "ChipGroup", childrenProps: emailChips }
                : { type: "Text", content: "None" }
        },
        // Customer section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Channel" },
            value: {
                type: "Text",
                content: `${customer.channel.name} (${customer.channel.code})`
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Connection IP" },
            value: { type: "Text", content: customer.ip }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Connected At" },
            value: { type: "Text", content: customerCreated }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Referrer" },
            // Use markdown link if referrer is present
            value: customer.referrer
                ? { type: "Markdown", content: `[Referral](${customer.referrer})` }
                : { type: "Text", content: "None" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Page URL" },
            value: { type: "Markdown", content: `[Visit](${customer.href})` }
        },
        // Citizen section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Citizen Name" },
            value: { type: "Text", content: citizen.name }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Mobile" },
            value: { type: "Text", content: citizen.mobile }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Citizen ID" },
            value: { type: "Text", content: citizen.id }
        }
    ];
    // Wrap the items in a DataList for structured display
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Main content area of the card
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Compose a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=120.js.map