import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ManagersView = {
            managers?: Schema.Manager[];
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
}
type IAutoViewTransformerInputType = Schema.desk.ManagersView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no managers, show a friendly markdown message
  if (!input.managers || input.managers.length === 0) {
    return {
      type: "Markdown",
      content: "### No managers available\n\nThere are currently no managers to display."
    };
  }

  // Map each manager into a DataListItem with rich visual elements
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.managers.map((manager) => {
    // Build the "label" column: avatar + name + optional description
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Avatar: use the URL if available, otherwise fallback to initials via `name`
    labelComponents.push({
      type: "Avatar",
      src: manager.avatarUrl,
      name: manager.name,
      variant: "primary",
      size: 40
    });

    // Manager name as a subtitle
    labelComponents.push({
      type: "Text",
      content: manager.name,
      variant: "subtitle1"
    });

    // If allowed, insert their description as markdown for better readability
    if (manager.showDescriptionToFront && manager.description) {
      labelComponents.push({
        type: "Markdown",
        content: manager.description
      });
    }

    // Build the "value" column: contact chips (email & phone)
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (manager.email && manager.showEmailToFront) {
      valueComponents.push({
        type: "Chip",
        label: manager.email,
        size: "small",
        variant: "outlined",
        color: "cyan",
        startElement: {
          type: "Icon",
          id: "envelope",
          size: 12,
          color: "gray"
        }
      });
    }

    if (manager.mobileNumber && manager.showMobileNumberToFront) {
      valueComponents.push({
        type: "Chip",
        label: manager.mobileNumber,
        size: "small",
        variant: "outlined",
        color: "teal",
        startElement: {
          type: "Icon",
          id: "phone",
          size: 12,
          color: "gray"
        }
      });
    }

    return {
      type: "DataListItem",
      // An array of components for the left column
      label: labelComponents,
      // Only include "value" if we have at least one contact chip
      value: valueComponents.length > 0 ? valueComponents : undefined
    };
  });

  // Wrap all items in a responsive two-column data list
  return {
    type: "DataList",
    childrenProps
  };
}
