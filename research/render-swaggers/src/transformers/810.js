export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input milestone fields for clarity
    const { title, description, number, state, open_issues, closed_issues, created_at, updated_at, due_on, html_url, labels_url, creator, } = input;
    // Helper: map milestone state to a Chip color
    const stateColor = state === "closed" ? "success" : "info";
    // Helper: format ISO timestamps into locale strings (or null)
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : null;
    const createdAt = formatDate(created_at);
    const updatedAt = formatDate(updated_at);
    const dueDate = formatDate(due_on);
    // Build a list of DataListItem components to show milestone metadata
    const dataListItems = [];
    // 1) Milestone number and title
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: `Milestone #${number}` },
        value: { type: "Text", content: title },
    });
    // 2) Created At
    if (createdAt) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: createdAt },
        });
    }
    // 3) Updated At
    if (updatedAt) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: updatedAt },
        });
    }
    // 4) Due On
    if (dueDate) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Due On" },
            value: { type: "Text", content: dueDate },
        });
    }
    // 5) Open Issues count with an icon badge
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Open Issues" },
        value: {
            type: "Badge",
            count: open_issues,
            maxCount: 999,
            childrenProps: { type: "Icon", id: "exclamation-circle" },
        },
    });
    // 6) Closed Issues count with an icon badge
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Closed Issues" },
        value: {
            type: "Badge",
            count: closed_issues,
            maxCount: 999,
            childrenProps: { type: "Icon", id: "check-circle" },
        },
    });
    // Compose the card header
    const header = Object.assign(Object.assign({ type: "CardHeader", title }, (description != null && { description })), { 
        // show the creator avatar or a fallback icon
        startElement: creator
            ? {
                type: "Avatar",
                src: creator.avatar_url,
                name: creator.login,
                size: 40,
            }
            : {
                type: "Icon",
                id: "user-circle",
                size: 40,
            }, 
        // show milestone state as a colored chip
        endElement: {
            type: "Chip",
            label: state.toUpperCase(),
            color: stateColor,
            variant: "filled",
        } });
    // Wrap the DataList in CardContent
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Action buttons in the card footer
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "View on GitHub",
                variant: "outlined",
                color: "primary",
                href: html_url,
                startElement: { type: "Icon", id: "github", size: 20 },
            },
            {
                type: "Button",
                label: "View Labels",
                variant: "outlined",
                color: "primary",
                href: labels_url,
                startElement: { type: "Icon", id: "tag", size: 20 },
            },
        ],
    };
    // Assemble the final VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=810.js.map