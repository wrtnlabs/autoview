import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Details of a deployment branch or tag policy.
     *
     * @title Deployment branch policy
    */
    export type deployment_branch_policy = {
        /**
         * The unique identifier of the branch or tag policy.
        */
        id?: number & tags.Type<"int32">;
        node_id?: string;
        /**
         * The name pattern that branches or tags must match in order to deploy to the environment.
        */
        name?: string;
        /**
         * Whether this rule targets a branch or tag.
        */
        type?: "branch" | "tag";
    };
}
type IAutoViewTransformerInputType = Schema.deployment_branch_policy;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine if this policy is for branches or tags
  const isBranch = input.type === 'branch';

  // Choose an appropriate icon and chip color
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: 'Icon',
    id: isBranch ? 'code-branch' : 'tag',
    color: 'blue',
    size: 24,
  };
  const typeChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: (input.type ?? 'unknown').toString(),
    variant: 'filled',
    color: isBranch ? 'green' : 'violet',
    size: 'small',
  };

  // Build the card header: show the policy name and a chip for its type
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.name ?? 'Unnamed Policy',
    startElement: headerIcon,
    endElement: typeChip,
  };

  // Construct list items for the policy details: id and node_id
  const detailItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (input.id !== undefined) {
    detailItems.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'ID', variant: 'subtitle2' },
      value: { type: 'Text', content: input.id.toString(), variant: 'body2' },
    });
  }

  if (input.node_id) {
    detailItems.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Node ID', variant: 'subtitle2' },
      value: { type: 'Text', content: input.node_id, variant: 'body2' },
    });
  }

  // If no details are present, fall back to a markdown notice
  const contentChild: IAutoView.IAutoViewPresentationComponentProps = 
    detailItems.length > 0
      ? {
          type: 'DataList',
          childrenProps: detailItems,
        }
      : {
          type: 'Markdown',
          content: '*No additional information available*',
        };

  // Wrap header and content into a vertical card for responsive presentation
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [
      header,
      {
        type: 'CardContent',
        childrenProps: contentChild,
      },
    ],
  };

  return card;
}
