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
  // Destructure input for easier access
  const { manager, online } = input;

  // If there's no manager data, render a simple markdown informing the user
  if (!manager) {
    return {
      type: "Markdown",
      content: "### No manager data available\nPlease check back later or contact support."
    };
  }

  // Build the card header: show avatar if available, otherwise a generic user icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: manager.name,
    description: manager.showDescriptionToFront === false ? undefined : manager.description,
    startElement: manager.avatarUrl
      ? {
          type: "Avatar",
          src: manager.avatarUrl,
          name: manager.name,
          variant: "primary",
          size: 40
        }
      : {
          type: "Icon",
          id: "user-circle",
          size: 40,
          color: "gray"
        },
    // If the manager is currently online, show a status chip
    endElement: online
      ? {
          type: "Chip",
          label: "Online",
          color: "success",
          size: "small",
          variant: "filled"
        }
      : undefined
  };

  // Prepare a list of data items (email, phone, role)
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Email row
  if (manager.email) {
    dataItems.push({
      type: "DataListItem",
      label: [
        {
          type: "Icon",
          id: "envelope",
          size: 16,
          color: "gray"
        },
        {
          type: "Text",
          content: "Email",
          variant: "caption",
          color: "gray"
        }
      ],
      value: {
        type: "Text",
        content: manager.email,
        variant: "body2"
      }
    });
  }

  // Mobile number row
  if (manager.mobileNumber) {
    dataItems.push({
      type: "DataListItem",
      label: [
        {
          type: "Icon",
          id: "phone",
          size: 16,
          color: "gray"
        },
        {
          type: "Text",
          content: "Phone",
          variant: "caption",
          color: "gray"
        }
      ],
      value: {
        type: "Text",
        content: manager.mobileNumber,
        variant: "body2"
      }
    });
  }

  // Role row
  if (manager.roleId) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Role",
        variant: "caption",
        color: "gray"
      },
      value: {
        type: "Chip",
        label: manager.roleId,
        variant: "outlined",
        color: "secondary",
        size: "small"
      }
    });
  }

  // If there are no details to show, inform the user via markdown
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps = dataItems.length
    ? { type: "DataList", childrenProps: dataItems }
    : {
        type: "Markdown",
        content: "_No additional details available._"
      };

  // Assemble the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      { type: "CardContent", childrenProps: contentChildren }
    ]
  };

  return card;
}
