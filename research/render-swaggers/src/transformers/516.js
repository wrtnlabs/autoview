export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Build header start element: GitHub avatar if actor_id is known, otherwise a generic user icon
    const startElement = input.actor_id
        ? {
            type: "Avatar",
            src: `https://avatars.githubusercontent.com/u/${input.actor_id}`,
            name: input.actor_name || "",
            variant: "gray",
            size: 32,
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 24,
        };
    // Repository title and descriptive text
    const title = input.repository_name || "Repository";
    const before = (_a = input.before_sha) === null || _a === void 0 ? void 0 : _a.slice(0, 7);
    const after = (_b = input.after_sha) === null || _b === void 0 ? void 0 : _b.slice(0, 7);
    const descParts = [`${input.actor_name || "Unknown user"} pushed`];
    if (before && after)
        descParts.push(`from ${before}`, `to ${after}`);
    if (input.ref)
        descParts.push(`on ${input.ref}`);
    const description = descParts.join(" ");
    // Footer end element: timestamp with a clock icon
    const formattedDate = input.pushed_at ? new Date(input.pushed_at).toLocaleString() : "";
    const endElement = {
        type: "Text",
        variant: "caption",
        color: "gray",
        content: [
            { type: "Icon", id: "clock", size: 12, color: "gray" },
            ` ${formattedDate}`,
        ],
    };
    const cardHeader = {
        type: "CardHeader",
        title,
        description,
        startElement,
        endElement,
    };
    // Build a DataList of rule evaluations
    const evals = input.rule_evaluations || [];
    const dataListItems = evals.map((ev) => {
        var _a;
        const labelText = ((_a = ev.rule_source) === null || _a === void 0 ? void 0 : _a.name) || ev.rule_type || "Unknown rule";
        const label = {
            type: "Text",
            variant: "body2",
            content: labelText,
        };
        // Icon for pass/fail
        const passed = ev.result === "pass";
        const resultIcon = {
            type: "Icon",
            id: passed ? "check-circle" : "times-circle",
            color: passed ? "green" : "red",
            size: 16,
        };
        // If failed and has details, add a tooltip
        const valueComponents = [resultIcon];
        if (!passed && ev.details) {
            const tooltip = {
                type: "Tooltip",
                message: ev.details,
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "blue",
                    size: 16,
                },
            };
            valueComponents.push(tooltip);
        }
        return {
            type: "DataListItem",
            label,
            value: valueComponents,
        };
    });
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Summary chips for overall and evaluation results
    const statusColor = {
        pass: "green",
        fail: "error",
        bypass: "warning",
    };
    const chips = [];
    if (input.result) {
        chips.push({
            type: "Chip",
            label: input.result.toUpperCase(),
            color: statusColor[input.result] || "gray",
            variant: "filled",
        });
    }
    if (input.evaluation_result) {
        chips.push({
            type: "Chip",
            label: `Eval: ${input.evaluation_result.toUpperCase()}`,
            color: statusColor[input.evaluation_result] || "gray",
            variant: "outlined",
        });
    }
    const cardFooter = {
        type: "CardFooter",
        childrenProps: chips,
    };
    // Assemble a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=516.js.map