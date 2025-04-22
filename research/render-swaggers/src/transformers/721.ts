import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A diff of the dependencies between two commits.
     *
     * @title Dependency Graph Diff
    */
    export type dependency_graph_diff = {
        change_type: "added" | "removed";
        manifest: string;
        ecosystem: string;
        name: string;
        version: string;
        package_url: string | null;
        license: string | null;
        source_repository_url: string | null;
        vulnerabilities: {
            severity: string;
            advisory_ghsa_id: string;
            advisory_summary: string;
            advisory_url: string;
        }[];
        /**
         * Where the dependency is utilized. `development` means that the dependency is only utilized in the development environment. `runtime` means that the dependency is utilized at runtime and in the development environment.
        */
        scope: "unknown" | "runtime" | "development";
    }[];
}
type IAutoViewTransformerInputType = Schema.dependency_graph_diff;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build a list of DataListItemProps for each dependency.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((dep) => {
    // Choose icon and color based on change_type
    const changeIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: dep.change_type === "added" ? "plus" : "minus",
      color: dep.change_type === "added" ? "green" : "red",
      size: 20,
    };

    // Main label: icon + dependency name and version
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
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
**License**: ${dep.license ?? "N/A"}  
**Package URL**: ${dep.package_url ? `[link](${dep.package_url})` : "N/A"}  
**Source Repo**: ${dep.source_repository_url ? `[link](${dep.source_repository_url})` : "N/A"}

${vulnSection}
`.trim();

    const detailMarkdown: IAutoView.IAutoViewMarkdownProps = {
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
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
