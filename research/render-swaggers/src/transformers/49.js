export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation date into a human-friendly string
    let formattedDate;
    try {
        const date = new Date(input.created_at);
        // toLocaleString will respect user's locale and be mobile-friendly
        formattedDate = isNaN(date.getTime())
            ? input.created_at
            : date.toLocaleString();
    }
    catch (_a) {
        formattedDate = input.created_at;
    }
    // Create a DataList item for a key/value pair
    const makeDataListItem = (labelText, valueText) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            color: "tertiary",
            content: [labelText],
        },
        value: {
            type: "Text",
            variant: "body1",
            content: [valueText],
        },
    });
    // Assemble the DataList of section details
    const detailsList = {
        type: "DataList",
        childrenProps: [
            makeDataListItem("ID", input.id),
            makeDataListItem("Created At", formattedDate),
        ],
    };
    // Use an avatar with the section name initials for more visual appeal
    const avatar = {
        type: "Avatar",
        name: input.name,
        variant: "info",
        size: 40,
    };
    // Build a vertical card to display the section information responsively
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // The section name is the prominent title
                title: input.name,
                // The internal code appears as subtitle
                description: input.code,
                // Display an avatar representing the section
                startElement: avatar,
            },
            {
                type: "CardContent",
                // Embed the data list inside card content
                childrenProps: detailsList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=49.js.map