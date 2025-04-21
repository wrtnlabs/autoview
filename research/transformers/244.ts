import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ManagersInfiniteScrollingView = {
            next?: string;
            managers?: Schema.Manager[];
            onlines?: Schema.Online[];
            operatorStatuses?: Schema.operator.OperatorStatus[];
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
    export namespace operator {
        export type OperatorStatus = {
            id?: string;
            managerId: string;
            channelId: string;
            operatorStatusType?: "waiting" | "chat" | "call" | "postCall" | "meet" | "eat" | "rest" | "inMeeting" | "education" | "otherWork" | "off" | "vacation";
            enable?: boolean;
            createdAt?: number;
            updatedAt?: number;
            typeUpdatedAt?: number;
            version?: number & tags.Type<"int32">;
        };
    }
}
type IAutoViewTransformerInputType = Schema.desk.ManagersInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input with defaults for safety
  const {
    managers = [],
    onlines = [],
    operatorStatuses = [],
  } = input;

  // Build a set of online manager IDs for quick lookup
  const onlineManagerIds = new Set(onlines.map((o) => o.personId));

  // Map managerId to its latest operator status
  const statusMap: Record<string, Schema.operator.OperatorStatus> = {};
  for (const status of operatorStatuses) {
    if (status.managerId) {
      // If multiple statuses exist, latest in array wins (assuming input is time-ordered)
      statusMap[status.managerId] = status;
    }
  }

  // Utility to map status type to a chip color
  function getStatusColor(type: string): IAutoView.IAutoViewChipProps['color'] {
    switch (type) {
      case "waiting":
        return "warning";
      case "chat":
        return "success";
      case "call":
        return "info";
      case "meet":
        return "secondary";
      default:
        return "gray";
    }
  }

  // Compose a ListItem for each manager
  const listItems: IAutoView.IAutoViewListItemProps[] = managers.map((manager) => {
    const isOnline = manager.id != null && onlineManagerIds.has(manager.id);
    const status = manager.id != null ? statusMap[manager.id] : undefined;

    // Avatar: show image if URL provided, otherwise initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: manager.name,
      size: 40,
      ...(manager.avatarUrl ? { src: manager.avatarUrl } : {}),
    };

    // Online indicator: small circle icon
    const onlineIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "circle",
      size: 8,
      color: isOnline ? "green" : "gray",
    };

    // Status chip: only if we have a status entry
    const statusChip: IAutoView.IAutoViewChipProps | undefined = status
      ? {
          type: "Chip",
          label: status.operatorStatusType ?? "unknown",
          size: "small",
          variant: "outlined",
          color: getStatusColor(status.operatorStatusType ?? ""),
        }
      : undefined;

    // Build endElement array: online icon always, status chip if present
    const endElements = statusChip ? [onlineIcon, statusChip] : onlineIcon;

    return {
      type: "ListItem",
      // Primary text
      title: manager.name,
      // Use description if manager has it, otherwise show email if available
      description: manager.description ?? manager.email,
      startElement: avatar,
      endElement: endElements,
      // If manager has a profile URL or channel link, one could set href here
    };
  });

  // Return a List component wrapping all manager items
  return {
    type: "List",
    childrenProps: listItems,
  };
}
