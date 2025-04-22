import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type selected_actions = {
        /**
         * Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization.
        */
        github_owned_allowed?: boolean;
        /**
         * Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators.
        */
        verified_allowed?: boolean;
        /**
         * Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.
         *
         * > [!NOTE]
         * > The `patterns_allowed` setting only applies to public repositories.
        */
        patterns_allowed?: string[];
    };
}
type IAutoViewTransformerInputType = Schema.selected_actions;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input settings
  const { github_owned_allowed, verified_allowed, patterns_allowed } = input;

  // Helper to create a chip group for boolean flags
  function booleanChip(label: string, flag?: boolean): IAutoView.IAutoViewChipProps {
    return {
      type: "Chip",
      label,
      // Use green for true, red for false or undefined (treat undefined as false)
      color: flag ? "success" : "error",
      variant: "filled",
      size: "medium",
    };
  }

  // Build each DataListItem for the boolean settings
  const githubItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "GitHub‐owned Actions",
      variant: "body2",
    },
    value: {
      type: "ChipGroup",
      // Only one chip for this boolean
      childrenProps: [booleanChip(github_owned_allowed ? "Allowed" : "Not allowed", github_owned_allowed)],
    },
  };

  const verifiedItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Verified Marketplace Actions",
      variant: "body2",
    },
    value: {
      type: "ChipGroup",
      childrenProps: [booleanChip(verified_allowed ? "Allowed" : "Not allowed", verified_allowed)],
    },
  };

  // Build the patterns list: if no patterns, show a gray "None" chip
  const patterns: string[] = Array.isArray(patterns_allowed) ? patterns_allowed : [];
  const patternChips: IAutoView.IAutoViewChipProps[] =
    patterns.length > 0
      ? patterns.map((p) => ({
          type: "Chip",
          label: p,
          color: "primary",
          variant: "outlined",
          size: "medium",
        }))
      : [
          {
            type: "Chip",
            label: "None",
            color: "gray",
            variant: "outlined",
            size: "medium",
          },
        ];

  const patternsItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Allowed Patterns",
      variant: "body2",
    },
    value: {
      type: "ChipGroup",
      // Wrap long lists into a responsive chip group
      childrenProps: patternChips,
      maxItems: 5, // on mobile, collapse into "+N" if too many
    },
  };

  // Compose the data list of settings
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [githubItem, verifiedItem, patternsItem],
  };

  // Use a vertical card to give a clear, responsive container
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Selected Actions Configuration",
    description: "Manage which GitHub Actions are allowed in your workflows",
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
