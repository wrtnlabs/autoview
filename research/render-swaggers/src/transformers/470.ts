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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Map each interaction_group value to a chip color
  const limitColorMap: Record<
    Schema.interaction_group,
    IAutoView.IAutoViewChipProps['color']
  > = {
    existing_users: 'info',
    contributors_only: 'success',
    collaborators_only: 'primary',
  };

  // Determine chip color for the current limit, fallback to gray if unknown
  const limitColor =
    limitColorMap[input.limit] ?? ('gray' as IAutoView.IAutoViewChipProps['color']);

  // Format the expiration timestamp into a human-readable string
  let expiresDisplay: string;
  const date = new Date(input.expires_at);
  if (!isNaN(date.getTime())) {
    // Locale string adapts to user's device (mobile or desktop)
    expiresDisplay = date.toLocaleString();
  } else {
    // Fallback to the raw string if parsing failed
    expiresDisplay = input.expires_at;
  }

  // Build a DataList of the key properties: limit and expiration
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: [
      {
        // DataListItem for interaction limit
        type: 'DataListItem',
        label: [
          {
            type: 'Text',
            content: 'Limit',
            variant: 'body2',
          },
        ],
        value: {
          type: 'Chip',
          label: input.limit.replace(/_/g, ' '),
          color: limitColor,
          variant: 'filled',
        },
      },
      {
        // DataListItem for expiry timestamp
        type: 'DataListItem',
        label: [
          {
            type: 'Text',
            content: 'Expires At',
            variant: 'body2',
          },
        ],
        value: {
          type: 'Text',
          content: expiresDisplay,
          variant: 'body2',
        },
      },
    ],
  };

  // Compose the overall view as a VerticalCard with header and content
  return {
    type: 'VerticalCard',
    childrenProps: [
      {
        // Header with a globe icon and the origin string
        type: 'CardHeader',
        title: 'Interaction Limit',
        description: input.origin,
        startElement: {
          type: 'Icon',
          id: 'globe',
          color: 'blue',
          size: 24,
        },
      },
      {
        // Content containing our DataList
        type: 'CardContent',
        childrenProps: [dataList],
      },
    ],
  };
}
