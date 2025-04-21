import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_analysis = {
        ref: Schema.code_scanning_ref;
        commit_sha: Schema.code_scanning_analysis_commit_sha;
        analysis_key: Schema.code_scanning_analysis_analysis_key;
        environment: Schema.code_scanning_analysis_environment;
        category?: Schema.code_scanning_analysis_category;
        error: string;
        created_at: Schema.code_scanning_analysis_created_at;
        /**
         * The total number of results in the analysis.
        */
        results_count: number & tags.Type<"int32">;
        /**
         * The total number of rules used in the analysis.
        */
        rules_count: number & tags.Type<"int32">;
        /**
         * Unique identifier for this analysis.
        */
        id: number & tags.Type<"int32">;
        url: Schema.code_scanning_analysis_url;
        sarif_id: Schema.code_scanning_analysis_sarif_id;
        tool: Schema.code_scanning_analysis_tool;
        deletable: boolean;
        /**
         * Warning generated when processing the analysis
        */
        warning: string;
    };
    /**
     * The Git reference, formatted as `refs/pull/<number>/merge`, `refs/pull/<number>/head`,
     * `refs/heads/<branch name>` or simply `<branch name>`.
    */
    export type code_scanning_ref = string;
    /**
     * The SHA of the commit to which the analysis you are uploading relates.
    */
    export type code_scanning_analysis_commit_sha = string;
    /**
     * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
    */
    export type code_scanning_analysis_analysis_key = string;
    /**
     * Identifies the variable values associated with the environment in which this analysis was performed.
    */
    export type code_scanning_analysis_environment = string;
    /**
     * Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code.
    */
    export type code_scanning_analysis_category = string;
    /**
     * The time that the analysis was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type code_scanning_analysis_created_at = string;
    /**
     * The REST API URL of the analysis resource.
    */
    export type code_scanning_analysis_url = string;
    /**
     * An identifier for the upload.
    */
    export type code_scanning_analysis_sarif_id = string;
    export type code_scanning_analysis_tool = {
        name?: Schema.code_scanning_analysis_tool_name;
        version?: Schema.code_scanning_analysis_tool_version;
        guid?: Schema.code_scanning_analysis_tool_guid;
    };
    /**
     * The name of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_name = string;
    /**
     * The version of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_version = string | null;
    /**
     * The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data.
    */
    export type code_scanning_analysis_tool_guid = string | null;
}
type IAutoViewTransformerInputType = Schema.code_scanning_analysis[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no analyses, render a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "### No code scanning analyses available.\n\nThere are no results to display."
    };
  }

  // Map each analysis to a list item for a responsive list view
  const items: IAutoView.IAutoViewListItemProps[] = input.map(analysis => {
    // Safely extract tool name and version
    const toolName = analysis.tool.name ?? "Unknown Tool";
    const versionSuffix = analysis.tool.version ? ` v${analysis.tool.version}` : "";

    // Shorten commit SHA for readability
    const shortSha = analysis.commit_sha.slice(0, 7);

    // Compose description with commit and creation date
    const description = `Commit: ${shortSha} | Created: ${analysis.created_at}`;

    // Prepare chips for results_count and rules_count
    const countChips: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: `${analysis.results_count}`,
        color: "info",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Chip",
        label: `${analysis.rules_count}`,
        color: "secondary",
        size: "small",
        variant: "outlined"
      }
    ];

    return {
      type: "ListItem",
      // Title shows tool name and version
      title: `${toolName}${versionSuffix}`,
      // Description shows commit and timestamp
      description,
      // Clicking the item navigates to the analysis URL
      href: analysis.url,
      // Use an icon to visually indicate this is a tool analysis
      startElement: {
        type: "Icon",
        id: "cog",
        color: "blue",
        size: 24
      },
      // Show the count chips on the right side
      endElement: countChips
    };
  });

  // Return a List component containing all analysis items
  return {
    type: "List",
    childrenProps: items
  };
}
