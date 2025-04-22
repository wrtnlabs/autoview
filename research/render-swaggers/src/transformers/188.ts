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
  const { chat, message, bot, managers = [], thread } = input;

  // Build the card header: bot avatar + name, fallback to thread ID if no bot
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: bot?.name ?? `Thread ${thread?.id ?? "Unknown"}`,
    description: chat?.channelId ?? "",
    // If bot has an avatarUrl or avatar, show it, else we rely on initials via name
    startElement: {
      type: "Avatar",
      src: bot?.avatarUrl,
      name: bot?.name,
      size: 40,
    },
    // Show count of managers as a chip
    endElement: managers.length > 0
      ? {
          type: "Chip",
          label: `${managers.length} manager${managers.length > 1 ? "s" : ""}`,
          variant: "outlined",
        }
      : undefined,
  };

  // Optionally show a preview image for a web page snippet
  const media: IAutoView.IAutoViewCardMediaProps | undefined =
    message?.webPage?.imageUrl
      ? {
          type: "CardMedia",
          src: message.webPage.imageUrl,
        }
      : undefined;

  // Build the content: primary message body as markdown or fallback text
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (message?.plainText) {
    // Prefer markdown for rich text rendering
    contentChildren.push({
      type: "Markdown",
      content: message.plainText,
    });
  } else {
    contentChildren.push({
      type: "Text",
      content: "No message content available.",
    });
  }

  // Attach any file previews (images) or file links
  if (message?.files && message.files.length > 0) {
    // Render image files inline; other files as markdown links
    message.files.forEach((file) => {
      if (file.contentType?.startsWith("image/")) {
        contentChildren.push({
          type: "Image",
          src: `https://your.cdn.com/${file.bucket}/${file.key}`,
          alt: file.name,
        });
      } else {
        // Fallback: link in markdown
        contentChildren.push({
          type: "Markdown",
          content: `[📄 ${file.name}](https://your.cdn.com/${file.bucket}/${file.key})`,
        });
      }
    });
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build metadata footer: replies, version, timestamps
  const footerListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (typeof thread?.replyCount === "number") {
    footerListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Replies" }],
      value: [{ type: "Text", content: thread.replyCount.toString() }],
    });
  }
  if (typeof thread?.version === "number") {
    footerListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Version" }],
      value: [{ type: "Text", content: thread.version.toString() }],
    });
  }
  // Show the most relevant timestamp: message createdAt, then thread.updatedAt
  const ts = message?.createdAt ?? thread?.updatedAt;
  if (typeof ts === "number") {
    footerListItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Date" }],
      value: [
        {
          type: "Text",
          content: new Date(ts).toLocaleString(),
        },
      ],
    });
  }

  // Only include footer if we have metadata
  const footer: IAutoView.IAutoViewCardFooterProps | undefined =
    footerListItems.length > 0
      ? {
          type: "CardFooter",
          childrenProps: {
            type: "DataList",
            childrenProps: footerListItems,
          },
        }
      : undefined;

  // Compose the vertical card with header, optional media, content, and footer
  const cardChildren: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardMediaProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [header];
  if (media) cardChildren.push(media);
  cardChildren.push(content);
  if (footer) cardChildren.push(footer);

  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
