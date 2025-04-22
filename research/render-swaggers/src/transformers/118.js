export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare a list of DataListItemProps to show key/value pairs
    const dataListItems = [];
    // Seller primary key
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Seller ID" },
        value: { type: "Text", content: input.id },
    });
    // Seller signup time
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Signed Up" },
        value: { type: "Text", content: input.created_at },
    });
    // Real name (citizen)
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Real Name" },
        value: { type: "Text", content: input.citizen.name },
    });
    // Mobile number
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Mobile" },
        value: { type: "Text", content: input.citizen.mobile },
    });
    // Member nickname
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Nickname" },
        value: { type: "Text", content: input.member.nickname },
    });
    // Member emails as a ChipGroup for better visual density
    if (input.member.emails && input.member.emails.length > 0) {
        const emailChips = input.member.emails.map((e) => ({
            type: "Chip",
            label: e.value,
            size: "small",
            variant: "filled",
            color: "secondary",
        }));
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Emails" },
            value: { type: "ChipGroup", childrenProps: emailChips },
        });
    }
    // Customer channel
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Channel" },
        value: { type: "Text", content: input.customer.channel.name },
    });
    // Connection IP
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "IP Address" },
        value: { type: "Text", content: input.customer.ip },
    });
    // Connection timestamp
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Connected At" },
        value: { type: "Text", content: input.customer.created_at },
    });
    // Connection URL (if available)
    if (input.customer.href) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "URL" },
            value: { type: "Text", content: input.customer.href },
        });
    }
    // Referrer (if available)
    if (input.customer.referrer) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Referrer" },
            value: { type: "Text", content: input.customer.referrer },
        });
    }
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // CardHeader with an avatar for a quick visual cue
    const header = {
        type: "CardHeader",
        title: input.citizen.name,
        description: `@${input.member.nickname}`,
        startElement: {
            type: "Avatar",
            name: input.citizen.name,
            size: 40,
            variant: "primary",
        },
    };
    // CardContent wrapping the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a VerticalCard combining header and content for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=118.js.map