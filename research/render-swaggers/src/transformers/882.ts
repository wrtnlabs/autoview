import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * @title Participation Stats
    */
    export type participation_stats = {
        all: (number & tags.Type<"int32">)[];
        owner: (number & tags.Type<"int32">)[];
    };
}
type IAutoViewTransformerInputType = Schema.participation_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Aggregate totals for the pie chart
  const totalAll = input.all.reduce((sum, v) => sum + v, 0);
  const totalOwner = input.owner.reduce((sum, v) => sum + v, 0);

  // Build a mermaid pie chart to summarize participation
  // Mermaid is supported in Markdown, which will render a pie chart in the browser.
  const mermaidContent = [
    'mermaid',
    'pie title Participation Summary',
    `  "Owner" : ${totalOwner}`,
    `  "Others": ${totalAll - totalOwner}`,
    '```',
  ].join('\n');

  // Build a DataList where each item shows index and two chips (All vs Owner)
  const items: IAutoView.IAutoViewDataListItemProps[] = input.all.map((countAll, idx) => {
    // If owner array is shorter, default missing values to 0
    const countOwner = input.owner[idx] ?? 0;

    // Two chips: one for "All" and one for "Owner" with distinct colors
    const chipAll: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: `All: ${countAll}`,
      color: 'blue',
      variant: 'filled',
    };
    const chipOwner: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: `Owner: ${countOwner}`,
      color: 'green',
      variant: 'filled',
    };

    return {
      type: 'DataListItem',
      // Label shows the item index (1-based)
      label: {
        type: 'Text',
        content: [`#${idx + 1}`],
      },
      // Value is a ChipGroup displaying the two chips side by side
      value: {
        type: 'ChipGroup',
        childrenProps: [chipAll, chipOwner],
      },
    };
  });

  // Compose the overall DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // Markdown component to render our pie chart
  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: 'Markdown',
    content: mermaidContent,
  };

  // Card header with an icon and title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: 'Participation Stats',
    startElement: {
      type: 'Icon',
      id: 'chart-pie',   // FontAwesome pie chart icon
      color: 'teal',
      size: 24,
    },
  };

  // Card content combining the pie chart and the detailed list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: [markdown, dataList],
  };

  // Return a vertical card that contains our header and content
  return {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };
}
