import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ChannelView = {
        channel?: Channel;
        manager?: Manager;
        managerBadge?: ManagerBadge;
    };
}
type Channel = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    welcomeMessage: message.NestedMessage;
    welcomeMessageI18nMap?: {
        [key: string]: message.NestedMessage;
    };
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    userInfoUrl?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    trafficSource?: {
        [key: string]: {};
    };
    billAccountId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    name: string & tags.Pattern<"^[^@#$%:/\\x08\\\\]+$">;
    nameDescI18nMap?: {
        [key: string]: NameDesc;
    };
    coverImageColor?: string & tags.Default<"#123456">;
    botName: string;
    color: string & tags.Default<"#123456">;
    description?: string;
    country?: string;
    domain?: string;
    homepageUrl?: string;
    phoneNumber?: string & tags.Default<"+18004424000">;
    timeZone: string & tags.Default<"UTC">;
    showOperatorProfile?: boolean;
    disableNewChatButton?: boolean;
    indebtedDueDate?: string & tags.Format<"date"> & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    followUpTexting: boolean;
    followUpEmail: boolean;
    followUpAskName?: boolean;
    followUpMandatory?: boolean;
    state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
    entVerified?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
    defaultPluginId?: string;
    workingType?: "always" | "never" | "custom";
    sourceSurvey?: {
        [key: string]: {};
    };
    bizCategory?: string;
    staffs?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    appCommerceId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    appCommerceType?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    appCommerceDomain?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    enableMemberHash?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    defaultEmailDomainId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    enableMfa?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    hideAppMessenger?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    baseTutorialCompleted: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    bizCertificated?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mktAlimtalkAllowed?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    bizCertificatedCountries?: string[] & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    managedUserChatRetentionDuration?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    blocked?: boolean;
    working?: boolean;
    avatarUrl?: string;
    expectedResponseDelay?: "instant" | "normal" | "delayed";
    inOperation?: boolean;
    operationTimeScheduling?: boolean;
    nextWorkingTime?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    nextAwayTime?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    operationTimeRanges?: TimeRange[];
    awayOption?: "active" | "disabled" | "hidden";
    blockReplyingAfterClosed?: boolean;
    blockReplyingAfterClosedTime?: string;
    /**
     * @deprecated
    */
    bright?: boolean;
    borderColor?: string;
    gradientColor?: string;
    textColor?: string;
    nextOperatingAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    usingFollowUp?: boolean;
    initial?: string;
    utcOffset?: string;
    systemDomain?: string;
    pluginIconColor?: string;
    brightness?: number & tags.JsonSchemaPlugin<{
        format: "float"
    }>;
    coverImageUrl?: string;
    coverImageBright?: boolean;
    dayUntilIndebted?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
namespace message {
    export type NestedMessage = {
        blocks?: message.Block[];
        buttons?: message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
        files?: message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
        webPage?: message.WebPage;
        form?: message.form.Form;
    };
    export type Block = {
        type: "bullets" | "code" | "text";
        language?: string;
        value?: string;
        blocks?: message.Block[];
    };
    export type Button = {
        title: string;
        colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
        action: message.action.Action;
        /**
         * @deprecated
        */
        url?: string;
    };
    export namespace action {
        export type Action = {
            attributes?: message.action.Attributes;
            type: string;
        };
        export type Attributes = {};
    }
    export type File = {
        id: string;
        type?: string;
        name: string;
        size: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int64"
        }>;
        contentType?: string;
        duration?: number & tags.JsonSchemaPlugin<{
            format: "double"
        }>;
        width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
        height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
        orientation?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
        animated?: boolean;
        bucket: string;
        key: string;
        previewKey?: string;
        channelId?: string;
        chatType?: string;
        chatId?: string;
    };
    export type WebPage = {
        id: string;
        url: string;
        title?: string;
        description?: string;
        imageUrl?: string;
        videoUrl?: string;
        publisher?: string;
        author?: string;
        width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
        height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
        bucket?: string;
        previewKey?: string;
        logo?: string;
        name?: string;
    };
    export namespace form {
        export type Form = {
            submittedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            inputs?: message.form.FormInput[];
            type: string;
        };
        export type FormInput = {
            value?: {};
            readOnly?: boolean;
            type?: "text" | "number" | "bool" | "date" | "datetime" | "radio" | "singleSelect" | "checkbox" | "multiSelect";
            label?: string;
            bindingKey?: string;
            dataType?: "string" | "date" | "list" | "listOfNumber" | "number" | "datetime" | "boolean";
            userChatProfileBindingKey?: boolean;
            userProfileBindingKey?: boolean;
        };
    }
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
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
type ManagerBadge = {
    id?: string;
    teamChatAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    teamChatUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    userChatAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    userChatUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    teamChatThreadAlert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    teamChatThreadUnread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    managerId?: string;
    alert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    unread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = desk.ChannelView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function convertNestedMessageToMarkdown(nested: message.NestedMessage): string {
  // Converts a nested message into a markdown string.
  // For simplicity, we iterate over the blocks and join their text.
  if (!nested) return "";
  const lines: string[] = [];
  if (nested.blocks && Array.isArray(nested.blocks)) {
    nested.blocks.forEach((block) => {
      // Depending on the block type, format appropriately.
      if (block.value) {
        if (block.type === "code") {
          // Render code block in markdown fenced-code format.
          lines.push("" + (block.language || "") + "\n" + block.value + "\n```");
        } else if (block.type === "bullets") {
          // Render bullet list items.
          lines.push("- " + block.value);
        } else {
          // Fallback for text and other types.
          lines.push(block.value);
        }
      }
      // Process nested blocks recursively if they exist.
      if (block.blocks && Array.isArray(block.blocks)) {
        block.blocks.forEach((subBlock) => {
          if (subBlock.value) {
            lines.push(subBlock.value);
          }
        });
      }
    });
  }
  return lines.join("\n\n");
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract input data objects.
  const channel = input.channel;
  const manager = input.manager;
  const managerBadge = input.managerBadge;

  // Construct the CardHeader to visually summarize the channel.
  // This header uses an Avatar (if the channel provides an image) as its start element,
  // and displays the channel name and description.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: (channel && channel.name) || "Untitled Channel",
    description: channel && channel.description ? channel.description : undefined,
    startElement: channel && channel.avatarUrl
      ? {
          type: "Avatar",
          src: channel.avatarUrl,
          name: channel.name,
          // Choosing an allowed size value that provides balance on both mobile and desktop.
          size: 40,
          variant: "primary"
        }
      : undefined,
    // Use the manager's name as an end element (displayed in a textual form with emphasis)
    endElement: manager
      ? {
          type: "Text",
          content: manager.name,
          variant: "subtitle2",
          color: "primary"
        }
      : undefined
  };

  // Construct CardContent: render the channel's welcome message using Markdown.
  // Markdown is used to enhance the visual layout while keeping text when needed.
  let welcomeMarkdown = "";
  if (channel && channel.welcomeMessage) {
    welcomeMarkdown = convertNestedMessageToMarkdown(channel.welcomeMessage);
  }
  // Provide a meaningful fallback message if no welcome message is available.
  if (!welcomeMarkdown) {
    welcomeMarkdown = "## Welcome!\n\nNo welcome message available.";
  }
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: welcomeMarkdown
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Construct CardFooter: incorporate manager information visually.
  // If manager details exist, create a Chip that displays the manager's name, with a badge (if available)
  let footerElement: IAutoView.IAutoViewComponentProps | undefined = undefined;
  if (manager) {
    let label = manager.name;
    // Append unread user chat count if the managerBadge provides that information.
    if (managerBadge && typeof managerBadge.userChatUnread === "number") {
      label += ` (${managerBadge.userChatUnread})`;
    }
    // Using a Chip allows a compact and visually appealing representation.
    footerElement = {
      type: "Chip",
      label: label,
      variant: "outlined",
      // Add an icon to denote a user; note that the id must be in kebab-case without a prefix.
      startElement: {
        type: "Icon",
        id: "user",
        size: 16,
        color: "blue"
      } as IAutoView.IAutoViewIconProps
    } as IAutoView.IAutoViewChipProps;
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerElement
  };

  // Assemble the final vertical card.
  // The card is designed to be responsive and visually engaging,
  // combining header, content, and footer components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the composed vertical card as the final UI component.
  return verticalCard;
}
