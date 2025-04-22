import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ManagerView = {
            manager?: Schema.Manager;
            online?: Schema.Online;
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
}
type IAutoViewTransformerInputType = Schema.desk.ManagerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { manager, online } = input;

  // If there's no manager information, display a simple markdown message.
  if (!manager) {
    return {
      type: 'Markdown',
      content: '## No manager data available',
    };
  }

  // Build an avatar or fallback icon for the manager.
  // If an avatar URL is present, use it; otherwise, show a generic user icon.
  const avatarElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = manager.avatarUrl
    ? {
        type: 'Avatar',
        src: manager.avatarUrl,
        name: manager.name,
        variant: 'primary',
        size: 40,
      }
    : {
        type: 'Icon',
        id: 'user',
        color: 'gray',
        size: 40,
      };

  // Card header: Displays name, optional description, and avatar/icon.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: manager.name,
    // Only show description if flagged to display it
    description:
      manager.showDescriptionToFront && manager.description
        ? manager.description
        : undefined,
    startElement: avatarElement,
  };

  // Prepare a list of DataListItemProps for key details.
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Email entry, rendered as a mailto link via Markdown.
  if (manager.showEmailToFront && manager.email) {
    items.push({
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Email', variant: 'subtitle2' },
      ],
      value: {
        type: 'Markdown',
        content: `[${manager.email}](mailto:${manager.email})`,
      },
    });
  }

  // Mobile number entry, rendered as a tel link.
  if (manager.showMobileNumberToFront && manager.mobileNumber) {
    items.push({
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Mobile', variant: 'subtitle2' },
      ],
      value: {
        type: 'Markdown',
        content: `[${manager.mobileNumber}](tel:${manager.mobileNumber})`,
      },
    });
  }

  // Online status as a colored chip: green = online, gray = offline.
  const isOnline = Boolean(online && online.id);
  items.push({
    type: 'DataListItem',
    label: [
      { type: 'Text', content: 'Status', variant: 'subtitle2' },
    ],
    value: {
      type: 'Chip',
      label: isOnline ? 'Online' : 'Offline',
      color: isOnline ? 'green' : 'gray',
      size: 'small',
      variant: 'filled',
    },
  });

  // Role identifier.
  if (manager.roleId) {
    items.push({
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Role', variant: 'subtitle2' },
      ],
      value: {
        type: 'Text',
        content: manager.roleId,
        variant: 'body2',
      },
    });
  }

  // Operator and touch scores as numeric stats.
  if (typeof manager.operatorScore === 'number') {
    items.push({
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Operator Score', variant: 'subtitle2' },
      ],
      value: {
        type: 'Text',
        content: String(manager.operatorScore),
        variant: 'body2',
      },
    });
  }
  if (typeof manager.touchScore === 'number') {
    items.push({
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Touch Score', variant: 'subtitle2' },
      ],
      value: {
        type: 'Text',
        content: String(manager.touchScore),
        variant: 'body2',
      },
    });
  }

  // Wrap the list items in a DataList component.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // Card content holding the DataList.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: dataList,
  };

  // Final vertical card combining header and content.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };

  return card;
}
