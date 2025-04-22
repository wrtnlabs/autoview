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
  // Format the update timestamp into a human-friendly string.
  const updatedDate = new Date(input.updated_at);
  const formattedDate = updatedDate.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Safely extract actor details, falling back to placeholders if missing.
  const actorId = input.actor.id != null ? String(input.actor.id) : "N/A";
  const actorType = input.actor.type ?? "Unknown";

  // Build a DataListItem for the actor ID.
  const actorIdItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      variant: "body2",
      content: "Actor ID",
    },
    value: {
      type: "Text",
      variant: "body2",
      content: actorId,
    },
  };

  // Build a DataListItem for the actor type.
  const actorTypeItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      variant: "body2",
      content: "Actor Type",
    },
    value: {
      type: "Text",
      variant: "body2",
      content: actorType,
    },
  };

  // Serialize the state object; if empty, note that explicitly.
  const stateKeys = Object.keys(input.state ?? {});
  const stateContent =
    stateKeys.length > 0
      ? JSON.stringify(input.state, null, 2)
      : "{}";
  // Render the state as a JSON code block via Markdown for readability.
  const stateItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      variant: "body2",
      content: "State",
    },
    value: {
      type: "Markdown",
      content: "json\n" + stateContent + "\n```",
    },
  };

  // Compose the DataList containing actor and state details.
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [actorIdItem, actorTypeItem, stateItem],
  };

  // Compose the card header with an avatar and a clock icon.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Version ${input.version_id}`,
    description: `Updated: ${formattedDate}`,
    // Show a placeholder avatar with the actor type initial.
    startElement: {
      type: "Avatar",
      name: actorType,
      variant: "info",
      size: 32,
    },
    // Show a clock icon next to the update time.
    endElement: {
      type: "Icon",
      id: "clock",
      color: "gray",
      size: 16,
    },
  };

  // Wrap the details list inside a CardContent.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: detailsList,
  };

  // Return a vertical card combining header and content for a clean, responsive layout.
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
