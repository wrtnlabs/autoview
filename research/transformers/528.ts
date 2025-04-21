import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A hosted compute network configuration.
     *
     * @title Hosted compute network configuration
    */
    export type network_configuration = {
        /**
         * The unique identifier of the network configuration.
        */
        id: string;
        /**
         * The name of the network configuration.
        */
        name: string;
        /**
         * The hosted compute service the network configuration supports.
        */
        compute_service?: "none" | "actions" | "codespaces";
        /**
         * The unique identifier of each network settings in the configuration.
        */
        network_settings_ids?: string[];
        /**
         * The time at which the network configuration was created, in ISO 8601 format.
        */
        created_on: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.network_configuration;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map compute_service to FontAwesome icon identifiers and colors.
  const computeService = input.compute_service ?? "none";
  const serviceIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    none: { id: "ban", color: "gray" },
    actions: { id: "cogs", color: "blue" },
    codespaces: { id: "code", color: "violet" },
  };

  const { id: iconId, color: iconColor } = serviceIconMap[computeService] || serviceIconMap.none;

  // Format creation timestamp for display, or fallback to "Unknown".
  const createdOnLabel = input.created_on
    ? new Date(input.created_on).toLocaleString()
    : "Unknown";

  // Build a DataList of key fields: Created On and Compute Service.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created On",
        variant: "caption",
        color: "secondary",
      },
      value: {
        type: "Text",
        content: createdOnLabel,
        variant: "body2",
        color: "gray",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Compute Service",
        variant: "caption",
        color: "secondary",
      },
      // Visualize the compute service as an icon rather than text.
      value: {
        type: "Icon",
        id: iconId,
        color: iconColor,
        size: 20,
      },
    },
  ];

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // If there are network_settings_ids, render them as a chip group.
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (Array.isArray(input.network_settings_ids) && input.network_settings_ids.length > 0) {
    // Create one chip per setting ID, small and outlined.
    const chips: IAutoView.IAutoViewChipProps[] = input.network_settings_ids.map((nid) => ({
      type: "Chip",
      label: nid,
      size: "small",
      variant: "outlined",
      color: "primary",
    }));
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chips,
      maxItems: 3,
    };
    footer = {
      type: "CardFooter",
      childrenProps: chipGroup,
    };
  }

  // Compose the card header with an icon and the primary network details.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.id,
    startElement: {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 28,
    },
  };

  // Compose the card content housing the DataList.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Assemble the vertical card with header, content, and optional footer.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer ? [header, content, footer] : [header, content],
  };

  return card;
}
