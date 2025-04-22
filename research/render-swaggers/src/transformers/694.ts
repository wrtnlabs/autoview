import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Set repository secrets for GitHub Codespaces.
     *
     * @title Codespaces Secret
    */
    export type repo_codespaces_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.repo_codespaces_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO date strings into a compact, locale-aware form.
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    if (isNaN(d.valueOf())) {
      // Fallback to raw string if parsing fails
      return iso;
    }
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createdAt = formatDate(input.created_at);
  const updatedAt = formatDate(input.updated_at);

  // Compose a vertical card that shows:
  // - A header with the secret name and a key icon
  // - A data list with creation and update timestamps, each prefixed by a clock icon
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.name,
        startElement: {
          // Use a key icon to symbolize a secret
          type: "Icon",
          id: "key",
          size: 24,
          color: "gray",
        },
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: [
              {
                // Created timestamp
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Created",
                  variant: "subtitle2",
                },
                value: [
                  {
                    type: "Icon",
                    id: "clock",
                    size: 16,
                    color: "gray",
                  },
                  {
                    type: "Text",
                    content: createdAt,
                    variant: "body2",
                    color: "tertiary",
                  },
                ],
              },
              {
                // Updated timestamp
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Updated",
                  variant: "subtitle2",
                },
                value: [
                  {
                    type: "Icon",
                    id: "clock",
                    size: 16,
                    color: "gray",
                  },
                  {
                    type: "Text",
                    content: updatedAt,
                    variant: "body2",
                    color: "tertiary",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
