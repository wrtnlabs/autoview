import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4ManagersInfiniteScrollingView = {
                managers?: legacy.v4.LegacyV4Manager[];
                onlines?: legacy.v4.LegacyV4Online[];
                next?: string;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Manager = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            accountId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            description?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showDescriptionToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            nameDescI18nMap?: {
                [key: string]: NameDesc;
            };
            profile?: {
                [key: string]: {};
            };
            email: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showEmailToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            mobileNumber?: string & tags.Default<"+18004424000"> & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            showMobileNumberToFront?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            role: "owner" | "member";
            removed?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            displayAsChannel?: boolean;
            defaultGroupWatch?: "all" | "info" | "none";
            defaultDirectChatWatch?: "all" | "info" | "none";
            defaultUserChatWatch?: "all" | "info" | "none";
            operatorScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            touchScore?: number & tags.JsonSchemaPlugin<{
                format: "float",
                readOnly: true
            }>;
            avatar?: TinyFile;
            operatorEmailReminder?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            operator?: boolean;
            statusEmoji?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusText?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            statusClearAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            managerId?: string;
            avatarUrl?: string;
            emailForFront?: string;
            mobileNumberForFront?: string & tags.Default<"+18004424000">;
        };
        export type LegacyV4Online = {
            channelId?: string;
            personType?: string;
            personId?: string;
            id?: string;
        };
    }
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4ManagersInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // This function converts legacy data into a composite UI structure using AutoView components.
  // We create a VerticalCard that contains a header, one or two DataLists (one for managers and optionally one for online statuses)
  // and a footer button for loading more items if provided.
  
  // Create DataList items for managers.
  const managerItems: IAutoView.IAutoViewDataListItemProps[] = (input.managers || []).map(manager => {
    // Build an avatar component if an avatar URL is provided.
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: manager.avatarUrl, // if not provided, it falls back to showing initials via "name"
      name: manager.name,
      size: 40, // using a medium size
      variant: "primary"
    };
    
    // Build a text component for the manager's name.
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: manager.name,
      variant: "subtitle1",
      color: "primary"
    };

    // Create a Markdown component to display additional details.
    const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Email:** ${manager.email}\n\n**Role:** ${manager.role}\n\n${manager.description ? `**Description:** ${manager.description}` : ""}`
    };

    return {
      type: "DataListItem",
      // The label uses an array: first the avatar then the name.
      label: [avatar, nameText],
      // The value displays extra details in markdown format.
      value: detailsMarkdown
    };
  });

  // If no managers are available, provide a placeholder item.
  if (!managerItems.length) {
    managerItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "No managers available",
        variant: "body1",
        color: "gray"
      },
      value: {
        type: "Markdown",
        content: "There are currently no manager records to display."
      }
    });
  }
  
  // Create the managers DataList component.
  const managersDataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: managerItems
  };

  // If online data is provided, create a separate DataList for online statuses.
  let onlineDataList: IAutoView.IAutoViewDataListProps | undefined = undefined;
  if (input.onlines && input.onlines.length > 0) {
    const onlineItems: IAutoView.IAutoViewDataListItemProps[] = input.onlines.map(online => {
      // Use an icon to represent an online indicator.
      const onlineIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "user-check", // assuming 'user-check' is a valid icon name in kebab-case without prefix
        size: 24,
        color: "green"
      };

      // Use Markdown to present online user's basic info.
      const onlineInfo: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `**Person Type:** ${online.personType || "N/A"}\n\n**User ID:** ${online.personId || "Unknown"}`
      };

      return {
        type: "DataListItem",
        label: onlineIcon,
        value: onlineInfo
      };
    });
  
    // Assemble the online DataList.
    onlineDataList = {
      type: "DataList",
      childrenProps: onlineItems
    };
  }
  
  // Optionally create a footer with a load-more button if a next URL is provided.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.next) {
    const loadMoreButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "Load More",
      variant: "contained",
      color: "primary",
      href: input.next
    };
    cardFooter = {
      type: "CardFooter",
      childrenProps: loadMoreButton
    };
  }
  
  // Create a card header for the overall view.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Managers Overview",
    description: "List of managers with additional online status information"
  };
  
  // Compose the card content. We wrap the managers DataList,
  // and if available, we add the online DataList under a markdown title.
  const cardContentChildren: (IAutoView.IAutoViewPresentationComponentProps)[] = [];
  
  // First, add the managers DataList.
  cardContentChildren.push(managersDataList);
  
  // If onlineDataList exists, add a markdown header then the online list.
  if (onlineDataList) {
    // Markdown component to act as a section header.
    const onlineHeader: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "### Online Managers"
    };
    cardContentChildren.push(onlineHeader);
    cardContentChildren.push(onlineDataList);
  }
  
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: cardContentChildren
  };
  
  // Compose the final vertical card incorporating all parts.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, ...(cardFooter ? [cardFooter] : [])]
  };
  
  // Return the final transformed component props
  return verticalCard;
}
