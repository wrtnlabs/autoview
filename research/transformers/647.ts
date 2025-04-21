import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type simple_user = any;
    export type enterprise = any;
}
type IAutoViewTransformerInputType = Schema.integration[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Filter out any null entries (Schema.integration is nullable)
  const integrations = input.filter(
    (item): item is NonNullable<typeof item> => item != null,
  );

  // If there's no data, show a friendly markdown message
  if (integrations.length === 0) {
    return {
      type: "Markdown",
      content: "## No GitHub Apps Found\n\nThere are no integrations to display.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Sort by creation date descending so newest appear first
  integrations.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // Map each integration to a responsive ListItem
  const items: IAutoView.IAutoViewListItemProps[] = integrations.map(
    (integration) => {
      // Human‐readable dates
      const createdDate = new Date(integration.created_at).toLocaleDateString();
      const updatedDate = new Date(integration.updated_at).toLocaleDateString();

      // Some numeric metrics
      const installs = integration.installations_count ?? 0;
      const eventsCount = integration.events?.length ?? 0;

      // Build a multi‐line description; the ListItem will respect line breaks
      const descriptionLines: string[] = [];
      if (integration.description) {
        descriptionLines.push(integration.description.trim());
      }
      descriptionLines.push(`**Installs:** ${installs}`);
      descriptionLines.push(`**Events:** ${eventsCount}`);
      descriptionLines.push(`**Created:** ${createdDate}`);
      descriptionLines.push(`**Updated:** ${updatedDate}`);
      const description = descriptionLines.join("\n");

      // Build a badge showing the number of events at the end
      const eventBadge: IAutoView.IAutoViewBadgeProps = {
        type: "Badge",
        count: eventsCount,
        // Using a calendar icon to represent events
        childrenProps: {
          type: "Icon",
          id: "calendar",
          color: "gray",
          size: 16,
        },
      };

      // Build the GitHub icon at the start
      const ghIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "github",
        color: "gray",
        size: 24,
      };

      return {
        type: "ListItem",
        title: integration.name,
        description,
        startElement: ghIcon,
        endElement: eventBadge,
      };
    },
  );

  // Return the top‐level List component
  return {
    type: "List",
    childrenProps: items,
  } as IAutoView.IAutoViewListProps;
}
