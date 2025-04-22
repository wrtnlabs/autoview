import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposEnvironmentsSecrets {
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
type IAutoViewTransformerInputType = Schema.IApiReposEnvironmentsSecrets.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Edge case: no secrets available
  if (!input.secrets || input.secrets.length === 0) {
    return {
      type: "Markdown",
      content: `### No Secrets Found

The repository environment has no secrets configured.`
    };
  }

  // Transform each secret into a DataListItem with visual components
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.secrets.map((secret) => {
    // Human‑readable date formatting (will render according to user's locale)
    const createdAt = new Date(secret.created_at).toLocaleString();
    const updatedAt = new Date(secret.updated_at).toLocaleString();

    return {
      type: "DataListItem",
      // Label section: lock icon + secret name
      label: [
        {
          type: "Icon",
          id: "lock",
          color: "teal",
          size: 16
        },
        {
          type: "Text",
          content: secret.name,
          variant: "body1"
        }
      ],
      // Value section: two chips showing created and updated timestamps
      value: [
        {
          type: "Chip",
          label: `Created: ${createdAt}`,
          variant: "outlined",
          size: "small",
          color: "info"
        },
        {
          type: "Chip",
          label: `Updated: ${updatedAt}`,
          variant: "outlined",
          size: "small",
          color: "info"
        }
      ]
    };
  });

  // Wrap the items in a DataList for responsive rendering
  return {
    type: "DataList",
    childrenProps: listItems
  };
}
