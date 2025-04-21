import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type ruleset_version_with_state = {
        /**
         * The ID of the previous version of the ruleset
        */
        version_id: number & tags.Type<"int32">;
        /**
         * The actor who updated the ruleset
        */
        actor: {
            id?: number & tags.Type<"int32">;
            type?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        /**
         * The state of the ruleset version
        */
        state: {};
    };
}
type IAutoViewTransformerInputType = Schema.ruleset_version_with_state;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine an appropriate icon based on actor type
  const actorType = input.actor?.type?.toLowerCase() ?? "";
  const iconId = actorType === "system" ? "cog" : "user";
  const iconColor = actorType === "system" ? "gray" : "blue";

  // Format the timestamp into a human‐readable string
  const formattedDate = new Date(input.updated_at).toLocaleString();

  // Serialize the state object for markdown display
  let stateJson: string;
  try {
    stateJson = JSON.stringify(input.state, null, 2);
  } catch {
    stateJson = "[Unable to serialize state]";
  }

  // Build a markdown block with section headings and code/inline formatting
  const markdownLines: string[] = [
    "## Ruleset Version Details",
    "",
    `- **Version ID**: \`${input.version_id}\``,
    `- **Updated At**: \`${formattedDate}\``,
    "",
    "## Actor",
    `- **ID**: \`${input.actor.id ?? "N/A"}\``,
    `- **Type**: \`${input.actor.type ?? "N/A"}\``,
    "",
    "## State",
    // If the state is essentially empty ({}), show a placeholder
    stateJson && stateJson !== "{}" 
      ? "json\n" + stateJson + "\n```" 
      : "_No state details available_",
  ];
  const markdownContent = markdownLines.join("\n");

  // Compose a vertical card containing a header with an icon and a markdown content block
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Title + description presented prominently in the header
        title: `Ruleset Version ${input.version_id}`,
        description: `Updated at ${formattedDate}`,
        // An icon as a startElement to visually indicate actor type
        startElement: {
          type: "Icon",
          id: iconId,
          color: iconColor,
          size: 28,
        },
      },
      {
        type: "CardContent",
        // Use the Markdown component for rich text, headings and code formatting
        childrenProps: {
          type: "Markdown",
          content: markdownContent,
        },
      },
    ],
  };
}
