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
  // Remove any null entries from the input array
  const integrations = input.filter(
    (item): item is NonNullable<typeof item> => item !== null
  );

  // If there are no integrations to show, render a simple markdown message
  if (integrations.length === 0) {
    return {
      type: "Markdown",
      content: 
        "### No Integrations Available\n" +
        "There are currently no GitHub apps to display."
    };
  }

  // Transform each integration into a ListItem component
  const childrenProps: IAutoView.IAutoViewListItemProps[] = integrations.map(
    (integration) => {
      // Build a short description with key metadata
      const permissionsCount = Object.keys(integration.permissions).length;
      const createdDate = integration.created_at.split("T")[0]; // YYYY-MM-DD

      return {
        type: "ListItem",
        title: integration.name,
        description: 
          `Slug: ${integration.slug ?? "n/a"} • ` +
          `Created: ${createdDate} • ` +
          `Events: ${integration.events.length} • ` +
          `Permissions: ${permissionsCount}`,
        // Show an avatar with the app's name initials
        startElement: {
          type: "Avatar",
          name: integration.name
        },
        // Make the entire item clickable to the app's page
        href: integration.html_url,
        // Add a small 'View' button for clarity
        endElement: {
          type: "Button",
          label: "View",
          variant: "outlined",
          size: "small",
          color: "primary",
          href: integration.html_url
        }
      };
    }
  );

  // Wrap the items in a responsive List component
  return {
    type: "List",
    childrenProps
  };
}
