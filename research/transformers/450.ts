import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Org Hook
     *
     * @title Org Hook
    */
    export type org_hook = {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        name: string;
        events: string[];
        active: boolean;
        config: {
            url?: string;
            insecure_ssl?: string;
            content_type?: string;
            secret?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        type: string;
    };
}
type IAutoViewTransformerInputType = Schema.org_hook[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message instead of an empty list.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No organization hooks available."
    };
  }

  // Helper to extract just the YYYY-MM-DD portion of an ISO timestamp.
  const formatDate = (iso: string): string => iso.split("T")[0];

  // Transform each hook into a ListItem with icons, badges, and action buttons.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((hook) => {
    // Prepare action buttons and badges for the endElement of the list item.
    const endElements: (IAutoView.IAutoViewButtonProps | IAutoView.IAutoViewBadgeProps)[] = [];

    // Primary URL button (link icon).
    if (hook.url) {
      endElements.push({
        type: "Button",
        size: "small",
        variant: "text",
        startElement: {
          type: "Icon",
          id: "link",
          size: 16 as const
        },
        href: hook.url
      });
    }

    // Ping endpoint button (bolt icon).
    if (hook.ping_url) {
      endElements.push({
        type: "Button",
        size: "small",
        variant: "text",
        startElement: {
          type: "Icon",
          id: "bolt",
          size: 16 as const
        },
        href: hook.ping_url
      });
    }

    // Deliveries endpoint button (list icon).
    if (hook.deliveries_url) {
      endElements.push({
        type: "Button",
        size: "small",
        variant: "text",
        startElement: {
          type: "Icon",
          id: "list",
          size: 16 as const
        },
        href: hook.deliveries_url
      });
    }

    // Badge showing the number of events subscribed to.
    endElements.push({
      type: "Badge",
      count: hook.events.length,
      childrenProps: {
        type: "Icon",
        id: "tags",
        size: 16 as const
      }
    });

    return {
      type: "ListItem",
      title: hook.name,
      // Condensed description: type, active state, and creation date.
      description: `Type: ${hook.type} • Active: ${hook.active} • Created: ${formatDate(hook.created_at)}`,
      // A cog icon colored by active status for quick visual cue.
      startElement: {
        type: "Icon",
        id: "cog",
        size: 20 as const,
        color: hook.active ? "green" : "gray"
      },
      endElement: endElements
    };
  });

  // Return a List component containing all the hooks.
  return {
    type: "List",
    childrenProps: listItems
  };
}
