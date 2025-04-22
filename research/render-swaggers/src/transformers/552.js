export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build header: show project name, description (body), creator avatar, and project state as a chip
    const header = {
        type: "CardHeader",
        title: input.name,
        // If body is empty or null, omit description
        description: (_a = input.body) !== null && _a !== void 0 ? _a : "",
        startElement: {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
            size: 40,
        },
        endElement: {
            type: "Chip",
            label: input.state,
            color: input.state.toLowerCase() === "open" ? "success" : "error",
            variant: "filled",
            size: "small",
        },
    };
    // Build a list of project metadata
    const listItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.id.toString(),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Number",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.number.toString(),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Creator",
                variant: "subtitle2",
            },
            // Show the creator avatar as the value
            value: {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                size: 32,
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
                content: new Date(input.created_at).toLocaleString(),
                variant: "body1",
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
                content: new Date(input.updated_at).toLocaleString(),
                variant: "body1",
            },
        },
        // Show public/private status only if the field is present
        ...(typeof input["private"] === "boolean"
            ? [
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        content: "Private",
                        variant: "subtitle2",
                    },
                    value: {
                        type: "Chip",
                        label: input["private"] ? "Yes" : "No",
                        color: input["private"] ? "error" : "success",
                        variant: "filled",
                        size: "small",
                    },
                },
            ]
            : []),
        // Permissions group
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Permissions",
                variant: "subtitle2",
            },
            value: {
                type: "ChipGroup",
                childrenProps: [
                    {
                        type: "Chip",
                        label: "Read",
                        color: input.permissions.read ? "success" : "gray",
                        variant: "outlined",
                        size: "small",
                    },
                    {
                        type: "Chip",
                        label: "Write",
                        color: input.permissions.write ? "success" : "gray",
                        variant: "outlined",
                        size: "small",
                    },
                    {
                        type: "Chip",
                        label: "Admin",
                        color: input.permissions.admin ? "success" : "gray",
                        variant: "outlined",
                        size: "small",
                    },
                ],
                maxItems: 3,
            },
        },
    ];
    // Build the main content: a data list of metadata
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // Build footer: action buttons linking to GitHub and project columns
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: "View on GitHub",
                href: input.html_url,
                variant: "outlined",
                size: "medium",
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 16,
                    color: "gray",
                },
            },
            {
                type: "Button",
                label: "View Columns",
                href: input.columns_url,
                variant: "outlined",
                size: "medium",
                startElement: {
                    type: "Icon",
                    id: "columns",
                    size: 16,
                    color: "gray",
                },
            },
        ],
    };
    // Compose everything in a vertical card for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=552.js.map