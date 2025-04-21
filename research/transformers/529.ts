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
  // Map compute_service values to color variants for Avatar and Chip components
  const serviceColorMap: Record<string, IAutoView.IAutoViewAvatarProps['variant']> = {
    none: 'gray',
    actions: 'blue',
    codespaces: 'violet',
  };

  // Determine selected variant based on compute_service (fallback to 'none')
  const serviceKey = input.compute_service ?? 'none';
  const serviceVariant = serviceColorMap[serviceKey] || serviceColorMap.none;

  // Avatar representing the configuration (initial letter fallback)
  const avatarProps: IAutoView.IAutoViewAvatarProps = {
    type: 'Avatar',
    name: input.name,
    variant: serviceVariant,
    size: 40,
  };

  // Card header: show name and ID
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: avatarProps,
  };

  // Chip for compute_service
  const computeChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: serviceKey,
    color: serviceVariant,
    variant: 'filled',
  };

  // Chip for number of network settings, with a network icon
  const settingsCount = input.network_settings_ids?.length ?? 0;
  const settingsChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: `${settingsCount} setting${settingsCount !== 1 ? 's' : ''}`,
    startElement: {
      type: 'Icon',
      id: 'network-wired',
      color: 'teal',
    },
    variant: 'outlined',
  };

  // Card content: group the two chips
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'ChipGroup',
      childrenProps: [computeChip, settingsChip],
    } as IAutoView.IAutoViewChipGroupProps,
  };

  // Format the created_on date into a human-readable string or fallback
  let createdOnText: string;
  if (input.created_on) {
    const date = new Date(input.created_on);
    // Use locale-aware formatting
    createdOnText = date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    createdOnText = 'Unknown';
  }

  // Footer: render creation date using Markdown for emphasis
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: {
      type: 'Markdown',
      content: `**Created On:** ${createdOnText}`,
    },
  };

  // Compose the vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };

  return card;
}
