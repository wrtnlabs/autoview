import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export type interaction_limit_response = {
        limit: Schema.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    };
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
type IAutoViewTransformerInputType = Schema.interaction_limit_response;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map interaction_group to appropriate FontAwesome icon names
  const limitIconMap: Record<Schema.interaction_group, string> = {
    existing_users: "user",
    contributors_only: "user-friends",
    collaborators_only: "user-shield",
  };

  // Map interaction_group to chip color
  const limitColorMap: Record<Schema.interaction_group, IAutoView.IAutoViewChipProps["color"]> = {
    existing_users: "primary",
    contributors_only: "info",
    collaborators_only: "success",
  };

  // Format expiration date into a human‐readable string
  // Using toLocaleString for responsiveness across locales and mobile devices
  const expiresAtText = new Date(input.expires_at).toLocaleString();

  // Build a DataList of key‐value pairs: Origin, Limit, Expires At
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Label with globe icon + text
        label: [
          { type: "Icon", id: "globe", color: "teal", size: 16 },
          { type: "Text", content: "Origin", variant: "body1", color: "primary" },
        ],
        // Value as clickable link text (rendered as plain text here)
        value: {
          type: "Text",
          content: input.origin,
          variant: "body2",
          color: "secondary",
        },
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Limit", variant: "body1", color: "primary" },
        // Display the limit as a chip with an icon
        value: {
          type: "Chip",
          label: input.limit.replace(/_/g, " "), // make label more human-readable
          variant: "filled",
          color: limitColorMap[input.limit],
          startElement: {
            type: "Icon",
            id: limitIconMap[input.limit],
            color: limitColorMap[input.limit] as any,
            size: 16,
          },
        },
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Expires At", variant: "body1", color: "primary" },
        value: {
          type: "Text",
          content: expiresAtText,
          variant: "body2",
          color: "secondary",
        },
      },
    ],
  };

  // Compose the overall UI as a vertical card with a header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Interaction Limits",
        // A lock icon to convey the security/limitation context
        startElement: { type: "Icon", id: "lock", size: 24, color: "gray" },
      },
      {
        type: "CardContent",
        // Nest our DataList inside the card content
        childrenProps: detailsList,
      },
    ],
  };
}
