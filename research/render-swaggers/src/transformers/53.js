export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Compose status chips summarizing member, citizen, and external-user status
    const statusChips = [];
    // Member status
    statusChips.push({
        type: "Chip",
        label: input.member ? "Member" : "Guest",
        color: input.member ? "green" : "gray",
        startElement: {
            type: "Icon",
            id: input.member ? "id-card" : "user-secret",
            color: input.member ? "green" : "gray",
            size: 16,
        },
    });
    // Citizen (real‑name) verification status
    statusChips.push({
        type: "Chip",
        label: input.citizen ? "Verified" : "Unverified",
        color: input.citizen ? "blue" : "gray",
        startElement: {
            type: "Icon",
            id: input.citizen ? "id-badge" : "exclamation-circle",
            color: input.citizen ? "blue" : "gray",
            size: 16,
        },
    });
    // External user linkage
    if (input.external_user != null) {
        statusChips.push({
            type: "Chip",
            label: "External",
            color: "orange",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                color: "orange",
                size: 16,
            },
        });
    }
    // 2. Build detailed data list (key/value pairs)
    const dataItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Customer ID",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.id,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: `${input.channel.name} (${input.channel.code})`,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "IP Address",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.ip,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Connected At",
                variant: "subtitle2",
            },
            // Format timestamp in user's locale for readability
            value: {
                type: "Text",
                content: new Date(input.created_at).toLocaleString(),
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Referrer",
                variant: "subtitle2",
            },
            // Show fallback when no referrer is available
            value: {
                type: "Text",
                content: input.referrer && input.referrer.length > 0 ? input.referrer : "None",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "URL",
                variant: "subtitle2",
            },
            // A clickable button to view the connection URL
            value: {
                type: "Button",
                variant: "text",
                label: ["Visit"],
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "blue",
                    size: 16,
                },
                href: input.href,
            },
        },
    ];
    // 3. Assemble the full card: header, content (datalist), footer (status chips)
    const cardHeader = {
        type: "CardHeader",
        title: `Customer Record`,
        description: input.channel.name,
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 32,
        },
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataItems,
        },
    };
    const cardFooter = {
        type: "CardFooter",
        // Render all status chips in a responsive layout
        childrenProps: statusChips,
    };
    // 4. Return a vertical card wrapping header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=53.js.map