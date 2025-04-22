export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Map advisory severity to a UI color scale
    const severityColorMap = {
        critical: "red",
        high: "orange",
        medium: "yellow",
        low: "lime",
    };
    // Build a Chip to display the severity prominently
    const severityChip = {
        type: "Chip",
        label: input.security_advisory.severity.toUpperCase(),
        color: severityColorMap[input.security_advisory.severity] || "gray",
        variant: "filled",
        size: "medium",
    };
    // Prepare the markdown description: show summary + detailed description
    const markdownContent = `**Summary:** ${input.security_advisory.summary}

---

${input.security_advisory.description}`;
    const descriptionMarkdown = {
        type: "Markdown",
        content: markdownContent,
    };
    // Use the specific vulnerability that triggered the alert
    const vuln = input.security_vulnerability;
    const vulnerableRange = vuln.vulnerable_version_range;
    const patchedVersion = (_b = (_a = vuln.first_patched_version) === null || _a === void 0 ? void 0 : _a.identifier) !== null && _b !== void 0 ? _b : "Not patched yet";
    // Build a data list to show the vulnerable version range and patch info
    const vulnerabilityList = {
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: `Vulnerable versions`,
                variant: "subtitle2",
            },
        ],
        value: [
            {
                type: "Text",
                content: vulnerableRange,
                variant: "body2",
            },
        ],
    };
    const patchedList = {
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: `Patched in`,
                variant: "subtitle2",
            },
        ],
        value: [
            {
                type: "Text",
                content: patchedVersion,
                variant: "body2",
            },
        ],
    };
    const dataList = {
        type: "DataList",
        childrenProps: [vulnerabilityList, patchedList],
    };
    // Build action buttons for footer
    const actions = [];
    // Button to open the alert on GitHub
    actions.push({
        type: "Button",
        label: "View Alert",
        href: input.html_url,
        variant: "outlined",
        color: "primary",
        size: "small",
        startElement: {
            type: "Icon",
            id: "github",
            size: 16,
            color: "gray",
        },
    });
    // If there is at least one reference, link to the first external advisory
    const firstRef = (_d = (_c = input.security_advisory.references) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.url;
    if (firstRef) {
        actions.push({
            type: "Button",
            label: "More Info",
            href: firstRef,
            variant: "contained",
            color: "secondary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 16,
                color: "gray",
            },
        });
    }
    // Compose the card header: show alert number and package name
    const cardHeader = {
        type: "CardHeader",
        title: `Alert #${input.number}`,
        description: `${((_e = input.dependency["package"]) === null || _e === void 0 ? void 0 : _e.name) || "Unknown package"} (${input.dependency.scope || "runtime"})`,
        startElement: severityChip,
    };
    // Compose the card content: description markdown + vulnerability details
    const cardContent = {
        type: "CardContent",
        childrenProps: [descriptionMarkdown, dataList],
    };
    // Compose the card footer: action buttons
    const cardFooter = {
        type: "CardFooter",
        childrenProps: actions,
    };
    // Return a vertical card as the main container
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return card;
}
//# sourceMappingURL=716.js.map