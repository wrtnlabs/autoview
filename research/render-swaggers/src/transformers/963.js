export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub org membership into a visual card layout
function visualizeData(input) {
    var _a;
    // Build list items to describe the membership
    const items = [];
    // 1) User: show avatar + login or N/A
    if (input.user) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "User" },
            value: [
                {
                    type: "Avatar",
                    src: input.user.avatar_url,
                    name: input.user.login,
                    size: 32
                },
                {
                    type: "Text",
                    content: input.user.login
                }
            ]
        });
    }
    else {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "User" },
            value: { type: "Text", content: "N/A" }
        });
    }
    // 2) Role: map to colored chip for quick recognition
    const roleColor = input.role === "admin"
        ? "primary"
        : input.role === "member"
            ? "info"
            : "secondary";
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Role" },
        value: { type: "Chip", label: input.role, color: roleColor }
    });
    // 3) State: active → green, pending → yellow
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Status" },
        value: {
            type: "Chip",
            label: input.state,
            color: input.state === "active" ? "success" : "warning"
        }
    });
    // 4) Membership URL: clickable link via markdown
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Membership URL" },
        value: {
            type: "Markdown",
            content: `[View Membership](${input.url})`
        }
    });
    // 5) Permissions: show icon indicating create‐repo capability
    if (input.permissions && typeof input.permissions.can_create_repository === "boolean") {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Can Create Repo" },
            value: {
                type: "Icon",
                id: input.permissions.can_create_repository
                    ? "check-circle"
                    : "times-circle",
                color: input.permissions.can_create_repository ? "green" : "red",
                size: 16
            }
        });
    }
    // Wrap the items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Header for the organization: logo + name + description
    const header = {
        type: "CardHeader",
        title: input.organization.login,
        description: (_a = input.organization.description) !== null && _a !== void 0 ? _a : undefined,
        startElement: {
            type: "Avatar",
            src: input.organization.avatar_url,
            name: input.organization.login,
            size: 40
        }
    };
    // Main content: our data list
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Footer: action button to open the organization page
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Org",
            href: input.organization_url,
            variant: "outlined",
            color: "primary"
        }
    };
    // Combine into a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=963.js.map