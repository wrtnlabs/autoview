import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiSearchLabels {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: Schema.label_search_result_item[];
        };
    }
    /**
     * Label Search Result Item
     *
     * @title Label Search Result Item
    */
    export type label_search_result_item = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        name: string;
        color: string;
        "default": boolean;
        description: string | null;
        score: number;
        text_matches?: Schema.search_result_text_matches;
    };
    /**
     * @title Search Result Text Matches
    */
    export type search_result_text_matches = {
        object_url?: string;
        object_type?: string | null;
        property?: string;
        fragment?: string;
        matches?: {
            text?: string;
            indices?: (number & tags.Type<"int32">)[];
        }[];
    }[];
}
type IAutoViewTransformerInputType = Schema.IApiSearchLabels.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: create a DataListItem for each label
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.items.map((item) => {
    // Left side: display name with a Chip, plus hex color text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Chip",
        label: item.name,
        variant: "filled",
        // Highlight default labels
        color: item.default ? "primary" : "secondary",
        size: "small",
      },
      {
        type: "Text",
        // Show the raw hex code, colored accordingly
        content: item.color,
        color: item.color,
        variant: "body2",
      },
    ];

    // Right side: description (if any), score, and a link button
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (item.description) {
      // Render the description as Markdown for better formatting support
      valueComponents.push({
        type: "Markdown",
        content: item.description,
      });
    }

    // Always show the relevance score
    valueComponents.push({
      type: "Text",
      content: `Score: ${item.score.toFixed(2)}`,
      variant: "caption",
      color: "gray",
    });

    // Provide a button to navigate to the label URL
    valueComponents.push({
      type: "Button",
      label: "View",
      href: item.url,
      variant: "text",
      size: "small",
    });

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Build the DataList, or a placeholder text if empty
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Card header: show total count and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Labels (${input.total_count})`,
    description: input.incomplete_results
      ? "Results may be incomplete"
      : undefined,
    startElement: {
      type: "Icon",
      id: "tags",
      size: 24,
      color: "blue",
    },
  };

  // Card content wraps the list or a fallback message
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.items.length === 0) {
    contentChildren.push({
      type: "Markdown",
      content: "_No labels found._",
    });
  } else {
    contentChildren.push(dataList);
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble into a vertical card for a clean, responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
