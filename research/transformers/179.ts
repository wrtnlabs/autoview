import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ManagerView = {
        manager?: Manager;
        online?: Online;
    };
}
type Manager = {
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
    email?: string & tags.JsonSchemaPlugin<{
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
    roleId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    removed?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    removedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    displayAsChannel?: boolean;
    defaultGroupWatch?: "all" | "info" | "none";
    defaultDirectChatWatch?: "all" | "info" | "none";
    defaultUserChatWatch?: "all" | "info" | "none";
    chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
    meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
    showPrivateMessagePreview?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
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
    receiveUnassignedAlert?: boolean;
    receiveUnassignedChatAlert?: boolean;
    receiveUnassignedMeetAlert?: boolean;
    operator?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorStatusId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    defaultAllMentionImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    userMessageImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
    autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100> & tags.JsonSchemaPlugin<{
        format: "int32",
        readOnly: true
    }>;
    enableAutoAssignOnSync?: boolean;
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
    doNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    doNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    accountDoNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    accountDoNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    enableReactedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    enableTeamMentionedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorUpdatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    pcInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    pcTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    managerId?: string;
    avatarUrl?: string;
    /**
     * @deprecated
    */
    meetOperator?: boolean;
    emailForFront?: string;
    mobileNumberForFront?: string & tags.Default<"+18004424000">;
};
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
type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
};
type IAutoViewTransformerInputType = desk.ManagerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no manager data is provided, fall back to a simple markdown component.
  // This ensures that the UI informs the user of the missing data, rather than presenting a blank screen.
  if (!input.manager) {
    return {
      type: "Markdown",
      content: "No manager data available.",
    };
  }

  const manager = input.manager;

  // Create a Card Header component to showcase the manager's basic information.
  // We use an Avatar component (if available) as the starting visual element.
  // If the online status is provided in the input, we add an Icon to indicate the online state.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: manager.name,
    // Use the manager's avatar URL (if provided) to create an Avatar component.
    // The allowed avatar types come from IAutoView.IAutoViewAvatarProps.
    startElement: manager.avatarUrl
      ? {
          type: "Avatar",
          src: manager.avatarUrl,
          name: manager.name,
          // Choose a variant and size that suit the UI. The chosen values can be adjusted.
          variant: "primary",
          size: 40,
        }
      : undefined,
    // If online information is available, indicate the online status with an icon.
    // The Icon component accepts properties per IAutoView.IAutoViewIconProps.
    endElement: input.online
      ? {
          type: "Icon",
          id: "circle", // Assuming a circular icon to visually indicate "online" status.
          color: "green", // 'green' to imply online status.
          size: 16,
        }
      : undefined,
  };

  // Compose markdown content for the Card Content.
  // We use markdown to format additional information (description, email, mobile)
  // to provide a rich text experience which is responsive and visually engaging.
  let markdownContent = "";
  if (manager.description) {
    markdownContent += manager.description;
  }
  if (manager.email) {
    markdownContent += markdownContent ? "\n\n" : "";
    markdownContent += "**Email:** " + manager.email;
  }
  if (manager.mobileNumberForFront) {
    markdownContent += markdownContent ? "\n\n" : "";
    markdownContent += "**Mobile:** " + manager.mobileNumberForFront;
  }

  // Create a Card Content component that holds the markdown block.
  // Note: The childrenProps for CardContent accepts a single format as well as an array.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent
      ? {
          type: "Markdown",
          content: markdownContent,
        }
      : undefined,
  };

  // Finally, compose a Vertical Card component to encapsulate the header and main content.
  // VerticalCard is well-suited for mobile responsive layouts.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the final composed value which is of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
