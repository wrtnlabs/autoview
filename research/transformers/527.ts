import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsSettingsNetworkConfigurations {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            network_configurations: Schema.network_configuration[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiOrgsSettingsNetworkConfigurations.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no configurations, show a friendly markdown message.
  if (input.network_configurations.length === 0) {
    return {
      type: "Markdown",
      content: "### No network configurations found.\nPlease check back later or create a new configuration."
    };
  }

  // Map compute service types to a chip color.
  const serviceColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    none: "gray",
    actions: "cyan",
    codespaces: "violet"
  };

  // Build the list children: first a subheader, then one ListItem per configuration.
  const children: (IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps)[] = [];

  // Show total count at the top.
  children.push({
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: [
      {
        type: "Text",
        // Use a subtitle variant to make it stand out.
        variant: "subtitle1",
        content: `Total configurations: ${input.total_count}`
      }
    ]
  });

  // For each network configuration, create a list item with visual chips and an icon.
  input.network_configurations.forEach((cfg) => {
    // Format the creation date for display.
    const createdOnText = cfg.created_on
      ? new Date(cfg.created_on).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      : "N/A";

    // Compute the number of network settings.
    const settingsCount = Array.isArray(cfg.network_settings_ids)
      ? cfg.network_settings_ids.length
      : 0;

    // Build a chip to represent the compute service type.
    const serviceChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: cfg.compute_service ? cfg.compute_service : "none",
      color: serviceColorMap[cfg.compute_service || "none"] || "gray",
      variant: "outlined",
      size: "small"
    };

    // Build a chip to represent the number of network settings.
    const countChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${settingsCount} setting${settingsCount === 1 ? "" : "s"}`,
      color: settingsCount > 0 ? "primary" : "gray",
      variant: "filled",
      size: "small"
    };

    // Create the list item for this configuration.
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: cfg.name,
      description: `Created on: ${createdOnText}`,
      // Show service chip as an icon-like start element.
      startElement: serviceChip,
      // Show the settings count chip on the right.
      endElement: [countChip]
    };

    children.push(item);
  });

  // Return a responsive list component containing all items.
  return {
    type: "List",
    childrenProps: children
  };
}
