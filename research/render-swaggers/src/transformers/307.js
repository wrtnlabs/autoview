export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We will display the list of URL templates in a card with a header and scrollable list.
    // Sort keys alphabetically for predictable order.
    const entries = Object.keys(input).sort();
    // Build DataListItem components for each endpoint: an icon + key name, and the URL as inline code.
    const dataListItems = entries.map((key) => {
        const urlTemplate = input[key];
        return {
            type: "DataListItem",
            // Label area: a link icon and the property name
            label: [
                {
                    type: "Icon",
                    id: "link", // FontAwesome 'link' icon
                    color: "blue",
                    size: 16
                },
                {
                    type: "Text",
                    variant: "body1",
                    content: key
                }
            ],
            // Value area: show the URL template in code formatting via Markdown
            value: {
                type: "Markdown",
                content: `\`${urlTemplate}\``
            }
        };
    });
    // Wrap the list into a vertical card with a header
    const cardHeader = {
        type: "CardHeader",
        title: "API Endpoints",
        description: "Available URI templates provided by the server."
    };
    const cardContent = {
        type: "CardContent",
        // The DataList itself is a presentation component
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems
        }
    };
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
    return verticalCard;
}
//# sourceMappingURL=307.js.map