import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The historical version of a ruleset
     *
     * @title Ruleset version
    */
    export type ruleset_version = {
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
    };
}
type IAutoViewTransformerInputType = Schema.ruleset_version[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no versions, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No versions available\n\nThere are no historical versions to display."
    };
  }

  // Map each ruleset_version to a ListItem with visual elements
  const items: IAutoView.IAutoViewListItemProps[] = input.map((version) => {
    const { version_id, actor, updated_at } = version;

    // Build the title
    const title = `Version ${version_id}`;

    // Extract actor info
    const actorType = actor?.type ?? "unknown";
    const actorId = actor?.id;

    // Format the updated_at timestamp for display
    const updatedLabel = (() => {
      try {
        return new Date(updated_at).toLocaleString();
      } catch {
        // Fallback if the date is invalid
        return updated_at;
      }
    })();

    // Use a user icon as the leading element; color it based on actor presence
    const startElement: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "user",      // using a generic user icon
      color: actorId != null ? "blue" : "gray",
      size: 20
    };

    // Build small chips to display actor ID and last updated time
    const endElements: IAutoView.IAutoViewChipProps[] = [];
    if (actorId != null) {
      endElements.push({
        type: "Chip",
        label: `Actor #${actorId}`,
        variant: "outlined",
        color: "teal",
        size: "small"
      });
    }
    endElements.push({
      type: "Chip",
      label: updatedLabel,
      variant: "outlined",
      color: "gray",
      size: "small"
    });

    // The description shows the actor type in human-friendly form
    const description = `Role: ${actorType.charAt(0).toUpperCase() + actorType.slice(1)}`;

    return {
      type: "ListItem",
      title,
      description,
      startElement,
      endElement: endElements
    };
  });

  // Wrap all items in a responsive List component
  return {
    type: "List",
    childrenProps: items
  };
}
