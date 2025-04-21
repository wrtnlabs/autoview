import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsSecrets {
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { total_count, secrets } = input;

  // Sort secrets by most recently updated
  const sortedSecrets = [...secrets].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // If there are no secrets, show a friendly markdown message
  if (sortedSecrets.length === 0) {
    return {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: `## Actions Secrets

_No secrets found_`,
      },
    };
  }

  // Build a DataListItem for each secret, showing name and timestamps as chips
  const listItems: IAutoView.IAutoViewDataListItemProps[] = sortedSecrets.map(
    (secret) => ({
      type: "DataListItem",
      // Label combines an icon and the secret name
      label: [
        {
          type: "Icon",
          id: "key",
          color: "teal",
          size: 20,
        },
        {
          type: "Text",
          variant: "body1",
          content: secret.name,
        },
      ],
      // Value shows created/updated dates as outlined chips
      value: [
        {
          type: "Chip",
          label: `Created: ${new Date(secret.created_at).toLocaleDateString()}`,
          variant: "outlined",
          color: "gray",
          size: "small",
        },
        {
          type: "Chip",
          label: `Updated: ${new Date(secret.updated_at).toLocaleDateString()}`,
          variant: "outlined",
          color: "blue",
          size: "small",
        },
      ],
    })
  );

  // Wrap the list items in a DataList component
  const secretsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Compose a vertical card with a header and the list of secrets
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "GitHub Actions Secrets",
        description: `${total_count} secret${total_count === 1 ? "" : "s"}`,
        startElement: {
          type: "Icon",
          id: "key",
          color: "cyan",
          size: 24,
        },
      },
      {
        type: "CardContent",
        childrenProps: secretsList,
      },
    ],
  };
}
