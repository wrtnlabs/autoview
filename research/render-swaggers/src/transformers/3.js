export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a simple text component
    const createText = (text) => ({
        type: "Text",
        content: text,
        variant: "body2",
    });
    // Helper to create an icon component
    const createIcon = (id, color = "gray", size = 20) => ({
        type: "Icon",
        id,
        color,
        size,
    });
    // Helper to create a chip component
    const createChip = (label) => ({
        type: "Chip",
        label,
        variant: "outlined",
        size: "small",
    });
    // Build DataListItems for a given record, accepts a mapping array
    const buildDataList = (items) => {
        const childrenProps = items
            .filter((item) => item.value !== undefined)
            .map((item) => {
            // Determine the value component: either plain text or a provided component
            const valueComponent = typeof item.value === "string"
                ? createText(item.value)
                : item.value;
            return {
                type: "DataListItem",
                label: [createText(item.label)],
                value: [valueComponent],
            };
        });
        return {
            type: "DataList",
            childrenProps,
        };
    };
    // Member section
    const memberList = buildDataList([
        { label: "Member ID", value: input.member.id },
        { label: "Nickname", value: input.member.nickname },
        { label: "Joined At", value: input.member.created_at },
        // Emails as a ChipGroup
        {
            label: "Emails",
            value: {
                type: "ChipGroup",
                childrenProps: input.member.emails.map((email) => createChip(email.value)),
                maxItems: 5,
            },
        },
    ]);
    // Customer section
    const customerItems = [
        { label: "Customer ID", value: input.customer.id },
        { label: "Channel", value: input.customer.channel.name },
        { label: "Channel Code", value: input.customer.channel.code },
        { label: "Connected At", value: input.customer.created_at },
        { label: "IP Address", value: input.customer.ip },
    ];
    if (input.customer.href) {
        customerItems.push({
            label: "URL",
            // Use a button to link out
            value: {
                type: "Button",
                label: "Open",
                href: input.customer.href,
                variant: "text",
                color: "primary",
            },
        });
    }
    if (input.customer.referrer) {
        customerItems.push({ label: "Referrer", value: input.customer.referrer });
    }
    const customerList = buildDataList(customerItems);
    // Citizen section
    const citizenList = buildDataList([
        { label: "Citizen ID", value: input.citizen.id },
        { label: "Name", value: input.citizen.name },
        { label: "Mobile", value: input.citizen.mobile },
        { label: "Verified At", value: input.citizen.created_at },
    ]);
    // Compose CardHeader
    const header = {
        type: "CardHeader",
        title: "Administrator",
        description: `ID: ${input.id}`,
        startElement: createIcon("user", "blue", 28),
        endElement: {
            type: "Text",
            content: `Since ${input.created_at}`,
            variant: "caption",
        },
    };
    // Compose CardContent with the three lists
    const content = {
        type: "CardContent",
        childrenProps: [memberList, customerList, citizenList],
    };
    // Wrap everything in a VerticalCard for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=3.js.map