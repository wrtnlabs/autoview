export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build the header: show the ruleset name, its source, and an icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.source_type
            ? `${input.source_type} · ${input.source}`
            : input.source,
        // A gear icon to represent settings/rules
        startElement: {
            type: "Icon",
            id: "cogs",
            color: "blue",
            size: 24,
        },
    };
    // Helper to build a DataListItem (label–value pair)
    const makeListItem = (labelText, valueText) => ({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: labelText,
                variant: "body2",
                color: "gray",
            },
        ],
        value: [
            {
                type: "Text",
                content: valueText,
                variant: "body1",
                color: "primary",
            },
        ],
    });
    // Gather core fields into a DataList
    const items = [
        makeListItem("ID", String(input.id)),
        makeListItem("Target", (_a = input.target) !== null && _a !== void 0 ? _a : "—"),
        makeListItem("Enforcement", input.enforcement),
    ];
    // Optional fields
    if (input.current_user_can_bypass !== undefined) {
        items.push(makeListItem("Your Bypass Permission", input.current_user_can_bypass));
    }
    if (Array.isArray(input.rules)) {
        items.push(makeListItem("Rules", String(input.rules.length)));
    }
    if (input.conditions !== undefined) {
        // conditions might be any type; just indicate presence
        const condLabel = input.conditions === null ? "No conditions" : "Has conditions";
        items.push(makeListItem("Conditions", condLabel));
    }
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    const content = {
        type: "CardContent",
        // wrap DataList in an array to satisfy childrenProps[]
        childrenProps: [dataList],
    };
    // Build chips for bypass actors if any
    let footerChildren;
    if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
        const chips = input.bypass_actors.map((actor) => ({
            type: "Chip",
            label: actor.actor_type + (actor.actor_id ? ` (${actor.actor_id})` : ""),
            size: "small",
            // color actors by mode if available
            color: actor.bypass_mode === "always"
                ? "green"
                : actor.bypass_mode === "pull_request"
                    ? "blue"
                    : "gray",
            variant: "outlined",
        }));
        footerChildren = {
            type: "ChipGroup",
            childrenProps: chips,
            // show up to 5 chips, rest collapse into "+n"
            maxItems: 5,
        };
    }
    else {
        // no bypass actors: display a friendly markdown notice
        footerChildren = {
            type: "Markdown",
            content: "_No bypass actors defined._",
        };
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble final VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=514.js.map