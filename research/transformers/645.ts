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
  // Filter out any null entries gracefully
  const integrations = input.filter((item): item is NonNullable<typeof item> => item != null);

  // If there's no data, show a friendly markdown message
  if (integrations.length === 0) {
    return {
      type: "Markdown",
      content: "### No GitHub integrations found.\n\nPlease check back later or install a new app."
    };
  }

  // Build a VerticalCard for each GitHub app integration
  const cards: IAutoView.IAutoViewVerticalCardProps[] = integrations.map(integration => {
    // Card header: app name, slug, and GitHub icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: integration.name,
      description: integration.slug,
      startElement: {
        type: "Icon",
        id: "github",    // FontAwesome brand icon for GitHub
        size: 32,
        color: "gray"
      }
    };

    // Card content: the app description rendered as Markdown
    const content: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // We pass a single Markdown child; if description is null, show placeholder
      childrenProps: {
        type: "Markdown",
        content: integration.description ?? "_No description provided._"
      }
    };

    // Event chips: show up to maxItems, overflow collapses into "+N"
    const eventChips: IAutoView.IAutoViewChipProps[] = integration.events.map(evt => ({
      type: "Chip",
      label: evt,
      variant: "outlined",
      size: "small",
      color: "primary"
    }));

    // A button to view the app on GitHub
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View on GitHub",
      href: integration.html_url,
      variant: "contained",
      color: "primary",
      startElement: {
        type: "Icon",
        id: "arrow-right",
        size: 16
      }
    };

    // Card footer: events and action button
    const footer: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: [
        {
          type: "ChipGroup",
          childrenProps: eventChips,
          maxItems: 5
        },
        viewButton
      ]
    };

    // Assemble and return the vertical card
    return {
      type: "VerticalCard",
      childrenProps: [header, content, footer]
    };
  });

  // Wrap all cards in a responsive carousel for mobile-friendly swiping
  const carousel: IAutoView.IAutoViewCarouselProps = {
    type: "Carousel",
    effect: "slide",
    navControls: true,
    indicators: true,
    infinite: false,
    interval: 40,
    gutter: 16,
    childrenProps: cards
  };

  return carousel;
}
