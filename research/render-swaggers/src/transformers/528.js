export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map compute_service to FontAwesome icon identifiers and colors.
    const computeService = (_a = input.compute_service) !== null && _a !== void 0 ? _a : "none";
    const serviceIconMap = {
        none: { id: "ban", color: "gray" },
        actions: { id: "cogs", color: "blue" },
        codespaces: { id: "code", color: "violet" },
    };
    const { id: iconId, color: iconColor } = serviceIconMap[computeService] || serviceIconMap.none;
    // Format creation timestamp for display, or fallback to "Unknown".
    const createdOnLabel = input.created_on
        ? new Date(input.created_on).toLocaleString()
        : "Unknown";
    // Build a DataList of key fields: Created On and Compute Service.
    const dataListItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created On",
                variant: "caption",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: createdOnLabel,
                variant: "body2",
                color: "gray",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Compute Service",
                variant: "caption",
                color: "secondary",
            },
            // Visualize the compute service as an icon rather than text.
            value: {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 20,
            },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // If there are network_settings_ids, render them as a chip group.
    let footer;
    if (Array.isArray(input.network_settings_ids) && input.network_settings_ids.length > 0) {
        // Create one chip per setting ID, small and outlined.
        const chips = input.network_settings_ids.map((nid) => ({
            type: "Chip",
            label: nid,
            size: "small",
            variant: "outlined",
            color: "primary",
        }));
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 3,
        };
        footer = {
            type: "CardFooter",
            childrenProps: chipGroup,
        };
    }
    // Compose the card header with an icon and the primary network details.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.id,
        startElement: {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 28,
        },
    };
    // Compose the card content housing the DataList.
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Assemble the vertical card with header, content, and optional footer.
    const card = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };
    return card;
}
//# sourceMappingURL=528.js.map