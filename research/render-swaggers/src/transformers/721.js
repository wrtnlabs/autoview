export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a list of DataListItemProps for each dependency.
    const items = input.map((dep) => {
        var _a;
        // Choose icon and color based on change_type
        const changeIcon = {
            type: "Icon",
            id: dep.change_type === "added" ? "plus" : "minus",
            color: dep.change_type === "added" ? "green" : "red",
            size: 20,
        };
        // Main label: icon + dependency name and version
        const label = [
            changeIcon,
            {
                type: "Text",
                // Using an array of string & icon is allowed, but here we use simple string
                content: `${dep.name}@${dep.version}`,
                variant: "body1",
            },
        ];
        // Compose markdown for the detailed view
        // If there are vulnerabilities, build a markdown table, otherwise note none.
        let vulnSection = "No known vulnerabilities.";
        if (dep.vulnerabilities.length > 0) {
            // Table header
            const header = "| Severity | GHSA ID | Summary | Link |\n|---|---|---|---|";
            // Table rows
            const rows = dep.vulnerabilities
                .map((v) => {
                // Escape any pipe characters in summary
                const safeSummary = v.advisory_summary.replace(/\|/g, "\\|");
                return `| ${v.severity} | ${v.advisory_ghsa_id} | ${safeSummary} | [link](${v.advisory_url}) |`;
            })
                .join("\n");
            vulnSection = `## Vulnerabilities\n${header}\n${rows}`;
        }
        // Build the full markdown content
        const markdownContent = `
**Manifest**: \`${dep.manifest}\`  
**Ecosystem**: \`${dep.ecosystem}\`  
**Scope**: **${dep.scope}**  
**License**: ${(_a = dep.license) !== null && _a !== void 0 ? _a : "N/A"}  
**Package URL**: ${dep.package_url ? `[link](${dep.package_url})` : "N/A"}  
**Source Repo**: ${dep.source_repository_url ? `[link](${dep.source_repository_url})` : "N/A"}

${vulnSection}
`.trim();
        const detailMarkdown = {
            type: "Markdown",
            content: markdownContent,
        };
        return {
            type: "DataListItem",
            label,
            // Use markdown as the value of this data list item
            value: detailMarkdown,
        };
    });
    // Return a DataList component wrapping all items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=721.js.map