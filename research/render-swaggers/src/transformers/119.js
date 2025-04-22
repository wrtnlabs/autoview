export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { id, created_at, member, customer, citizen } = input;
    // Transform member emails into Chip components for visual grouping
    const emailChips = member.emails.map((email) => ({
        type: "Chip",
        label: email.value,
        size: "small",
        variant: "outlined",
    }));
    // If there's an external_user payload, render it as a JSON code block via Markdown
    const externalUserMd = customer.external_user
        ? {
            type: "Markdown",
            content: "json\n" + JSON.stringify(customer.external_user, null, 2) + "\n```",
        }
        : undefined;
    // Build the list of data list items for all nested fields
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Member Nickname"], variant: "body2" },
            value: { type: "Text", content: [member.nickname], variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Member Joined At"], variant: "body2" },
            value: { type: "Text", content: [member.created_at], variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Member Emails"], variant: "body2" },
            value: { type: "ChipGroup", childrenProps: emailChips },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Customer Channel"], variant: "body2" },
            value: {
                type: "Chip",
                label: customer.channel.name,
                size: "small",
                variant: "outlined",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Customer Connection IP"], variant: "body2" },
            value: { type: "Text", content: [customer.ip], variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: ["Customer Connected At"], variant: "body2" },
            value: { type: "Text", content: [customer.created_at], variant: "body2" },
        },
    ];
    // Optionally include referrer if provided
    if (customer.referrer) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Customer Referrer"], variant: "body2" },
            value: { type: "Text", content: [customer.referrer], variant: "body2" },
        });
    }
    // Optionally include external user JSON details
    if (externalUserMd) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["External User Info"], variant: "body2" },
            value: externalUserMd,
        });
    }
    // Citizen verification details
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Citizen Name"], variant: "body2" },
        value: { type: "Text", content: [citizen.name], variant: "body2" },
    }, {
        type: "DataListItem",
        label: { type: "Text", content: ["Citizen Mobile"], variant: "body2" },
        value: { type: "Text", content: [citizen.mobile], variant: "body2" },
    }, {
        type: "DataListItem",
        label: { type: "Text", content: ["Citizen Verified At"], variant: "body2" },
        value: { type: "Text", content: [citizen.created_at], variant: "body2" },
    });
    // Compose the overall VerticalCard with header, content, and a footer button
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Show seller nickname prominently, add a store icon for quick recognition
                title: `Seller: ${member.nickname}`,
                description: `Record ID: ${id}`,
                startElement: {
                    type: "Icon",
                    id: "store",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Use a DataList for structured, responsive display of nested details
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            {
                type: "CardFooter",
                // A simple action button — could be wired up to more interactions in UI
                childrenProps: {
                    type: "Button",
                    variant: "text",
                    label: ["View More"],
                    color: "primary",
                },
            },
        ],
    };
}
//# sourceMappingURL=119.js.map