import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type GroupView = {
            managers?: Schema.Manager[];
            onlines?: Schema.Online[];
            bookmark?: Schema.ChatBookmark;
            session?: Schema.ChatSession;
            group?: Schema.Group;
        };
    }
    export type Manager = {
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
        email?: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        roleId?: string;
        removed?: boolean;
        createdAt?: number;
        updatedAt?: number;
        removedAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
        meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
        showPrivateMessagePreview?: boolean;
        operatorScore?: number;
        touchScore?: number;
        avatar?: Schema.TinyFile;
        operatorEmailReminder?: boolean;
        receiveUnassignedAlert?: boolean;
        receiveUnassignedChatAlert?: boolean;
        receiveUnassignedMeetAlert?: boolean;
        operator?: boolean;
        operatorStatusId?: string;
        defaultAllMentionImportant?: boolean;
        userMessageImportant?: boolean;
        assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
        autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        enableAutoAssignOnSync?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        doNotDisturb?: boolean;
        doNotDisturbClearAt?: number;
        accountDoNotDisturb?: boolean;
        accountDoNotDisturbClearAt?: number;
        enableReactedMessageIndex?: boolean;
        enableTeamMentionedMessageIndex?: boolean;
        operatorUpdatedAt?: number;
        pcInboxMeetAlert?: boolean;
        mobileInboxMeetAlert?: boolean;
        pcTeamChatMeetAlert?: boolean;
        mobileTeamChatMeetAlert?: boolean;
        managerId?: string;
        avatarUrl?: string;
        /**
         * @deprecated
        */
        meetOperator?: boolean;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
    };
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
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
    export type ChatBookmark = {
        key?: string;
        chatId?: string;
        chatKey?: string;
        bookmarkKey?: string;
        channelId?: string;
        version?: number & tags.Type<"int32">;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
    export type ChatSession = {
        key?: string;
        chatId?: string;
        teamChatSectionId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        allMentionImportant?: boolean;
        readAt?: number;
        receivedAt?: number;
        postedAt?: number;
        updatedAt?: number;
        createdAt?: number;
        version?: number & tags.Type<"int32">;
        id?: string;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
    export type Group = {
        id?: string;
        channelId?: string;
        title: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
        scope: "all" | "public" | "private";
        managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        liveMeetId?: string;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        /**
         * @deprecated
        */
        name?: string;
        active?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.desk.GroupView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If all sections are empty or missing, show a fallback message
  const hasData =
    !!input.group ||
    (input.managers?.length ?? 0) > 0 ||
    (input.onlines?.length ?? 0) > 0 ||
    !!input.bookmark ||
    !!input.session;
  if (!hasData) {
    return {
      type: "Text",
      content: "No group data available",
      variant: "body1",
    };
  }

  // Collect children for the VerticalCard
  const cardChildren: IAutoView.IAutoViewVerticalCardProps["childrenProps"] = [];

  // 1. Header: show group title, description, and an icon if present
  if (input.group) {
    const { title, description, icon, id } = input.group;
    const startElement: IAutoView.IAutoViewIconProps | undefined = icon
      ? {
          type: "Icon",
          id: icon,
          size: 36,
          color: "blue",
        }
      : undefined;

    cardChildren.push({
      type: "CardHeader",
      title,
      description,
      ...(startElement ? { startElement } : {}),
    });
  }

  // 2. Content: build a DataList of managers, online users, bookmark, session
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 2.a Managers list
  if (input.managers && input.managers.length > 0) {
    input.managers.forEach((manager) => {
      // Avatar for the manager
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        src: manager.avatarUrl,
        name: manager.name,
        variant: "info",
        size: 32,
      };
      // Manager name
      const nameText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: manager.name,
        variant: "body1",
      };
      // Manager detail (email or description)
      const detailText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: manager.email || manager.description || "No details",
        variant: "body2",
        color: "secondary",
      };
      listItems.push({
        type: "DataListItem",
        label: [avatar, nameText],
        value: detailText,
      });
    });
  }

  // 2.b Online users avatar group
  if (input.onlines && input.onlines.length > 0) {
    const avatars = input.onlines.map((online) => {
      const name = online.personId || online.id || "User";
      return {
        type: "Avatar",
        name,
        variant: "success",
        size: 24,
      } as IAutoView.IAutoViewAvatarProps;
    });
    const avatarGroup: IAutoView.IAutoViewAvatarGroupProps = {
      type: "AvatarGroup",
      childrenProps: avatars,
      maxItems: Math.min(avatars.length, 5),
      totalItems: avatars.length,
    };
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Online Users",
        variant: "body1",
      },
      value: avatarGroup,
    });
  }

  // 2.c Bookmark tooltip
  if (input.bookmark) {
    const icon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "bookmark",
      size: 20,
      color: "teal",
    };
    const tooltip: IAutoView.IAutoViewTooltipProps = {
      type: "Tooltip",
      message: input.bookmark.bookmarkKey || input.bookmark.chatKey || "Bookmark",
      childrenProps: icon,
    };
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Bookmark",
        variant: "body1",
      },
      value: tooltip,
    });
  }

  // 2.d Session unread badge
  if (input.session) {
    const envelope: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "envelope",
      size: 20,
      color: "blue",
    };
    const badge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: input.session.unread,
      showZero: false,
      maxCount: 99,
      childrenProps: envelope,
      color: "error",
    };
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Unread Messages",
        variant: "body1",
      },
      value: badge,
    });
  }

  // Only add the DataList if we have items
  if (listItems.length > 0) {
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: listItems,
    };
    cardChildren.push({
      type: "CardContent",
      childrenProps: dataList,
    });
  }

  // 3. Footer: navigational button to the group details page
  if (input.group && input.group.id) {
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View Details",
      variant: "contained",
      color: "primary",
      size: "medium",
      href: `/group/${input.group.id}`,
    };
    cardChildren.push({
      type: "CardFooter",
      childrenProps: viewButton,
    });
  }

  // Final assembly: a responsive vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
  return verticalCard;
}
