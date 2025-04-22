export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const sbom = input.sbom;
    // Build a list of DataListItemProps for each package with key details
    const packageItems = (sbom.packages || []).map((pkg) => {
        const title = pkg.name || pkg.SPDXID || "Unknown Package";
        // Nest a DataList inside the value cell to show structured details
        const detailsList = {
            type: "DataList",
            childrenProps: [
                {
                    type: "DataListItem",
                    label: { type: "Text", variant: "body2", content: "Version" },
                    value: { type: "Text", variant: "body2", content: pkg.versionInfo || "N/A" },
                },
                {
                    type: "DataListItem",
                    label: { type: "Text", variant: "body2", content: "License" },
                    value: {
                        type: "Text",
                        variant: "body2",
                        content: pkg.licenseConcluded || pkg.licenseDeclared || "N/A",
                    },
                },
                {
                    type: "DataListItem",
                    label: { type: "Text", variant: "body2", content: "Supplier" },
                    value: { type: "Text", variant: "body2", content: pkg.supplier || "N/A" },
                },
            ],
        };
        return {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle1", content: title },
            value: detailsList,
        };
    });
    // Build the relationships list if present
    const relationshipItems = (sbom.relationships || []).map((rel, idx) => ({
        type: "DataListItem",
        label: { type: "Text", variant: "body2", content: rel.relationshipType || `Relation ${idx + 1}` },
        value: {
            type: "Text",
            variant: "body2",
            content: rel.relatedSpdxElement || rel.spdxElementId || "N/A",
        },
    }));
    // Header card showing overall document info
    const header = {
        type: "CardHeader",
        title: sbom.name,
        description: `SPDX Version: ${sbom.spdxVersion}`,
        startElement: {
            type: "Icon",
            id: "archive", // archive icon from FontAwesome
            color: "blue",
            size: 20,
        },
        endElement: {
            type: "Chip",
            label: sbom.SPDXID,
            size: "small",
            variant: "outlined",
        },
    };
    // Main content: packages and relationships
    const contentChildren = [];
    // Section: Packages
    contentChildren.push({
        type: "Text",
        variant: "h6",
        content: `Packages (${packageItems.length})`,
    });
    if (packageItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: packageItems,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            variant: "body1",
            content: "No packages available.",
        });
    }
    // Section: Relationships (if any)
    if (relationshipItems.length > 0) {
        contentChildren.push({
            type: "Text",
            variant: "h6",
            content: `Relationships (${relationshipItems.length})`,
        });
        contentChildren.push({
            type: "DataList",
            childrenProps: relationshipItems,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=722.js.map