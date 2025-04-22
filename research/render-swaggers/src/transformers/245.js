export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { manager, online } = input;
    // If there's no manager data, render a simple markdown informing the user
    if (!manager) {
        return {
            type: "Markdown",
            content: "### No manager data available\nPlease check back later or contact support."
        };
    }
    // Build the card header: show avatar if available, otherwise a generic user icon
    const header = {
        type: "CardHeader",
        title: manager.name,
        description: manager.showDescriptionToFront === false ? undefined : manager.description,
        startElement: manager.avatarUrl
            ? {
                type: "Avatar",
                src: manager.avatarUrl,
                name: manager.name,
                variant: "primary",
                size: 40
            }
            : {
                type: "Icon",
                id: "user-circle",
                size: 40,
                color: "gray"
            },
        // If the manager is currently online, show a status chip
        endElement: online
            ? {
                type: "Chip",
                label: "Online",
                color: "success",
                size: "small",
                variant: "filled"
            }
            : undefined
    };
    // Prepare a list of data items (email, phone, role)
    const dataItems = [];
    // Email row
    if (manager.email) {
        dataItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "envelope",
                    size: 16,
                    color: "gray"
                },
                {
                    type: "Text",
                    content: "Email",
                    variant: "caption",
                    color: "gray"
                }
            ],
            value: {
                type: "Text",
                content: manager.email,
                variant: "body2"
            }
        });
    }
    // Mobile number row
    if (manager.mobileNumber) {
        dataItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "phone",
                    size: 16,
                    color: "gray"
                },
                {
                    type: "Text",
                    content: "Phone",
                    variant: "caption",
                    color: "gray"
                }
            ],
            value: {
                type: "Text",
                content: manager.mobileNumber,
                variant: "body2"
            }
        });
    }
    // Role row
    if (manager.roleId) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Role",
                variant: "caption",
                color: "gray"
            },
            value: {
                type: "Chip",
                label: manager.roleId,
                variant: "outlined",
                color: "secondary",
                size: "small"
            }
        });
    }
    // If there are no details to show, inform the user via markdown
    const contentChildren = dataItems.length
        ? { type: "DataList", childrenProps: dataItems }
        : {
            type: "Markdown",
            content: "_No additional details available._"
        };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: contentChildren }
        ]
    };
    return card;
}
//# sourceMappingURL=245.js.map