import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Porter Author
     *
     * @title Porter Author
    */
    export type porter_author = {
        id: number & tags.Type<"int32">;
        remote_id: string;
        remote_name: string;
        email: string;
        name: string;
        url: string & tags.Format<"uri">;
        import_url: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.porter_author;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Generate up to two initials from the author's name for the avatar
  const nameParts = input.name ? input.name.trim().split(/\s+/) : [];
  const initials = nameParts.length
    ? nameParts.map(part => part.charAt(0).toUpperCase()).slice(0, 2).join('')
    : '';

  // Avatar showing the author's initials
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: initials || undefined,
    variant: "primary",
    size: 40,
  };

  // A chip displaying the remote source name
  const remoteChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.remote_name,
    color: "secondary",
    size: "small",
    variant: "filled",
  };

  // Helper to build a text label
  const makeLabel = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant: "subtitle2",
  });

  // Helper to build a linked button with an icon
  const makeLinkButton = (
    href: string,
    label: string,
    iconId: string
  ): IAutoView.IAutoViewButtonProps => ({
    type: "Button",
    variant: "text",
    color: "blue",
    size: "small",
    href,
    startElement: {
      type: "Icon",
      id: iconId,
      size: 16,
      color: "blue",
    },
    label,
  });

  // Build the individual data list items for each field
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: makeLabel("ID"),
      value: {
        type: "Text",
        content: input.id.toString(),
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: makeLabel("Remote ID"),
      value: {
        type: "Text",
        content: input.remote_id,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: makeLabel("Email"),
      value: makeLinkButton(`mailto:${input.email}`, input.email, "envelope"),
    },
    {
      type: "DataListItem",
      label: makeLabel("URL"),
      value: makeLinkButton(input.url, input.url, "link"),
    },
    {
      type: "DataListItem",
      label: makeLabel("Import URL"),
      value: makeLinkButton(input.import_url, input.import_url, "link"),
    },
  ];

  // Wrap all items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card header with avatar, name, email, and remote source chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.email,
    startElement: avatar,
    endElement: remoteChip,
  };

  // Card content wrapping the DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Final vertical card combining header and content
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return verticalCard;
}
