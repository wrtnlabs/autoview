export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Attempt to format the created_at timestamp into a human‐readable date.
    // If parsing fails, fall back to the raw timestamp string.
    let joinedDate;
    try {
        joinedDate = new Date(input.created_at).toLocaleDateString();
    }
    catch (_b) {
        joinedDate = input.created_at;
    }
    // Build the avatar for the shipper using their name (initials will be shown).
    // Variant "info" gives a pleasant default color.
    const avatar = {
        type: "Avatar",
        name: input.name,
        variant: "info",
        size: 40,
    };
    // Build the card header, showing the shipper's name and company (if any).
    // If company is null, omit description so the header is less cluttered.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.company) !== null && _a !== void 0 ? _a : undefined,
        startElement: avatar,
    };
    // Build the list of data points: phone and member‐since date.
    // Use a DataList for responsive vertical stacking on small screens.
    const dataListItems = [];
    // Mobile phone entry: label "Mobile", value as a text button that invokes the dialer.
    dataListItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Mobile",
                variant: "subtitle2",
            },
        ],
        value: {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            // tel: link to open phone dialer
            href: `tel:${input.mobile}`,
            // Prepend a phone icon to make it more visual
            startElement: {
                type: "Icon",
                id: "phone",
                color: "green",
                size: 16,
            },
            label: input.mobile,
        },
    });
    // Joined date entry: label "Joined", value as a styled text component
    dataListItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Joined",
                variant: "subtitle2",
            },
        ],
        // Showing the date in a muted color for subtlety
        value: {
            type: "Text",
            content: joinedDate,
            variant: "body2",
            color: "gray",
        },
    });
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Wrap the data list in card content for spacing and card‐like look.
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card combining the header and content.
    // This structure is responsive and stacks well on mobile.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=126.js.map