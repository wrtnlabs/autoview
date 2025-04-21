import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Community Profile
     *
     * @title Community Profile
    */
    export type community_profile = {
        health_percentage: number & tags.Type<"int32">;
        description: string | null;
        documentation: string | null;
        files: {
            code_of_conduct: Schema.nullable_code_of_conduct_simple;
            code_of_conduct_file: Schema.nullable_community_health_file;
            license: Schema.nullable_license_simple;
            contributing: Schema.nullable_community_health_file;
            readme: Schema.nullable_community_health_file;
            issue_template: Schema.nullable_community_health_file;
            pull_request_template: Schema.nullable_community_health_file;
        };
        updated_at: (string & tags.Format<"date-time">) | null;
        content_reports_enabled?: boolean;
    };
    /**
     * Code of Conduct Simple
     *
     * @title Code Of Conduct Simple
    */
    export type nullable_code_of_conduct_simple = {
        url: string & tags.Format<"uri">;
        key: string;
        name: string;
        html_url: (string & tags.Format<"uri">) | null;
    } | null;
    /**
     * @title Community Health File
    */
    export type nullable_community_health_file = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
    } | null;
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
}
type IAutoViewTransformerInputType = Schema.community_profile;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine health chip color based on percentage thresholds
  const health = input.health_percentage;
  const healthColor: IAutoView.IAutoViewChipProps["color"] =
    health >= 80 ? "green" :
    health >= 50 ? "yellow" :
    "red";

  // Format updated date for display
  const updatedDate = input.updated_at
    ? new Date(input.updated_at).toLocaleDateString()
    : "Unknown";

  // Prepare list items for the DataList component
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Health Score entry
  items.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Health Score" }],
    value: {
      type: "Chip",
      label: `${health}%`,
      color: healthColor,
      variant: "filled"
    }
  });

  // Description (rendered as Markdown for better readability)
  if (input.description !== null) {
    items.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Description" }],
      value: {
        type: "Markdown",
        content: input.description
      }
    });
  }

  // Link to external documentation
  if (input.documentation) {
    items.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Documentation" }],
      value: {
        type: "Button",
        label: "Open Docs",
        href: input.documentation
      }
    });
  }

  // Last updated timestamp
  items.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Last Updated" }],
    value: {
      type: "Text",
      content: updatedDate
    }
  });

  // Content reports feature flag
  if (typeof input.content_reports_enabled !== "undefined") {
    items.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Content Reports" }],
      value: {
        type: "Chip",
        label: input.content_reports_enabled ? "Enabled" : "Disabled",
        color: input.content_reports_enabled ? "green" : "gray",
        variant: "filled"
      }
    });
  }

  // Human-readable labels for the various community health files
  const fileKeyMap: Record<keyof typeof input.files, string> = {
    code_of_conduct: "Code of Conduct",
    code_of_conduct_file: "CoC File",
    license: "License",
    contributing: "Contributing",
    readme: "README",
    issue_template: "Issue Template",
    pull_request_template: "PR Template"
  };

  // Iterate through each file entry and create a link button if present
  for (const key in input.files) {
    const fileData = input.files[key as keyof typeof input.files];
    if (fileData) {
      // Prefer html_url when available, otherwise fallback to url
      const url =
        "html_url" in fileData && fileData.html_url
          ? fileData.html_url
          : (fileData as { url: string }).url;

      const displayName = fileKeyMap[key as keyof typeof fileKeyMap] || key;
      items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: displayName }],
        value: {
          type: "Button",
          label: "View",
          href: url
        }
      });
    }
  }

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Card header with a health chip and update info
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Community Profile",
    description: `Last updated: ${updatedDate}`,
    startElement: {
      type: "Chip",
      label: `${health}%`,
      color: healthColor,
      variant: "filled"
    }
  };

  // Card content wrapping our DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Return a vertical card combining header and content
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
