export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build status chips for membership, verification, and external user
    const statusChips = [];
    if (input.member) {
        statusChips.push({
            type: "Chip",
            label: "Member",
            variant: "filled",
            color: "success",
        });
    }
    else {
        statusChips.push({
            type: "Chip",
            label: "Guest",
            variant: "filled",
            color: "gray",
        });
    }
    if (input.citizen) {
        statusChips.push({
            type: "Chip",
            label: "Verified",
            variant: "outlined",
            color: "primary",
        });
    }
    if (input.external_user) {
        statusChips.push({
            type: "Chip",
            label: "External",
            variant: "outlined",
            color: "info",
        });
    }
    // Compose the key/value list of properties to display
    const connectionDetails = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Connected At",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.created_at,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: `${input.channel.name} (${input.channel.code})`,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "IP Address",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.ip,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Referrer",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.referrer || "—",
                variant: "body2",
            },
        },
    ];
    // Header: show a user icon and the connection ID
    const header = {
        type: "CardHeader",
        title: `Connection ${input.id}`,
        description: input.id,
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 24,
        },
    };
    // Main content: a DataList of details, followed by a ChipGroup of statuses
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: connectionDetails,
            },
            {
                type: "ChipGroup",
                childrenProps: statusChips,
            },
        ],
    };
    // Optional footer: a button to open the connection href
    const footer = input.href
        ? {
            type: "CardFooter",
            childrenProps: [
                {
                    type: "Button",
                    label: "Visit Site",
                    href: input.href,
                    startElement: {
                        type: "Icon",
                        id: "external-link-alt",
                        size: 20,
                        color: "cyan",
                    },
                    variant: "outlined",
                    color: "primary",
                },
            ],
        }
        : null;
    // Build the vertical card; omit footer if no href
    const children = [header, content];
    if (footer) {
        children.push(footer);
    }
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=52.js.map