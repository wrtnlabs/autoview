export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the response payload for easy access
    const { data } = input;
    // Define the metrics we want to visualize, each with an FA icon and a color
    const metrics = [
        { label: "Questions", iconId: "question-circle", value: data.question, color: "blue" },
        { label: "Answers", iconId: "reply", value: data.answer, color: "green" },
        { label: "Adopted", iconId: "check-circle", value: data.adopted, color: "teal" },
        { label: "Writings", iconId: "edit", value: data.writing, color: "orange" },
        { label: "Likes", iconId: "thumbs-up", value: data.likes, color: "red" },
    ];
    // Transform each metric into a DataListItemProps object
    const listItems = metrics.map(metric => ({
        type: "DataListItem",
        // The label is composed of an icon followed by text for clarity
        label: [
            {
                type: "Icon",
                id: metric.iconId,
                color: metric.color,
                size: 20,
            },
            {
                type: "Text",
                content: metric.label,
            },
        ],
        // Display the numeric value; could be replaced with a Chip or Badge if desired
        value: {
            type: "Text",
            content: metric.value.toString(),
        },
    }));
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Compose the final UI as a card with a header and the metrics list
    const cardHeader = {
        type: "CardHeader",
        title: "User Statistics",
        description: `User ID: ${data.id}`,
        // Use a user icon for a visual cue
        startElement: {
            type: "Icon",
            id: "user",
            color: "indigo",
            size: 24,
        },
    };
    const cardContent = {
        type: "CardContent",
        // Embed the DataList inside the card content
        childrenProps: dataList,
    };
    // Return a vertically stacked card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=299.js.map