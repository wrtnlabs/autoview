import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Set secrets for GitHub Actions.
     *
     * @title Actions Secret
    */
    export type actions_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.actions_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Parse ISO date-time strings into JS Date objects
  const createdDate = new Date(input.created_at);
  const updatedDate = new Date(input.updated_at);

  // Format for display; if parsing fails, fall back to raw string
  const createdStr = isNaN(createdDate.getTime())
    ? input.created_at
    : createdDate.toLocaleString();
  const updatedStr = isNaN(updatedDate.getTime())
    ? input.updated_at
    : updatedDate.toLocaleString();

  // Compose a DataList of timestamps for created/updated dates
  const timestampList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Created At",
          variant: "subtitle2",
          color: "gray"
        },
        value: {
          type: "Text",
          content: createdStr,
          variant: "body1",
          color: "primary"
        }
      },
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Updated At",
          variant: "subtitle2",
          color: "gray"
        },
        value: {
          type: "Text",
          content: updatedStr,
          variant: "body1",
          color: "primary"
        }
      }
    ]
  };

  // Return a VerticalCard to visually encapsulate the secret details
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with lock icon for context
        type: "CardHeader",
        title: input.name,
        description: "GitHub Actions Secret",
        startElement: {
          type: "Icon",
          id: "lock",
          color: "indigo",
          size: 24
        }
      },
      {
        // Card content showing the creation/update timestamps
        type: "CardContent",
        childrenProps: [timestampList]
      }
    ]
  };
}
