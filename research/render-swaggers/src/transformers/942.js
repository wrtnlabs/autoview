export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper: map codespace state to a chip color for consistent UI
    const stateColorMap = {
        Available: "success",
        Provisioning: "warning",
        Queued: "info",
        Deleted: "error",
        Shutdown: "secondary",
        Unknown: "gray",
        Failed: "error",
        Starting: "info",
        ShuttingDown: "warning",
        Archived: "gray",
        Awaiting: "info",
        Moved: "secondary",
        Exporting: "teal",
        Updating: "orange",
        Rebuilding: "yellow",
    };
    const chipColor = (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : "gray";
    // Card header: show avatar, name/display_name, and state chip
    const header = {
        type: "CardHeader",
        title: (_b = input.display_name) !== null && _b !== void 0 ? _b : input.name,
        description: input.state,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            variant: "primary",
            size: 40,
        },
        endElement: {
            type: "Chip",
            label: input.state,
            variant: "filled",
            color: chipColor,
            size: "small",
        },
    };
    // Build a list of key-value pairs for core codespace fields
    const items = [];
    // Utility to create Text component
    const text = (content) => ({
        type: "Text",
        content,
        variant: "body2",
    });
    // ID
    items.push({
        type: "DataListItem",
        label: [text("ID")],
        value: text(String(input.id)),
    });
    // Owner
    items.push({
        type: "DataListItem",
        label: [text("Owner")],
        value: {
            type: "Chip",
            label: input.owner.login,
            startElement: {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 20,
                variant: "secondary",
            },
            variant: "filled",
            color: "teal",
            size: "small",
        },
    });
    // Repository link
    items.push({
        type: "DataListItem",
        label: [text("Repository")],
        value: {
            type: "Button",
            label: ["Open Repo"],
            href: input.repository.html_url,
            variant: "text",
            color: "primary",
            startElement: { type: "Icon", id: "github", size: 16, color: "gray" },
        },
    });
    // Created at
    items.push({
        type: "DataListItem",
        label: [text("Created")],
        value: text(new Date(input.created_at).toLocaleString()),
    });
    // Last used at
    items.push({
        type: "DataListItem",
        label: [text("Last Used")],
        value: text(new Date(input.last_used_at).toLocaleString()),
    });
    // Machine spec summary (if present)
    if (input.machine) {
        const m = input.machine;
        items.push({
            type: "DataListItem",
            label: [text("Machine")],
            value: {
                type: "Text",
                content: `${m.display_name} / ${Math.round(m.storage_in_bytes / (1024 ** 3))}GB`,
                variant: "body2",
            },
        });
    }
    // Idle timeout (if set)
    if (input.idle_timeout_minutes != null) {
        items.push({
            type: "DataListItem",
            label: [text("Idle Timeout")],
            value: text(`${input.idle_timeout_minutes} min`),
        });
    }
    // Compose DataList in card content
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };
    // Footer: show any notices via markdown for clarity
    const footerChildren = [];
    if (input.idle_timeout_notice) {
        footerChildren.push({
            type: "Markdown",
            content: `**Note:** ${input.idle_timeout_notice}`,
        });
    }
    if (input.last_known_stop_notice) {
        footerChildren.push({
            type: "Markdown",
            content: `**Stopped Reason:** ${input.last_known_stop_notice}`,
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren.length > 0 ? footerChildren : undefined,
    };
    // Final Vertical Card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=942.js.map