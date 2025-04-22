export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map advisory severity to FontAwesome icon IDs and AutoView colors
    const severityIconMap = {
        critical: "exclamation-triangle",
        high: "fire",
        medium: "exclamation-circle",
        low: "arrow-down",
    };
    const severityColorMap = {
        critical: "error",
        high: "warning",
        medium: "info",
        low: "gray",
    };
    // Build the card header: GHSA ID, summary, and a severity icon if present
    const header = Object.assign({ type: "CardHeader", title: input.ghsa_id, description: input.summary }, (input.severity
        ? {
            // Show an icon for severity
            startElement: {
                type: "Icon",
                id: severityIconMap[input.severity],
                color: severityColorMap[input.severity],
                size: 24,
            },
        }
        : {}));
    // Accumulate content components: markdown description and a details list
    const contentChildren = [];
    // Render the full description in markdown if available
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    // Prepare DataList items for various structured fields
    const listItems = [];
    // Identifiers (CVE, GHSA, etc.)
    if (Array.isArray(input.identifiers) && input.identifiers.length > 0) {
        const label = {
            type: "Text",
            content: "Identifiers",
        };
        const values = input.identifiers
            .map((i) => `${i.type}: ${i.value}`)
            .join(", ");
        const value = {
            type: "Text",
            content: values,
        };
        listItems.push({
            type: "DataListItem",
            label,
            value,
        });
    }
    // CVSS Score and Vector
    if (input.cvss) {
        if (input.cvss.score != null) {
            const label = {
                type: "Text",
                content: "CVSS Score",
            };
            // Emphasize the score with a filled chip
            const value = {
                type: "Chip",
                label: `${input.cvss.score}`,
                color: input.cvss.score >= 7 ? "error" : input.cvss.score >= 4 ? "warning" : "success",
                size: "small",
                variant: "filled",
            };
            listItems.push({ type: "DataListItem", label, value });
        }
        if (input.cvss.vector_string) {
            const label = {
                type: "Text",
                content: "CVSS Vector",
            };
            const value = {
                type: "Text",
                content: input.cvss.vector_string,
            };
            listItems.push({ type: "DataListItem", label, value });
        }
    }
    // CWE IDs as a group of small chips
    if (Array.isArray(input.cwe_ids) && input.cwe_ids.length > 0) {
        const label = {
            type: "Text",
            content: "CWE",
        };
        const chips = input.cwe_ids.map((cwe) => ({
            type: "Chip",
            label: cwe,
            size: "small",
            variant: "outlined",
        }));
        const value = {
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 5,
        };
        listItems.push({ type: "DataListItem", label, value });
    }
    // If any DataList items were created, wrap them in a DataList component
    if (listItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: listItems,
        });
    }
    // Footer with a button linking to the advisory on GitHub
    const footer = Object.assign({ type: "CardFooter" }, (input.html_url
        ? {
            childrenProps: {
                type: "Button",
                label: "View on GitHub",
                variant: "contained",
                color: "primary",
                href: input.html_url,
            },
        }
        : {}));
    // Assemble everything into a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: contentChildren,
            },
            footer,
        ],
    };
}
//# sourceMappingURL=877.js.map