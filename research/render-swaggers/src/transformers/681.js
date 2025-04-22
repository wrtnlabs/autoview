export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    //
    // 1. Build the card header which shows the overall state (configured vs not-configured)
    //
    const header = {
        type: "CardHeader",
        title: "Code Scanning Setup",
        // An icon that conveys the state at a glance
        startElement: {
            type: "Icon",
            id: input.state === "configured" ? "check-circle" : "exclamation-circle",
            color: input.state === "configured" ? "green" : "red",
            size: 24,
        },
        // A colored chip summarizing the state
        endElement: {
            type: "Chip",
            label: input.state === "configured" ? "Configured" : "Not Configured",
            color: input.state === "configured" ? "green" : "red",
            size: "small",
            variant: "filled",
        },
    };
    //
    // 2. Assemble a list of key/value pairs for the details
    //
    const items = [];
    // Languages
    if (input.languages && input.languages.length > 0) {
        const chips = input.languages.map((lang) => ({
            type: "Chip",
            label: lang,
            size: "small",
            variant: "outlined",
            color: "blue",
        }));
        items.push({
            type: "DataListItem",
            label: { type: "Text", variant: "body2", content: "Languages" },
            value: { type: "ChipGroup", childrenProps: chips },
        });
    }
    // Runner type (and optional runner label)
    if (input.runner_type) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", variant: "body2", content: "Runner Type" },
            value: {
                type: "Chip",
                label: input.runner_type,
                size: "small",
                variant: "outlined",
                color: "teal",
            },
        });
        if (input.runner_type === "labeled" && input.runner_label) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", variant: "body2", content: "Runner Label" },
                value: { type: "Text", variant: "body2", content: input.runner_label },
            });
        }
    }
    // Query suite
    if (input.query_suite) {
        const display = input.query_suite === "default" ? "Default" : "Extended";
        items.push({
            type: "DataListItem",
            label: { type: "Text", variant: "body2", content: "Query Suite" },
            value: {
                type: "Chip",
                label: display,
                size: "small",
                variant: "outlined",
                color: "violet",
            },
        });
    }
    // Schedule
    if (input.schedule) {
        const display = input.schedule === "weekly" ? "Weekly" : input.schedule;
        items.push({
            type: "DataListItem",
            label: { type: "Text", variant: "body2", content: "Schedule" },
            value: {
                type: "Chip",
                label: display,
                size: "small",
                variant: "outlined",
                color: "cyan",
            },
        });
    }
    // Last updated timestamp
    if (input.updated_at) {
        // Convert ISO string into a user‑friendly locale string
        const dateStr = new Date(input.updated_at).toLocaleString();
        items.push({
            type: "DataListItem",
            label: { type: "Text", variant: "body2", content: "Last Updated" },
            value: { type: "Text", variant: "caption", content: dateStr },
        });
    }
    //
    // 3. Wrap all detail items in a DataList, then put it into CardContent
    //
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    //
    // 4. Compose the vertical card
    //
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=681.js.map