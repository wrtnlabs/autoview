export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a list of key/value pairs to display as a data list
    const dataListItems = [];
    // Helper to add an item if the value is defined
    const addItem = (labelText, valueComponent) => {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: labelText,
            },
            value: valueComponent,
        });
    };
    // ID
    addItem("ID", {
        type: "Text",
        content: String(input.id),
    });
    // Primary URL as markdown link
    addItem("URL", {
        type: "Markdown",
        content: `[Link](${input.url})`,
    });
    // Ping URL
    addItem("Ping URL", {
        type: "Markdown",
        content: `[Ping](${input.ping_url})`,
    });
    // Optional deliveries URL
    if (input.deliveries_url) {
        addItem("Deliveries", {
            type: "Markdown",
            content: `[Events](${input.deliveries_url})`,
        });
    }
    // Hook type field
    addItem("Hook Type", {
        type: "Text",
        content: input.type,
    });
    // Active status displayed as a colored chip
    addItem("Active", {
        type: "Chip",
        label: input.active ? "Yes" : "No",
        color: input.active ? "green" : "red",
        variant: "filled",
        size: "small",
    });
    // Configuration: show only non-sensitive fields
    if (input.config.url) {
        addItem("Config URL", {
            type: "Markdown",
            content: `[\`${input.config.url}\`](${input.config.url})`,
        });
    }
    if (input.config.content_type) {
        addItem("Content-Type", {
            type: "Text",
            content: input.config.content_type,
        });
    }
    if (input.config.insecure_ssl !== undefined) {
        addItem("Insecure SSL", {
            type: "Text",
            content: input.config.insecure_ssl,
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Build a chip group for events
    const eventsChips = input.events.length > 0
        ? input.events.map((evt) => ({
            type: "Chip",
            label: evt,
            color: "info",
            size: "small",
            variant: "outlined",
        }))
        : [
            {
                type: "Chip",
                label: "No Events",
                color: "gray",
                size: "small",
                variant: "outlined",
            },
        ];
    const eventsChipGroup = {
        type: "ChipGroup",
        childrenProps: eventsChips,
    };
    // Card content holds the data list and the events chips
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList, eventsChipGroup],
    };
    // Card header with name, descriptive hook type, and active/inactive icon
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: `GitHub Org Hook`,
        startElement: {
            type: "Icon",
            id: input.active ? "toggle-on" : "toggle-off",
            color: input.active ? "green" : "gray",
            size: 20,
        },
    };
    // Footer shows created and updated timestamps via markdown
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Markdown",
            content: `**Created:** ${new Date(input.created_at).toLocaleString()}\n**Updated:** ${new Date(input.updated_at).toLocaleString()}`,
        },
    };
    // Assemble into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=451.js.map