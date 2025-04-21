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
type IAutoViewTransformerInputType = Schema.org_hook;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Helper: generate a DataListItem for arbitrary label/value pairs
  const makeDataListItem = (
    label: string,
    value: IAutoView.IAutoViewPresentationComponentProps,
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: label },
    value,
  });

  // Build the core details list
  const detailsItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  detailsItems.push(
    makeDataListItem("ID", {
      type: "Text",
      content: input.id.toString(),
    }),
  );

  // Creation timestamp (ISO format; client can render localized)
  detailsItems.push(
    makeDataListItem("Created At", {
      type: "Text",
      content: input.created_at,
    }),
  );

  // Update timestamp
  detailsItems.push(
    makeDataListItem("Updated At", {
      type: "Text",
      content: input.updated_at,
    }),
  );

  // Primary Hook URL as a button
  detailsItems.push(
    makeDataListItem("Hook URL", {
      type: "Button",
      label: "Open",
      variant: "outlined",
      color: "primary",
      size: "small",
      href: input.url,
    }),
  );

  // Ping URL as a secondary button
  detailsItems.push(
    makeDataListItem("Ping URL", {
      type: "Button",
      label: "Ping",
      variant: "outlined",
      color: "secondary",
      size: "small",
      href: input.ping_url,
    }),
  );

  // Optional: deliveries_url
  if (input.deliveries_url) {
    detailsItems.push(
      makeDataListItem("Deliveries", {
        type: "Button",
        label: "View",
        variant: "outlined",
        color: "info",
        size: "small",
        href: input.deliveries_url,
      }),
    );
  }

  // Compose the DataList component
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: detailsItems,
  };

  // Build an events chip group if there are any events
  let eventsGroup: IAutoView.IAutoViewChipGroupProps | undefined;
  if (Array.isArray(input.events) && input.events.length > 0) {
    const chips = input.events.map((evt) => ({
      type: "Chip" as const,
      label: evt,
      size: "small" as const,
      variant: "outlined" as const,
      color: "primary" as const,
    }));
    eventsGroup = {
      type: "ChipGroup",
      childrenProps: chips,
    };
  }

  // Status chip for active/inactive
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.active ? "Active" : "Inactive",
    color: input.active ? "green" : "red",
    variant: "filled",
    size: "small",
  };

  // Header with a link icon
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.type,
    startElement: {
      type: "Icon",
      id: "link",
      size: 24,
      color: "blue",
    },
  };

  // CardContent containing the details list and optional events
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    detailsList,
  ];
  if (eventsGroup) contentChildren.push(eventsGroup);

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Footer with the status chip
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: statusChip,
  };

  // Final vertical card combining all parts
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
