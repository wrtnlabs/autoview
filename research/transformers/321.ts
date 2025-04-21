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
type IAutoViewTransformerInputType = Schema.integration;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle the case where there's no integration data
  if (input === null) {
    return {
      type: "Markdown",
      content: "### No Integration Data\nNo integration data available.",
    };
  }

  // Utility to safely format ISO date strings into locale representations
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      // Fallback to original string if parsing fails
      return iso;
    }
  };

  // Build a markdown list of the integration's properties
  const detailsLines: string[] = [];

  if (input.slug) {
    detailsLines.push(`- **Slug:** \`${input.slug}\``);
  }
  detailsLines.push(`- **External URL:** [Visit](${input.external_url})`);
  detailsLines.push(`- **HTML URL:** [Repository Page](${input.html_url})`);
  detailsLines.push(`- **Created At:** ${formatDate(input.created_at)}`);
  detailsLines.push(`- **Updated At:** ${formatDate(input.updated_at)}`);

  const markdownContent = ["#### Integration Details", ...detailsLines].join("\n");

  // If there are event subscriptions, render them as a group of chips
  let footerComponent: IAutoView.IAutoViewChipGroupProps | undefined;
  if (Array.isArray(input.events) && input.events.length > 0) {
    const chips: IAutoView.IAutoViewChipProps[] = input.events.map((evt) => ({
      type: "Chip",
      label: evt,
      variant: "outlined",
      size: "small",
      color: "teal",
    }));
    footerComponent = {
      type: "ChipGroup",
      childrenProps: chips,
    };
  }

  // Compose a vertical card summarizing the GitHub App integration
  const cardChildren: IAutoView.IAutoViewVerticalCardProps["childrenProps"] = [
    {
      // Header with avatar and basic info
      type: "CardHeader",
      title: input.name,
      description: input.description ?? undefined,
      startElement: {
        type: "Avatar",
        // Show the app name initials if no image is provided
        name: input.name,
        variant: "primary",
        size: 32,
      },
    },
    {
      // Main content as markdown for rich text display
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: markdownContent,
      },
    },
  ];

  // Append the footer only if we have events to display
  if (footerComponent) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: footerComponent,
    });
  }

  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
