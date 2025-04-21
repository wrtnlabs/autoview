import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Key
     *
     * @title Key
    */
    export type key = {
        key: string;
        id: number & tags.Type<"int32">;
        url: string;
        title: string;
        created_at: string & tags.Format<"date-time">;
        verified: boolean;
        read_only: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Icon displayed next to the title in the card header
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: 'Icon',
    id: 'key',      // uses the 'key' icon from FontAwesome
    size: 24,
    color: 'yellow',
  };

  // Card header showing the resource title and its numeric ID
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.title,
    description: input.id.toString(),
    startElement: headerIcon,
  };

  // Convert the ISO timestamp into a locale-specific string
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Build a DataList; each DataListItem displays a specific field
  const items: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'ID', variant: 'subtitle2' },
      value: { type: 'Text', content: input.id.toString(), variant: 'body2' },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'URL', variant: 'subtitle2' },
      // A button that navigates to the provided URL
      value: {
        type: 'Button',
        variant: 'text',
        color: 'blue',
        size: 'small',
        label: 'Visit',
        href: input.url,
        startElement: { type: 'Icon', id: 'link', size: 16, color: 'blue' },
      },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Created At', variant: 'subtitle2' },
      value: { type: 'Text', content: formattedDate, variant: 'body2' },
    },
  ];

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // Main card content holds the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: dataList,
  };

  // Two chips representing the boolean flags (verified & read-only)
  const verifiedChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.verified ? 'Verified' : 'Unverified',
    color: input.verified ? 'success' : 'error',
    variant: 'filled',
    size: 'small',
  };
  const readOnlyChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.read_only ? 'Read Only' : 'Writable',
    color: input.read_only ? 'warning' : 'success',
    variant: input.read_only ? 'filled' : 'outlined',
    size: 'small',
  };

  // Group the status chips for a compact footer
  const statusGroup: IAutoView.IAutoViewChipGroupProps = {
    type: 'ChipGroup',
    childrenProps: [verifiedChip, readOnlyChip],
    maxItems: 2,
  };

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: [statusGroup],
  };

  // Assemble a vertical card with header, body, and footer
  return {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };
}
