import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export type organization_actions_variable = {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * Visibility of a variable
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.organization_actions_variable;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Helper: format ISO timestamps to a locale-aware string. Fallback to raw if invalid.
  const formatDateTime = (iso: string): string => {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) throw new Error("Invalid date");
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // Map visibility to a Chip color for better visual distinction.
  const visibilityColorMap: Record<
    IAutoViewTransformerInputType["visibility"],
    IAutoView.IAutoViewChipProps["color"]
  > = {
    all: "success",
    private: "error",
    selected: "warning",
  };

  // Assemble each field into a DataListItem.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. The secret variable value: show as code block via Markdown for readability.
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Value" },
    value: {
      type: "Markdown",
      content: [
        "",
        input.value,
        "```",
      ].join("\n"),
    },
  });

  // 2. Created timestamp.
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At" },
    value: {
      type: "Text",
      content: formatDateTime(input.created_at),
    },
  });

  // 3. Updated timestamp.
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Updated At" },
    value: {
      type: "Text",
      content: formatDateTime(input.updated_at),
    },
  });

  // 4. Visibility status rendered as a colored Chip.
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Visibility" },
    value: {
      type: "Chip",
      label: input.visibility,
      color: visibilityColorMap[input.visibility],
      variant: "filled",
    },
  });

  // 5. If present, provide a link to selected repositories.
  if (input.selected_repositories_url) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Repositories" },
      value: {
        type: "Button",
        label: "View",
        href: input.selected_repositories_url,
        variant: "text",
      },
    });
  }

  // Compose the overall UI as a vertical card with header and content.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Use the variable name as the card title.
        title: input.name,
        // Provide a brief description below the title.
        description: "GitHub Actions organization variable details",
        // An icon to indicate "secret"/"key" concept.
        startElement: {
          type: "Icon",
          id: "key",
          color: "indigo",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Embed a DataList to display each attribute in a structured way.
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
    ],
  };
}
