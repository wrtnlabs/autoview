import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ThreadStreamMessagesView = {
                    messages?: Schema.legacy.v4.message.LegacyV4Message[];
                    bots?: Schema.legacy.v4.LegacyV4Bot[];
                    users?: Schema.legacy.v4.LegacyV4User[];
                    supportBots?: Schema.legacy.v4.LegacyV4SupportBot[];
                    prev?: string;
                    next?: string;
                };
            }
        }
        export namespace v4 {
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
            export type LegacyV4User = {
                id?: string;
                channelId?: string;
                memberId?: string;
                veilId?: string;
                unifiedId?: string;
                name?: string;
                profile?: {
                    [key: string]: {};
                };
                profileOnce?: Schema.profile.UserProfile;
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                popUpChatId?: string;
                blocked?: boolean;
                unsubscribed?: boolean;
                hasChat?: boolean;
                hasPushToken?: boolean;
                language?: string & tags.Default<"en">;
                country?: string;
                city?: string;
                latitude?: number;
                longitude?: number;
                web?: Schema.WebInfo;
                mobile?: Schema.MobileInfo;
                sessionsCount?: number & tags.Type<"int32">;
                lastSeenAt?: number;
                createdAt?: number;
                updatedAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
                managedKey?: number & tags.Type<"int32">;
                member?: boolean;
                email?: string;
                userId?: string;
                avatarUrl?: string;
                managed?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                systemLanguage?: string & tags.Default<"en">;
            };
            export type LegacyV4SupportBot = {
                id?: string;
                channelId: string;
                pluginId?: string;
                botName: string;
                name: string;
                order: number & tags.Minimum<0>;
                pageQuery?: Schema.Expression;
                userQuery?: Schema.Expression;
                draft?: Schema.supportbot.SupportBotDraft;
                revisionId?: string;
                state: "draft" | "active" | "stopped";
                runMode: "always" | "away" | "inOperation" | "private";
                start?: number & tags.Type<"int32">;
                stop?: number & tags.Type<"int32">;
                chatOpen?: number & tags.Type<"int32">;
                createdAt?: number;
                updatedAt?: number;
                userChatExpireDuration?: string;
                managerId?: string;
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
    export namespace profile {
        export type UserProfile = {
            [key: string]: {};
        };
    }
    export type WebInfo = {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type MobileInfo = {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type Expression = {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: Schema.Operator;
        values?: {}[];
        and?: Schema.Expression[];
        or?: Schema.Expression[];
    };
    export type Operator = {};
    export namespace supportbot {
        export type SupportBotDraft = {
            supportBot?: Schema.supportbot.SupportBot;
            sections?: Schema.supportbot.SupportBotSection[];
        };
        export type SupportBot = {
            id?: string;
            channelId: string;
            botName: string;
            name: string;
            order: number & tags.Minimum<0>;
            pageQuery?: Schema.Expression;
            userQuery?: Schema.Expression;
            draft?: Schema.supportbot.SupportBotDraft;
            revisionId?: string;
            state: "draft" | "active" | "stopped";
            runMode: "always" | "away" | "inOperation" | "private";
            start?: number & tags.Type<"int32">;
            stop?: number & tags.Type<"int32">;
            chatOpen?: number & tags.Type<"int32">;
            createdAt?: number;
            updatedAt?: number;
            userChatExpireDuration?: string;
            managerId?: string;
        };
        export type SupportBotSection = {
            name?: string;
            actions?: Schema.userchat.UserChatStaticAction[];
            id?: string;
            steps?: Schema.supportbot.SupportBotSection_dollar_Step[];
            type: string;
        };
        export type SupportBotSection_dollar_Step = {
            message: Schema.message.NestedMessage;
        };
    }
    export namespace userchat {
        export type UserChatStaticAction = {
            type: string;
        };
    }
    export namespace message {
        export type NestedMessage = {
            blocks?: Schema.message.Block[];
            buttons?: Schema.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: Schema.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
            webPage?: Schema.message.WebPage;
            form?: Schema.message.form.Form;
        };
        export type Block = {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: Schema.message.Block[];
        };
        export type Button = {
            title: string;
            colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
            action: Schema.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        };
        export namespace action {
            export type Action = {
                attributes?: Schema.message.action.Attributes;
                type: string;
            };
            export type Attributes = {};
        }
        export type File = {
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
        export type WebPage = {
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
        export namespace form {
            export type Form = {
                submittedAt?: number;
                inputs?: Schema.message.form.FormInput[];
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
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ThreadStreamMessagesView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to convert legacy V4 blocks into a markdown string
  function blocksToMarkdown(
    blocks?: Schema.legacy.v4.message.LegacyV4Block[],
  ): string {
    if (!blocks || blocks.length === 0) return "";
    return blocks
      .map((b) => {
        switch (b.type) {
          case "code":
            // fenced code block with optional language
            return [
              "" + (b.language || ""),
              b.value || "",
              "```",
            ].join("\n");
          case "bullets":
            // flatten bullet lines; include nested blocks recursively
            const lines = (b.value || "").split("\n");
            const items = lines.map((line) => `- ${line}`);
            if (b.blocks) {
              // nested bullets or code/text
              items.push(blocksToMarkdown(b.blocks));
            }
            return items.join("\n");
          case "text":
          default:
            // plain text
            return b.value || "";
        }
      })
      .join("\n\n");
  }

  // Build lookup maps for users and bots by their id/key
  const userMap = new Map<string, Schema.legacy.v4.LegacyV4User>();
  (input.users || []).forEach((u) => {
    if (u && u.id) userMap.set(u.id, u);
  });
  const botMap = new Map<string, Schema.legacy.v4.LegacyV4Bot>();
  (input.bots || []).forEach((b) => {
    if (b && b.id) botMap.set(b.id, b);
  });
  // If there are no messages, render a friendly markdown notice
  if (!input.messages || input.messages.length === 0) {
    return {
      type: "Markdown",
      content: "**No messages to display.**",
    };
  }

  // Transform each message into a DataListItemProps
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = input.messages.map(
    (msg) => {
      // Determine sender (user or bot) info
      const senderType = msg.personType;
      let name = "Unknown";
      let avatarUrl: string | undefined;
      if (senderType === "user" && msg.personId) {
        const u = userMap.get(msg.personId);
        if (u) {
          name = u.name || "User";
          avatarUrl = u.avatarUrl;
        }
      } else if ((senderType === "bot" || senderType === "supportBot") && msg.personId) {
        const b = botMap.get(msg.personId);
        if (b) {
          name = b.name;
          avatarUrl = b.avatarUrl;
        }
      }
      // Fallback icon when no avatar image
      const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
        avatarUrl
          ? {
              type: "Avatar",
              src: avatarUrl,
              name,
              size: 32,
            }
          : {
              type: "Icon",
              id: senderType === "user" ? "user" : "robot",
              size: 32,
              color: "gray",
            };

      // Build a timestamp label if available
      let timeLabel = "";
      if (msg.createdAt) {
        try {
          timeLabel = new Date(msg.createdAt).toLocaleString();
        } catch {
          timeLabel = "";
        }
      }

      // Compose the markdown content: prefer plainText, else blocks
      let contentMd = msg.plainText?.trim() || blocksToMarkdown(msg.blocks);
      // Append web page preview link if present
      if (msg.webPage) {
        const wp = msg.webPage;
        const title = wp.title || wp.url;
        contentMd += `\n\n[${title}](${wp.url})`;
      }

      // Build label components: avatar/icon, name text, timestamp text
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        startElement,
        {
          type: "Text",
          content: name,
          variant: "subtitle1",
        },
      ];
      if (timeLabel) {
        labelComponents.push({
          type: "Text",
          content: timeLabel,
          variant: "caption",
          color: "tertiary",
        });
      }

      return {
        type: "DataListItem",
        label: labelComponents,
        value: {
          type: "Markdown",
          content: contentMd,
        },
      };
    },
  );

  // Main DataList containing all messages
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Navigation buttons for pagination if prev/next tokens exist
  const navButtons: IAutoView.IAutoViewButtonProps[] = [];
  if (input.prev) {
    navButtons.push({
      type: "Button",
      label: "Load previous",
      variant: "text",
      size: "small",
      href: input.prev,
    });
  }
  if (input.next) {
    navButtons.push({
      type: "Button",
      label: "Load more",
      variant: "contained",
      color: "primary",
      size: "small",
      href: input.next,
    });
  }

  // Compose the final UI as a vertical card with optional header and footer
  const children: (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  )[] = [
    {
      type: "CardHeader",
      title: "Conversation",
    },
    {
      type: "CardContent",
      childrenProps: dataList,
    },
  ];
  if (navButtons.length > 0) {
    children.push({
      type: "CardFooter",
      childrenProps: navButtons,
    });
  }

  return {
    type: "VerticalCard",
    childrenProps: children,
  };
}
