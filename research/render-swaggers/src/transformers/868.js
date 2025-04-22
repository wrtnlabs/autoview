export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Helper: safely format ISO dates into locale strings
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Map alert state to icon and color for header
    const stateIcon = input.state === "resolved" ? "check-circle" : "exclamation-triangle";
    const stateColor = input.state === "resolved" ? "green" : "yellow";
    // Build the header for the card: shows alert number and secret type
    const header = {
        type: "CardHeader",
        title: `Alert #${(_a = input.number) !== null && _a !== void 0 ? _a : "?"}`,
        description: (_c = (_b = input.secret_type_display_name) !== null && _b !== void 0 ? _b : input.secret_type) !== null && _c !== void 0 ? _c : "Unknown secret",
        // Start icon indicating open vs resolved
        startElement: {
            type: "Icon",
            id: stateIcon,
            color: stateColor,
            size: 20,
        },
    };
    // Prepare a list of detailed fields
    const listItems = [];
    // Created at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Created At",
            variant: "subtitle2",
            color: "gray",
        },
        value: {
            type: "Text",
            content: formatDate(input.created_at),
            variant: "body2",
        },
    });
    // Updated at
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Last Updated",
            variant: "subtitle2",
            color: "gray",
        },
        value: {
            type: "Text",
            content: formatDate(input.updated_at),
            variant: "body2",
        },
    });
    // Resolution
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Resolution",
            variant: "subtitle2",
            color: "gray",
        },
        value: {
            type: "Chip",
            label: (_d = input.resolution) !== null && _d !== void 0 ? _d : "none",
            color: input.resolution ? "primary" : "gray",
            size: "small",
            variant: "outlined",
        },
    });
    // Resolved by (if available)
    if (input.resolved_by && typeof input.resolved_by === "object") {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Resolved By",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Avatar",
                src: input.resolved_by.avatar_url,
                name: input.resolved_by.login,
                size: 32,
                variant: "info",
            },
        });
    }
    // Publicly leaked?
    if (input.publicly_leaked !== undefined && input.publicly_leaked !== null) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Publicly Leaked",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: input.publicly_leaked ? "Yes" : "No",
                variant: "body2",
            },
        });
    }
    // Multi-repo occurrence?
    if (input.multi_repo !== undefined && input.multi_repo !== null) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Multi-Repo",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: input.multi_repo ? "Yes" : "No",
                variant: "body2",
            },
        });
    }
    // Location details button (link to code locations)
    if (input.locations_url) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Locations",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Button",
                label: "View Locations",
                href: input.locations_url,
                variant: "outlined",
                size: "small",
                color: "primary",
            },
        });
    }
    // Build the content section as a DataList
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // Footer: link to the alert's GitHub page
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: (_e = input.html_url) !== null && _e !== void 0 ? _e : "",
            variant: "text",
            size: "medium",
            color: "secondary",
        },
    };
    // Compose a vertical card to display everything
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=868.js.map