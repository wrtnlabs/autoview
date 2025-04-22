export function transform($input) {
    return visualizeData($input);
}
// Transforms a repository_ruleset into a visual representation using AutoView components.
function visualizeData(input) {
    var _a, _b;
    // Helper to create a simple text component
    const makeText = (content, variant = "body2") => ({
        type: "Text",
        content: content,
        variant,
    });
    // Helper to choose a chip color based on enforcement level
    const enforcementColor = () => {
        switch (input.enforcement) {
            case "active":
                return "success";
            case "evaluate":
                return "warning";
            case "disabled":
            default:
                return "error";
        }
    };
    // Build list of DataListItemProps
    const listItems = [];
    // Target of the ruleset
    if (input.target) {
        listItems.push({
            type: "DataListItem",
            label: makeText("Target", "subtitle2"),
            value: {
                type: "Chip",
                label: input.target,
                variant: "filled",
                color: "info",
            },
        });
    }
    // Source type (Repository, Organization, Enterprise)
    if (input.source_type) {
        listItems.push({
            type: "DataListItem",
            label: makeText("Source Type", "subtitle2"),
            value: {
                type: "Chip",
                label: input.source_type,
                variant: "outlined",
                color: "primary",
            },
        });
    }
    // Source name
    if (input.source) {
        listItems.push({
            type: "DataListItem",
            label: makeText("Source", "subtitle2"),
            value: makeText(input.source),
        });
    }
    // Enforcement level
    listItems.push({
        type: "DataListItem",
        label: makeText("Enforcement", "subtitle2"),
        value: {
            type: "Chip",
            label: input.enforcement,
            variant: "filled",
            color: enforcementColor(),
        },
    });
    // Bypass actors
    if (input.bypass_actors && input.bypass_actors.length > 0) {
        const actorChips = input.bypass_actors.map((actor) => ({
            type: "Chip",
            label: actor.actor_type + (actor.bypass_mode ? ` (${actor.bypass_mode})` : ""),
            variant: "outlined",
            color: "secondary",
        }));
        listItems.push({
            type: "DataListItem",
            label: makeText("Bypass Actors", "subtitle2"),
            value: {
                type: "ChipGroup",
                childrenProps: actorChips,
            },
        });
    }
    // Current user bypass capability
    if (input.current_user_can_bypass) {
        listItems.push({
            type: "DataListItem",
            label: makeText("You Can Bypass", "subtitle2"),
            value: {
                type: "Chip",
                label: input.current_user_can_bypass,
                variant: "filled",
                color: "teal",
            },
        });
    }
    // Links (if HTML link provided)
    const htmlHref = (_b = (_a = input._links) === null || _a === void 0 ? void 0 : _a.html) === null || _b === void 0 ? void 0 : _b.href;
    if (htmlHref) {
        listItems.push({
            type: "DataListItem",
            label: makeText("View Online", "subtitle2"),
            value: {
                type: "Button",
                label: "Open Ruleset",
                href: htmlHref,
                variant: "outlined",
                size: "small",
                color: "primary",
            },
        });
    }
    // Creation and update timestamps
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: makeText("Created At", "subtitle2"),
            value: makeText(new Date(input.created_at).toLocaleString()),
        });
    }
    if (input.updated_at) {
        listItems.push({
            type: "DataListItem",
            label: makeText("Updated At", "subtitle2"),
            value: makeText(new Date(input.updated_at).toLocaleString()),
        });
    }
    // Assemble the DataList component
    const detailsList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header with icon, title, and ID
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "cog",
            size: 32,
            color: "blue",
        },
    };
    // Card content wraps the DataList
    const content = {
        type: "CardContent",
        childrenProps: detailsList,
    };
    // Final vertical card assembly
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=860.js.map