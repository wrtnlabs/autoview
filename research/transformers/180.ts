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
  // Extract manager and online data from the input.
  const manager = input.manager;
  const online = input.online;

  // If there is no manager data, return a simple Markdown component indicating that.
  if (!manager) {
    return {
      type: "Markdown",
      content: "## No Manager Data Available\n\nPlease check back later."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Build a CardHeader component.
  // Use manager's avatar URL if available, otherwise display a default user icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: manager.name,
    description: manager.description || "",
    // The startElement can either be an Avatar or an Icon.
    startElement: manager.avatarUrl
      ? {
          type: "Avatar",
          src: manager.avatarUrl,
          name: manager.name,
          // Select a standard size for responsiveness.
          size: 40
        }
      : {
          type: "Icon",
          id: "user", // using a generic user icon id in kebab-case (without fa prefix)
          // Optionally set a default color and size to make the icon more prominent.
          color: "blue",
          size: 24
        }
  };

  // Create a Markdown string showing additional manager details.
  // Markdown is used to allow rich text rendering and mobile-friendly formatting.
  const markdownContentLines: string[] = [];
  markdownContentLines.push("## Manager Profile");
  // Display email if available.
  markdownContentLines.push(`**Email:** ${manager.email ? manager.email : "Not provided"}`);
  // Display mobile number if available.
  markdownContentLines.push(`**Mobile:** ${manager.mobileNumber ? manager.mobileNumber : "Not provided"}`);
  // Add online status information if available.
  if (online && (online.id || online.personId)) {
    markdownContentLines.push(`**Status:** Online`);
  } else {
    markdownContentLines.push(`**Status:** Offline`);
  }
  // Additional details can be added here as necessary.
  const markdownContent = markdownContentLines.join("\n\n");

  // Build a CardContent component using the Markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single component; here we use the Markdown component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Finally, assemble everything in a Vertical Card to create an engaging UI.
  // A Vertical Card is chosen for its simplicity and responsiveness.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps is an array of presentation components.
    childrenProps: [cardHeader, cardContent]
  };

  // Return the assembled UI component.
  return verticalCard;
}
