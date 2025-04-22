export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure campaigns and pagination cursor
    const { campaigns, next } = input;
    // If there are no campaigns, render a friendly markdown message
    if (!campaigns || campaigns.length === 0) {
        return {
            type: "Markdown",
            content: "### No campaigns to display.\n\nThere are currently no marketing campaigns available."
        };
    }
    // Map each campaign to a DataListItem, showing its name and key metrics as chips
    const dataListItems = campaigns.map(campaign => {
        // Build chips for each metric if present
        const metricChips = [];
        if (campaign.sent !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.sent}`,
                color: "primary",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.view !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.view}`,
                color: "info",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.goal !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.goal}`,
                color: "success",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.click !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.click}`,
                color: "warning",
                size: "small",
                variant: "filled"
            });
        }
        // Compose the label as a Text component showing the campaign name
        const labelComponent = {
            type: "Text",
            variant: "subtitle1",
            color: "primary",
            content: campaign.name
        };
        // The DataListItem.value can be a single component or an array
        const valueComponent = metricChips.length === 1
            ? metricChips[0]
            : metricChips; // array if multiple chips
        return {
            type: "DataListItem",
            label: labelComponent,
            value: metricChips.length > 0 ? valueComponent : undefined
        };
    });
    // Wrap the items into a DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Construct the card header with an icon
    const header = {
        type: "CardHeader",
        title: "Campaigns Overview",
        startElement: {
            type: "Icon",
            id: "bullhorn",
            color: "blue",
            size: 20
        }
    };
    // Use the DataList as the card content
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // If there is a next cursor, add a "Load More" button in the footer
    let footer;
    if (next !== undefined) {
        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "Load more",
                variant: "outlined",
                color: "primary",
                size: "medium"
            }
        };
    }
    // Assemble everything into a vertical card for responsiveness on mobile
    const card = {
        type: "VerticalCard",
        // Include header, content, and conditionally footer
        childrenProps: footer ? [header, content, footer] : [header, content]
    };
    return card;
}
//# sourceMappingURL=173.js.map