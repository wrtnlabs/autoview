export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to format ISO date strings into a more readable form
    const formatDate = (iso) => new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    // Build the avatar or fallback icon for the creator
    const creatorElement = input.creator
        ? {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
            size: 32,
            variant: "primary",
        }
        : {
            type: "Icon",
            id: "user",
            size: 24,
            color: "gray",
        };
    // A chip indicating the milestone state
    const stateChip = {
        type: "Chip",
        label: input.state === "open" ? "Open" : "Closed",
        variant: "filled",
        color: input.state === "open" ? "success" : "error",
        size: "small",
    };
    // Assemble a list of key milestone details using a DataList
    const dataListItems = [];
    // Milestone number
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Number", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.number.toString(),
            variant: "filled",
            color: "secondary",
            size: "small",
        },
    });
    // Open issues count
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Open issues", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.open_issues.toString(),
            variant: "filled",
            color: "warning",
            size: "small",
        },
    });
    // Closed issues count
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Closed issues", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.closed_issues.toString(),
            variant: "filled",
            color: "success",
            size: "small",
        },
    });
    // Creation date
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created at", variant: "subtitle2" },
        value: { type: "Text", content: formatDate(input.created_at), variant: "body2" },
    });
    // Due date (optional)
    if (input.due_on) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Due on", variant: "subtitle2" },
            value: { type: "Text", content: formatDate(input.due_on), variant: "body2" },
        });
    }
    // Wrap items in a DataList component
    const detailsList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Header section with title, description, avatar, and state chip
    const header = {
        type: "CardHeader",
        title: input.title,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
        startElement: creatorElement,
        endElement: stateChip,
    };
    // Content section holding the details list
    const content = {
        type: "CardContent",
        childrenProps: detailsList,
    };
    // Footer with a button linking to GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 16,
            },
        },
    };
    // Compose the full vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=808.js.map