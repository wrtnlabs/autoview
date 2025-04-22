export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: pick an icon based on the check run status and conclusion
    function getStatusIcon() {
        let iconId = "question-circle";
        let color = "gray";
        switch (input.status) {
            case "completed":
                if (input.conclusion === "success") {
                    iconId = "check-circle";
                    color = "green";
                }
                else if (input.conclusion === "failure" || input.conclusion === "cancelled" || input.conclusion === "timed_out") {
                    iconId = "times-circle";
                    color = "red";
                }
                else {
                    iconId = "minus-circle";
                    color = "orange";
                }
                break;
            case "in_progress":
            case "pending":
            case "requested":
            case "waiting":
                iconId = "hourglass-half";
                color = "yellow";
                break;
            case "queued":
                iconId = "clock";
                color = "blue";
                break;
        }
        return {
            type: "Icon",
            id: iconId,
            size: 24,
            color,
        };
    }
    // Build a list of key-value items to display in a DataList
    const dataListItems = [];
    // Utility to push a text item
    function pushTextItem(label, value) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: [label + ":"],
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: [String(value)],
                variant: "body2",
            },
        });
    }
    // Status and conclusion
    pushTextItem("Status", input.status);
    if (input.conclusion !== null) {
        pushTextItem("Conclusion", input.conclusion);
    }
    // Timestamps
    if (input.started_at) {
        pushTextItem("Started", new Date(input.started_at).toLocaleString());
    }
    if (input.completed_at) {
        pushTextItem("Completed", new Date(input.completed_at).toLocaleString());
    }
    // Check run URLs as buttons
    if (input.html_url) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: ["View Check Run:"],
                variant: "subtitle2",
            },
            value: {
                type: "Button",
                label: "Open in GitHub",
                href: input.html_url,
                variant: "text",
                color: "primary",
                size: "small",
            },
        });
    }
    if (input.details_url) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: ["Details URL:"],
                variant: "subtitle2",
            },
            value: {
                type: "Button",
                label: "More Details",
                href: input.details_url,
                variant: "outlined",
                color: "secondary",
                size: "small",
            },
        });
    }
    // Annotations count
    if (typeof input.output.annotations_count === "number") {
        pushTextItem("Annotations", input.output.annotations_count);
    }
    // Pull requests: show as chips
    let prChipGroup;
    if (Array.isArray(input.pull_requests) && input.pull_requests.length > 0) {
        const chips = input.pull_requests.map(pr => ({
            type: "Chip",
            label: `#${pr.number}`,
            variant: "outlined",
            size: "small",
        }));
        prChipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 5,
        };
    }
    // Build the main card
    const children = [];
    // Card header: show check-run name, id, and status icon
    children.push({
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: getStatusIcon(),
    });
    // Card content: show summary or fallback markdown, then the data list
    const contentChildren = [];
    if (input.output.summary) {
        // Render the summary as markdown for better responsiveness and formatting
        contentChildren.push({
            type: "Markdown",
            content: `**Summary**\n\n${input.output.summary}`,
        });
    }
    // Always include the data list if we have items
    if (dataListItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: dataListItems,
        });
    }
    else {
        // Fallback text if no detail items
        contentChildren.push({
            type: "Text",
            content: ["No additional details available."],
            variant: "body2",
        });
    }
    children.push({
        type: "CardContent",
        childrenProps: contentChildren,
    });
    // Card footer: pull requests if any
    if (prChipGroup) {
        children.push({
            type: "CardFooter",
            childrenProps: prChipGroup,
        });
    }
    // Return a vertical card for responsive layout on mobile and desktop
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=659.js.map