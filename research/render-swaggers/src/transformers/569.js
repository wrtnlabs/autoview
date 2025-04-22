export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely parse and format dates; fall back to raw string on error
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime()))
                throw new Error("Invalid Date");
            return date.toLocaleString();
        }
        catch (_a) {
            return dateString;
        }
    };
    // Icon for the card header to visually represent a project column
    const headerIcon = {
        type: "Icon",
        id: "folder", // using a folder icon to represent a column
        color: "blue",
        size: 24,
    };
    // Build a list of key/value pairs for important metadata
    const dataListItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Column ID",
                variant: "subtitle2",
            },
            value: {
                type: "Chip",
                label: input.id.toString(),
                variant: "outlined",
                color: "primary",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Node ID",
                variant: "subtitle2",
            },
            value: {
                type: "Chip",
                label: input.node_id,
                variant: "outlined",
                color: "secondary",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Updated At",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Column URL",
                variant: "subtitle2",
            },
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                label: "Open",
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "teal",
                    size: 16,
                },
                href: input.url,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Project URL",
                variant: "subtitle2",
            },
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                label: "Open",
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "teal",
                    size: 16,
                },
                href: input.project_url,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Cards URL",
                variant: "subtitle2",
            },
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                label: "Open",
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "teal",
                    size: 16,
                },
                href: input.cards_url,
            },
        },
    ];
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card header with icon, title, and subtitle
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: `Overview of column ${input.name}`,
        startElement: headerIcon,
    };
    // Card content holding the detailed metadata list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Card footer summarizing last update time
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            content: `Last updated: ${formatDate(input.updated_at)}`,
            variant: "caption",
        },
    };
    // Combine header, content, and footer into a vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return card;
}
//# sourceMappingURL=569.js.map