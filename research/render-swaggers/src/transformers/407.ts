import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnersLabels {
        export type PutResponse = {
            total_count: number & tags.Type<"int32">;
            labels: Schema.runner_label[];
        };
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export type runner_label = {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnersLabels.PutResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map the runner label types to chip colors for visual distinction
  const chipColorMap: Record<NonNullable<Schema.runner_label['type']>, IAutoView.IAutoViewChipProps['color']> = {
    'read-only': 'gray',
    'custom': 'primary',
  };

  // If there are no labels, render a friendly markdown message
  if (!input.labels || input.labels.length === 0) {
    return {
      type: 'Markdown',
      content: `### Runner Labels

_No labels found for this organization._`,
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Create a chip for each runner label
  const chips: IAutoView.IAutoViewChipProps[] = input.labels.map(label => ({
    type: 'Chip',
    label: label.name,
    // Fallback to 'primary' if type is undefined
    color: chipColorMap[label.type ?? 'custom'],
    size: 'medium',
    variant: 'filled',
  }));

  // Header of the card showing total count with an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: 'Runner Labels',
    description: `Total: ${input.total_count}`,
    startElement: {
      type: 'Icon',
      id: 'tags',         // using FontAwesome 'tags' icon to represent labels
      color: 'blue',
      size: 20,
    },
  };

  // Content of the card displaying the chips in a responsive group
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'ChipGroup',
      // chips will wrap responsively on small screens
      childrenProps: chips,
    },
  };

  // Compose the vertical card containing header and chip list
  return {
    type: 'VerticalCard',
    childrenProps: [header, content],
  } as IAutoView.IAutoViewVerticalCardProps;
}
