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
  // Helper to create a status chip for boolean or undefined values
  const createStatusChip = (
    value: boolean | undefined,
    trueLabel: string,
    falseLabel: string
  ): IAutoView.IAutoViewChipProps => {
    if (value === true) {
      return {
        type: "Chip",
        label: trueLabel,
        color: "green",
        variant: "filled",
        startElement: {
          type: "Icon",
          id: "check",
          color: "green",
          size: 16,
        },
      };
    } else if (value === false) {
      return {
        type: "Chip",
        label: falseLabel,
        color: "red",
        variant: "filled",
        startElement: {
          type: "Icon",
          id: "times",
          color: "red",
          size: 16,
        },
      };
    } else {
      // undefined case
      return {
        type: "Chip",
        label: "Unknown",
        color: "gray",
        variant: "outlined",
        startElement: {
          type: "Icon",
          id: "question",
          color: "gray",
          size: 16,
        },
      };
    }
  };

  // Build each data list item for the three input fields
  const items: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "GitHub-owned Actions",
        variant: "body1",
      },
      value: createStatusChip(input.github_owned_allowed, "Allowed", "Disallowed"),
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Verified Marketplace Actions",
        variant: "body1",
      },
      value: createStatusChip(input.verified_allowed, "Allowed", "Disallowed"),
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Allowed Patterns",
        variant: "body1",
      },
      value:
        input.patterns_allowed && input.patterns_allowed.length > 0
          ? {
              type: "ChipGroup",
              maxItems: 10, // show up to 10 patterns as chips; extra are hidden
              childrenProps: input.patterns_allowed.map((pattern) => ({
                type: "Chip",
                label: pattern,
                variant: "outlined",
                color: "primary",
              })),
            }
          : {
              type: "Text",
              content: "None",
              variant: "body2",
              color: "gray",
            },
    },
  ];

  // Compose the final vertical card UI
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Selected Actions Settings",
        description: "Overview of allowed GitHub Actions and patterns",
        startElement: {
          type: "Icon",
          id: "cog",
          size: 20,
          color: "blue",
        },
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: items,
          },
        ],
      },
    ],
  };
}
