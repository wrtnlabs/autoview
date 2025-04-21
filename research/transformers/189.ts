import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ThreadView = {
                    chat?: Schema.legacy.v4.LegacyV4Chat;
                    message?: Schema.legacy.v4.message.LegacyV4Message;
                    bot?: Schema.legacy.v4.LegacyV4Bot;
                    managers?: Schema.legacy.v4.LegacyV4Manager[];
                    thread?: Schema.legacy.v4.LegacyV4Thread;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Chat = {
                active?: boolean;
                channelId?: string;
                id?: string;
                managerIds?: string[] & tags.UniqueItems;
            };
            export namespace message {
                export type LegacyV4Message = {
                    chatKey?: string;
                    id?: string;
                    mainKey?: string;
                    threadKey?: string;
                    root?: boolean;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                    personType?: string;
                    personId?: string;
                    requestId?: string;
                    language?: string;
                    createdAt?: number;
                    version?: number & tags.Type<"int32">;
                    blocks?: Schema.legacy.v4.message.LegacyV4Block[];
                    plainText?: string;
                    updatedAt?: number;
                    buttons?: Schema.legacy.v4.message.LegacyV4Button[] & tags.MinItems<1> & tags.MaxItems<2>;
                    files?: Schema.legacy.v4.message.LegacyV4File[] & tags.MinItems<1> & tags.MaxItems<4>;
                    webPage?: Schema.legacy.v4.LegacyV4WebPage;
                    log?: Schema.legacy.v4.message.LegacyV4Log;
                    reactions?: Schema.legacy.v4.message.LegacyV4Reaction[];
                    profileBot?: Schema.legacy.v4.message.LegacyV4ProfileBotInput[] & tags.MinItems<1> & tags.MaxItems<2147483647>;
                    state?: "sending" | "sent" | "failed" | "removed";
                    options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent")[] & tags.UniqueItems;
                    marketing?: Schema.legacy.v4.message.LegacyV4MessageMarketing;
                    supportBot?: Schema.legacy.v4.message.LegacyV4MessageSupportBot;
                    threadMsg?: boolean;
                    broadcastedMsg?: boolean;
                    rootMessageId?: string;
                };
                export type LegacyV4Block = {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: Schema.legacy.v4.message.LegacyV4Block[];
                };
                export type LegacyV4Button = {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                };
                export type LegacyV4File = {
                    id: string;
                    type?: string;
                    name: string;
                    size: number & tags.Type<"int32">;
                    contentType?: string;
                    duration?: number;
                    width?: number & tags.Type<"int32">;
                    height?: number & tags.Type<"int32">;
                    orientation?: number & tags.Type<"int32">;
                    animated?: boolean;
                    bucket: string;
                    key: string;
                    previewKey?: string;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                };
                export type LegacyV4Log = {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                };
                export type LegacyV4Reaction = {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                };
                export type LegacyV4ProfileBotInput = {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: Schema.AttributeValue;
                };
                export type LegacyV4MessageMarketing = {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                };
                export type LegacyV4MessageSupportBot = {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: Schema.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                };
            }
            export type LegacyV4WebPage = {
                id: string;
                url: string;
                title?: string;
                description?: string;
                imageUrl?: string;
                videoUrl?: string;
                publisher?: string;
                author?: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
                bucket?: string;
                previewKey?: string;
                logo?: string;
                name?: string;
            };
            export type LegacyV4SupportBotRouteSection_dollar_LegacyV4Button = {
                text: string;
                nextSectionId: string;
            };
            export type LegacyV4Bot = {
                id?: string;
                channelId?: string;
                name: string;
                createdAt?: number;
                avatar?: Schema.legacy.v4.LegacyV4TinyFile;
                avatarUrl?: string;
                color: string & tags.Default<"#123456">;
            };
            export type LegacyV4TinyFile = {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            };
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
            export type LegacyV4Thread = {
                id?: string;
                channelId?: string;
                managerIds?: string[] & tags.UniqueItems;
                repliedManagerIds?: string[] & tags.UniqueItems;
                replyCount?: number & tags.Type<"int32">;
                lastMessageId?: string;
                version?: number & tags.Type<"int32">;
                updatedAt?: number;
                createdAt?: number;
                chatType?: string;
                chatId?: string;
                chatKey?: string;
                rootMessageId?: string;
            };
        }
    }
    export type AttributeValue = {
        s?: string;
        n?: string;
        b?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        };
        m?: {
            [key: string]: Schema.AttributeValue;
        };
        l?: Schema.AttributeValue[];
        ss?: string[];
        ns?: string[];
        bs?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        }[];
        "null"?: boolean;
        bool?: boolean;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ThreadView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract useful pieces, providing defaults to avoid undefined dereferences
  const bot = input.bot;
  const managers = input.managers ?? [];
  const msg = input.message;
  const thread = input.thread;
  const chat = input.chat;

  // 1. Build Bot Avatar for header
  const botAvatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    // Use bot.avatarUrl if available, fallback to initials via name
    src: bot?.avatarUrl,
    name: bot?.name,
    variant: "primary",
    size: 40,
  };

  // 2. Build CardHeader displaying the bot and chat id
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: bot?.name ?? "Conversation",
    description: chat?.id, // chat identifier
    startElement: botAvatar,
  };

  // 3. Build the list of messages (even if only one) as a DataList
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (msg) {
    // 3a. Decide on an avatar or icon for the message sender
    let senderAvatarOrIcon: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
    // If the message is from the bot, reuse its avatar
    if (msg.personId && bot?.id === msg.personId) {
      senderAvatarOrIcon = botAvatar;
    }
    // If it's from a known manager, show their avatar
    else if (msg.personId) {
      const mgr = managers.find((m) => m.id === msg.personId);
      if (mgr) {
        senderAvatarOrIcon = {
          type: "Avatar",
          src: mgr.avatarUrl,
          name: mgr.name,
          variant: "secondary",
          size: 32,
        };
      } else {
        // Unknown person: fallback to a generic icon
        senderAvatarOrIcon = {
          type: "Icon",
          id: "user",
          color: "gray",
          size: 24,
        };
      }
    } else {
      // No personId: use a comment icon
      senderAvatarOrIcon = {
        type: "Icon",
        id: "comment",
        color: "gray",
        size: 24,
      };
    }

    // 3b. Build a title text showing who spoke and when
    const who = msg.personType ? msg.personType : "Unknown";
    const timeLabel = msg.createdAt
      ? new Date(msg.createdAt).toLocaleTimeString()
      : "";
    const titleText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: [`${who}${timeLabel ? " · " + timeLabel : ""}`],
      variant: "subtitle2",
      color: "secondary",
    };

    // 3c. Combine plainText and structured blocks into markdown content
    let assembled = "";
    if (msg.blocks && msg.blocks.length) {
      // Flatten nested blocks, marking code blocks appropriately
      const renderBlock = (b: typeof msg.blocks[0]): string => {
        if (b.type === "code" && b.value) {
          // Wrap code in fenced block
          const lang = b.language ?? "";
          return `\`\`\`${lang}\n${b.value}\n\`\`\``;
        }
        return b.value ?? "";
      };
      assembled = msg.blocks.map(renderBlock).join("\n\n");
    }
    // Append plain text as fallback
    if (msg.plainText) {
      if (assembled) assembled += "\n\n";
      assembled += msg.plainText;
    }
    // If we still have nothing, show a placeholder
    if (!assembled) {
      assembled = "_No content_";
    }

    const markdownComp: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: assembled,
    };

    // 3d. Construct the DataListItem
    const listItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      // label can be an array: avatar/icon and a title text
      label: [senderAvatarOrIcon, titleText],
      // value is the message body
      value: markdownComp,
    };

    dataListItems.push(listItem);
  }

  // Wrap messages into a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // 4. Wrap the DataList into CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // 5. Build a footer showing participating managers as an AvatarGroup
  const managerAvatars: IAutoView.IAutoViewAvatarProps[] = managers.map((m) => ({
    type: "Avatar",
    src: m.avatarUrl,
    name: m.name,
    variant: "success",
    size: 28,
  }));
  const avatarGroup: IAutoView.IAutoViewAvatarGroupProps = {
    type: "AvatarGroup",
    childrenProps: managerAvatars,
    maxItems: 4,
    totalItems: managers.length,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: avatarGroup,
  };

  // 6. Combine header, content, and footer into a VerticalCard
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
