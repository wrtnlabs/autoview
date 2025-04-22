import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type actions_workflow_access_to_repository = {
        /**
         * Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the
         * repository.
         *
         * `none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repositories only. `organization` level access allows sharing across the organization.
        */
        access_level: "none" | "user" | "organization";
    };
}
type IAutoViewTransformerInputType = Schema.actions_workflow_access_to_repository;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map each access_level to an appropriate icon and color.
   * - "none"        → lock icon in gray
   * - "user"        → user icon in blue
   * - "organization"→ users icon in teal
   */
  const iconMap: Record<string, { id: string; color: Exclude<IAutoView.IAutoViewIconProps["color"], undefined> }> = {
    none:         { id: "lock",   color: "gray" },
    user:         { id: "user",   color: "blue" },
    organization: { id: "users",  color: "teal" },
  };

  /**
   * Human‑friendly descriptions for each access level.
   * Will be rendered as markdown to allow rich text.
   */
  const descriptionMap: Record<string, string> = {
    none: `
External workflows cannot access actions or reusable workflows in this repository.
Only workflows defined here will run successfully.
`,
    user: `
Workflows in private user‑owned repositories may reuse actions from this repository.
This level enables sharing across individual accounts.
`,
    organization: `
Any workflow within the organization can access and reuse actions in this repository.
Recommended for centralized, team‑wide maintenance.
`,
  };

  // Select the icon/color pair; default to "none" if somehow missing.
  const { id: iconId, color: iconColor } = iconMap[input.access_level] || iconMap.none;

  return {
    // Use a vertical card to group header and content responsively.
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with title, icon, and current access level label.
        type: "CardHeader",
        title: "Workflow Access Level",
        description: `\`${input.access_level}\``,
        startElement: {
          type: "Icon",
          id: iconId,
          color: iconColor,
          size: 24,
        },
      },
      {
        // Card content with detailed description in markdown for better readability.
        type: "CardContent",
        childrenProps: [
          {
            type: "Markdown",
            content: descriptionMap[input.access_level] || descriptionMap.none,
          },
        ],
      },
    ],
  };
}
