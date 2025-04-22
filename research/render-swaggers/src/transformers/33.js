export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input pagination and data array
    const { pagination, data } = input;
    const { current, pages } = pagination;
    // Compose DataListItemProps for each review entry
    const reviewItems = data.map((review) => {
        // Header components: Title and creation timestamp
        const labelComponents = [
            {
                type: "Text",
                content: review.title,
                variant: "h6",
                color: "primary",
            },
            {
                type: "Text",
                content: `Created: ${new Date(review.created_at).toLocaleDateString()}`,
                variant: "caption",
                color: "#666", // custom gray color
            },
        ];
        // Body component: Use markdown for rich content when possible
        const valueComponent = {
            type: "Markdown",
            content: review.body,
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent,
        };
    });
    // DataList wrapping all review items
    const dataList = {
        type: "DataList",
        childrenProps: reviewItems,
    };
    // Card header displays page title and pagination summary
    const cardHeader = {
        type: "CardHeader",
        title: "Customer Reviews",
        description: `Page ${current} of ${pages}`,
        startElement: {
            type: "Icon",
            id: "comments",
            color: "blue",
            size: 24,
        },
    };
    // Card content holds the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Navigation buttons: Previous and Next
    const navButtons = [];
    if (current > 1) {
        navButtons.push({
            type: "Button",
            label: "Previous",
            variant: "text",
            size: "small",
            startElement: {
                type: "Icon",
                id: "arrow-left",
                size: 16,
            },
            href: `?page=${current - 1}`,
        });
    }
    if (current < pages) {
        navButtons.push({
            type: "Button",
            label: "Next",
            variant: "text",
            size: "small",
            endElement: {
                type: "Icon",
                id: "arrow-right",
                size: 16,
            },
            href: `?page=${current + 1}`,
        });
    }
    // Card footer contains navigation controls
    const cardFooter = {
        type: "CardFooter",
        childrenProps: navButtons,
    };
    // Top‐level vertical card composing header, content, and footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return verticalCard;
}
//# sourceMappingURL=33.js.map