import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ManagersInfiniteScrollingView = {
                    managers?: Schema.legacy.v4.LegacyV4Manager[];
                    onlines?: Schema.legacy.v4.LegacyV4Online[];
                    next?: string;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Manager = {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: Schema.NameDesc;
                };
                profile?: {
                    [key: string]: {};
                };
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: Schema.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
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
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ManagersInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // If there are no managers, display a friendly markdown message
  if (!input.managers || input.managers.length === 0) {
    return {
      type: "Markdown",
      content: "*No managers found.*",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Helper: determine if a manager is currently online
  const isManagerOnline = (managerId?: string): boolean => {
    if (!managerId || !input.onlines) return false;
    return input.onlines.some((o) => o.personId === managerId);
  };

  // Build a list item for each manager
  const listItems: IAutoView.IAutoViewListItemProps[] = input.managers.map(
    (mgr) => {
      const online = isManagerOnline(mgr.id);

      // Avatar: use mgr.avatarUrl if available, otherwise show initials
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        name: mgr.name,
        src: mgr.avatarUrl,
        // size left undefined to use default
      };

      // If online, wrap avatar in a green dot badge
      const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewBadgeProps =
        online
          ? {
              type: "Badge",
              dot: true,
              color: "success",
              childrenProps: avatar,
            }
          : avatar;

      // Description logic: show description only if allowed, else fallback to email
      const description =
        mgr.showDescriptionToFront && mgr.description
          ? mgr.description
          : mgr.email;

      // Visual chip showing the manager's role
      const roleChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: mgr.role,
        variant: "outlined",
        color: mgr.role === "owner" ? "error" : "info",
        size: "small",
      };

      return {
        type: "ListItem",
        title: mgr.name,
        description,
        startElement,
        // display role on the right side
        endElement: roleChip,
      };
    },
  );

  // If there's a pagination token, append a "Load More" button item
  if (input.next) {
    const loadMoreButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "Load More",
      variant: "text",
      color: "primary",
      size: "medium",
      href: input.next,
    };
    listItems.push({
      type: "ListItem",
      // Title can be blank or guiding text
      title: " ",
      endElement: loadMoreButton,
    });
  }

  // Return a responsive list component for mobile/web
  return {
    type: "List",
    childrenProps: listItems,
  } as IAutoView.IAutoViewListProps;
}
