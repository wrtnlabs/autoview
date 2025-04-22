export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map evaluation result to UI colors
    const statusColorMap = {
        pass: "success",
        fail: "error",
        bypass: "warning",
    };
    // CARD HEADER: shows repo, ref, who pushed, time and overall result
    const header = {
        type: "CardHeader",
        // Title: repository name and ref
        title: `${input.repository_name || "Unknown Repo"}@${input.ref || ""}`,
        // Subtitle: pushed time formatted
        description: input.pushed_at
            ? `Pushed at ${new Date(input.pushed_at).toLocaleString()}`
            : undefined,
        // Avatar for the actor (will render initials if no src)
        startElement: {
            type: "Avatar",
            name: input.actor_name || undefined,
        },
        // Overall result as a colored chip
        endElement: {
            type: "Chip",
            label: (input.result || "unknown").toUpperCase(),
            color: statusColorMap[input.result || ""] || "gray",
            size: "small",
            variant: "filled",
        },
    };
    // DATA LIST: one entry per rule evaluation
    const evaluations = input.rule_evaluations || [];
    const dataListItems = evaluations.map((rule) => {
        // Markdown label with rule type and enforcement level
        const labelMd = {
            type: "Markdown",
            content: `**${rule.rule_type || "Unknown"}** (_${rule.enforcement || "n/a"}_)`,
        };
        // Chip indicating pass/fail of this rule
        const resultChip = {
            type: "Chip",
            label: (rule.result || "unknown").toUpperCase(),
            color: statusColorMap[rule.result || ""] ||
                "gray",
            size: "small",
            variant: "filled",
        };
        // If there are details, attach a tooltip icon
        const valueChildren = [
            resultChip,
        ];
        if (rule.details) {
            const infoIcon = {
                type: "Icon",
                id: "info-circle",
                color: "gray",
                size: 16,
            };
            const tooltip = {
                type: "Tooltip",
                message: rule.details,
                childrenProps: infoIcon,
            };
            valueChildren.push(tooltip);
        }
        return {
            type: "DataListItem",
            label: labelMd,
            value: valueChildren,
        };
    });
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // CARD CONTENT: wrap the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Optionally show evaluation_result if present (e.g. "would pass/fail")
    let footer;
    if (input.evaluation_result != null) {
        const evalChip = {
            type: "Chip",
            label: `Evaluated: ${(input.evaluation_result || "").toUpperCase()}`,
            color: statusColorMap[input.evaluation_result || ""] ||
                "gray",
            size: "small",
            variant: "outlined",
        };
        footer = {
            type: "CardFooter",
            childrenProps: evalChip,
        };
    }
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };
    return card;
}
//# sourceMappingURL=862.js.map