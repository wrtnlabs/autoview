import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsOrganizationSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: Schema.actions_secret[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsOrganizationSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms GitHub Actions organization secrets response into an AutoView component
function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // If there are no secrets, show a friendly markdown message
  if (!input.secrets || input.secrets.length === 0) {
    return {
      type: "Markdown",
      content:
        "# No Secrets Found\n" +
        "There are currently no secrets in this organization. " +
        "Add secrets to secure workflows and sensitive data."
    };
  }

  // Helper to format ISO date strings into a more readable form
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    // Fallback for invalid dates
    if (isNaN(d.getTime())) return iso;
    // Use locale string for better readability on mobile & desktop
    return d.toLocaleString();
  };

  // Build DataListItem for each secret
  const items: IAutoView.IAutoViewDataListItemProps[] = input.secrets.map(
    (secret) => ({
      type: "DataListItem",
      // Display the secret name prominently
      label: {
        type: "Text",
        variant: "body1",
        // Using markdown-style bold in Text content for emphasis
        content: `**${secret.name}**`
      },
      // Show the updated date with a clock icon
      value: [
        {
          type: "Icon",
          id: "clock",
          size: 16,
          color: "gray"
        },
        {
          type: "Text",
          variant: "caption",
          content: formatDate(secret.updated_at)
        }
      ]
    })
  );

  // Wrap items in a DataList for structured layout
  const list: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Compose a vertical card with a header and the data list
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Organization Secrets",
        description: `Total: ${input.total_count}`,
        // Use a lock icon to visually indicate "secrets"
        startElement: {
          type: "Icon",
          id: "lock",
          size: 20,
          color: "blue"
        }
      },
      {
        type: "CardContent",
        childrenProps: list
      }
    ]
  };

  return card;
}
