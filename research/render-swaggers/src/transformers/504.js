export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // 1. Prepare the card header with project name, description, creator avatar, and state chip
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.body) !== null && _a !== void 0 ? _a : "",
        startElement: input.creator
            ? {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                variant: "primary",
                size: 40
            }
            : undefined,
        endElement: {
            type: "Chip",
            label: input.state,
            color: input.state === "open" ? "success" : "error",
            variant: "filled",
            size: "small"
        }
    };
    // 2. Build a series of DataListItem components to display key fields
    const listItems = [];
    // Utility to push a text-based list item
    const pushTextItem = (label, value) => {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: label, variant: "subtitle2" }],
            value: { type: "Text", content: value, variant: "body2" }
        });
    };
    pushTextItem("ID", String(input.id));
    pushTextItem("Number", String(input.number));
    pushTextItem("Created At", new Date(input.created_at).toLocaleString());
    pushTextItem("Updated At", new Date(input.updated_at).toLocaleString());
    if (input.creator) {
        // Show creator as an avatar
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Creator", variant: "subtitle2" }],
            value: {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                size: 32,
                variant: "primary"
            }
        });
    }
    // Link to the GitHub project page
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Project Page", variant: "subtitle2" }],
        value: {
            type: "Button",
            label: "View",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
            startElement: { type: "Icon", id: "arrow-right", color: "blue", size: 16 }
        }
    });
    // Link to the project's columns
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Columns", variant: "subtitle2" }],
        value: {
            type: "Button",
            label: "Go",
            href: input.columns_url,
            variant: "text",
            color: "secondary",
            startElement: { type: "Icon", id: "columns", color: "cyan", size: 16 }
        }
    });
    // API endpoint for the project owner
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Owner API", variant: "subtitle2" }],
        value: {
            type: "Button",
            label: "API",
            href: input.owner_url,
            variant: "text",
            color: "teal",
            startElement: { type: "Icon", id: "link", color: "teal", size: 16 }
        }
    });
    // Organization permission badge
    if (input.organization_permission) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Org Permission", variant: "subtitle2" }],
            value: {
                type: "Chip",
                label: input.organization_permission,
                color: "info",
                variant: "outlined",
                size: "small"
            }
        });
    }
    // Private flag indicator
    if (input["private"] !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Private", variant: "subtitle2" }],
            value: {
                type: "Chip",
                label: input["private"] ? "Yes" : "No",
                color: input["private"] ? "error" : "success",
                variant: "filled",
                size: "small"
            }
        });
    }
    // 3. Wrap all items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // 4. Footer with a primary action to open the project in GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "Open in GitHub",
                href: input.html_url,
                variant: "contained",
                color: "primary",
                startElement: { type: "Icon", id: "github", color: "gray", size: 20 }
            }
        ]
    };
    // 5. Return a vertical card combining header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=504.js.map