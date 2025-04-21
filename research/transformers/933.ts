import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export type codespaces_secret = {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url: string;
    };
}
type IAutoViewTransformerInputType = Schema.codespaces_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Convert ISO timestamps to locale strings for human-friendly display.
  const createdAt = new Date(input.created_at).toLocaleString();
  const updatedAt = new Date(input.updated_at).toLocaleString();

  // Map visibility values to chip colors for quick visual distinction.
  const visibilityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    all: "primary",
    private: "error",
    selected: "warning",
  };
  const chipColor = visibilityColorMap[input.visibility] ?? "gray";

  // Compose the VerticalCard with header, content (data list), and footer (action button).
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header shows the secret name, an icon, and a visibility chip.
        type: "CardHeader",
        title: input.name,
        description: "Codespaces Secret",
        startElement: {
          type: "Icon",
          id: "lock",            // lock icon to represent a secret
          size: 24,
          color: "gray",
        },
        endElement: {
          type: "Chip",
          label: input.visibility,
          variant: "outlined",
          color: chipColor,
        },
      },
      {
        // Card content contains a DataList of created/updated dates.
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: [
            {
              type: "DataListItem",
              // Use array of components for label: calendar icon + text
              label: [
                {
                  type: "Icon",
                  id: "calendar-plus",
                  size: 20,
                  color: "gray",
                },
                {
                  type: "Text",
                  content: "Created At",
                  variant: "body2",
                  color: "gray",
                },
              ],
              value: {
                type: "Text",
                content: createdAt,
                variant: "body1",
              },
            },
            {
              type: "DataListItem",
              label: [
                {
                  type: "Icon",
                  id: "calendar-check",
                  size: 20,
                  color: "gray",
                },
                {
                  type: "Text",
                  content: "Updated At",
                  variant: "body2",
                  color: "gray",
                },
              ],
              value: {
                type: "Text",
                content: updatedAt,
                variant: "body1",
              },
            },
          ],
        },
      },
      {
        // Card footer provides a button linking to the repositories URL.
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View Repositories",
          startElement: {
            type: "Icon",
            id: "link",
            size: 16,
            color: "blue",
          },
          href: input.selected_repositories_url,
          variant: "text",
          color: "primary",
        },
      },
    ],
  };
}
