export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Generate up to two initials from the author's name for the avatar
    const nameParts = input.name ? input.name.trim().split(/\s+/) : [];
    const initials = nameParts.length
        ? nameParts.map(part => part.charAt(0).toUpperCase()).slice(0, 2).join('')
        : '';
    // Avatar showing the author's initials
    const avatar = {
        type: "Avatar",
        name: initials || undefined,
        variant: "primary",
        size: 40,
    };
    // A chip displaying the remote source name
    const remoteChip = {
        type: "Chip",
        label: input.remote_name,
        color: "secondary",
        size: "small",
        variant: "filled",
    };
    // Helper to build a text label
    const makeLabel = (text) => ({
        type: "Text",
        content: text,
        variant: "subtitle2",
    });
    // Helper to build a linked button with an icon
    const makeLinkButton = (href, label, iconId) => ({
        type: "Button",
        variant: "text",
        color: "blue",
        size: "small",
        href,
        startElement: {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "blue",
        },
        label,
    });
    // Build the individual data list items for each field
    const dataListItems = [
        {
            type: "DataListItem",
            label: makeLabel("ID"),
            value: {
                type: "Text",
                content: input.id.toString(),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: makeLabel("Remote ID"),
            value: {
                type: "Text",
                content: input.remote_id,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: makeLabel("Email"),
            value: makeLinkButton(`mailto:${input.email}`, input.email, "envelope"),
        },
        {
            type: "DataListItem",
            label: makeLabel("URL"),
            value: makeLinkButton(input.url, input.url, "link"),
        },
        {
            type: "DataListItem",
            label: makeLabel("Import URL"),
            value: makeLinkButton(input.import_url, input.import_url, "link"),
        },
    ];
    // Wrap all items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card header with avatar, name, email, and remote source chip
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: input.email,
        startElement: avatar,
        endElement: remoteChip,
    };
    // Card content wrapping the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Final vertical card combining header and content
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=767.js.map