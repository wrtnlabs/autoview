import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposEnvironmentsDeploymentBranchPolicies {
        export type GetResponse = {
            /**
             * The number of deployment branch policies for the environment.
            */
            total_count: number & tags.Type<"int32">;
            branch_policies: Schema.deployment_branch_policy[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiReposEnvironmentsDeploymentBranchPolicies.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms deployment branch policy data into a visual AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const policies = input.branch_policies ?? [];

  // If there are no policies, show a friendly markdown message
  if (policies.length === 0) {
    return {
      type: "Markdown",
      content: "### No Branch Policies\nNo branch or tag policies found for this environment."
    };
  }

  // Map each policy to a DataListItem with an icon, name, and an ID chip
  const listItems: IAutoView.IAutoViewDataListItemProps[] = policies.map((policy) => {
    const isBranch = policy.type === "branch";
    // Choose an icon: code-branch for branches, tag for tags
    const icon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: isBranch ? "code-branch" : "tag",
      color: isBranch ? "blue" : "teal",
      size: 20
    };

    // Display the policy name as a Text component
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: policy.name ? [policy.name] : [""],
      variant: "body1"
    };

    // Show the numeric ID in a small outlined chip
    const idChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: policy.id !== undefined ? policy.id.toString() : "",
      variant: "outlined",
      size: "small"
    };

    return {
      type: "DataListItem",
      // Label area combines icon and name side by side
      label: [icon, nameText],
      // Value area shows the ID chip
      value: idChip
    };
  });

  // Wrap the list inside a card with a header showing total count
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Deployment Branch & Tag Policies",
    description: `${input.total_count} total`,
    startElement: {
      type: "Icon",
      id: "project-diagram",
      color: "indigo",
      size: 24
    }
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Embed the DataList directly as the card's content
    childrenProps: {
      type: "DataList",
      childrenProps: listItems
    }
  };

  // Use a VerticalCard to stack the header and content responsively
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
