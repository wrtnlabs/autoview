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
  // If no data or empty input, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No GitHub integrations found\nPlease check back later or install a new integration.",
    };
  }

  // Filter out any null entries that may have passed through
  const integrations = input.filter((i): i is Exclude<typeof i, null> => i !== null);

  // A small helper to pick a consistent avatar color variant based on slug
  const colorVariants: IAutoView.IAutoViewAvatarProps["variant"][] = [
    "primary", "secondary", "success", "error", "warning", "info",
    "red", "orange", "yellow", "lime", "green", "teal",
    "cyan", "blue", "indigo", "violet", "pink", "gray", "darkGray"
  ];
  function pickVariant(name?: string) {
    if (!name) return "gray";
    const idx = name.length % colorVariants.length;
    return colorVariants[idx];
  }

  // Transform each integration into a DataListItemProps
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = integrations.map(integration => {
    // Fallback text for missing fields
    const description = integration.description ?? "_No description provided._";
    const installCount = integration.installations_count ?? 0;
    const eventCount = Array.isArray(integration.events) ? integration.events.length : 0;

    return {
      type: "DataListItem",
      title: integration.name,
      // Use a markdown sub-component for description so links and formatting render nicely
      description: [
        {
          type: "Markdown",
          content: description,
        }
      ],
      // A simple avatar showing the name initials and colored by slug
      startElement: {
        type: "Avatar",
        name: integration.name,
        variant: pickVariant(integration.slug),
        size: 32,
      },
      // Show badges for installations and events, plus a button to view the app
      endElement: [
        // Installations badge
        {
          type: "Badge",
          count: installCount,
          showZero: true,
          maxCount: 999,
          childrenProps: {
            type: "Icon",
            id: "download",
            color: "blue",
            size: 16,
          },
        },
        // Events badge
        {
          type: "Badge",
          count: eventCount,
          showZero: true,
          childrenProps: {
            type: "Icon",
            id: "bolt",
            color: "yellow",
            size: 16,
          },
        },
        // View button linking to the integration's GitHub page
        {
          type: "Button",
          variant: "text",
          color: "primary",
          size: "small",
          startElement: {
            type: "Icon",
            id: "external-link-alt",
            color: "primary",
            size: 16,
          },
          label: ["View"],
          href: integration.html_url,
        },
      ],
    };
  });

  // Compose a DataList to render all items in a responsive list
  return {
    type: "DataList",
    childrenProps,
  };
}
