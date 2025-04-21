import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4MessagesView = {
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4MessagesView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build lookup maps for users and bots by their IDs
  const userMap = new Map<string, Schema.legacy.v4.LegacyV4User>();
  input.users?.forEach(u => {
    if (u.id) userMap.set(u.id, u);
  });
  const botMap = new Map<string, Schema.legacy.v4.LegacyV4Bot>();
  input.bots?.forEach(b => {
    if (b.id) botMap.set(b.id, b);
  });

  // Transform each message into a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = (input.messages || []).map(msg => {
    // Determine sender display name
    let name = "Unknown";
    if (msg.personType === "user" && msg.personId) {
      name = userMap.get(msg.personId)?.name || name;
    } else if (msg.personType === "bot" && msg.personId) {
      name = botMap.get(msg.personId)?.name || name;
    }

    // Format timestamp for display
    const timestamp = msg.createdAt
      ? new Date(msg.createdAt).toLocaleString()
      : "";

    // Label: display user/bot name and timestamp
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      { type: "Text", content: name, variant: "subtitle2" },
      { type: "Text", content: timestamp, variant: "caption", color: "gray" }
    ];

    // Build content: combine plain text and blocks into a single markdown string
    let md = "";
    if (msg.plainText) {
      md += msg.plainText;
    }
    if (msg.blocks) {
      for (const block of msg.blocks) {
        if (block.type === "code") {
          const lang = block.language || "";
          md += `\n\n\`\`\`${lang}\n${block.value || ""}\n\`\`\``;
        } else if (block.type === "bullets") {
          const list = (block.value || "")
            .split("\n")
            .map(line => `- ${line}`)
            .join("\n");
          md += `\n\n${list}`;
        } else if (block.type === "text") {
          md += `\n\n${block.value || ""}`;
        }
      }
    }

    // Compose the array of presentation components for the message body
    const contentParts: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (md.trim()) {
      contentParts.push({ type: "Markdown", content: md.trim() });
    }

    // If there are file attachments, show a badge with a file icon
    if (msg.files && msg.files.length > 0) {
      const fileIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "file",
        size: 16
      };
      contentParts.push({
        type: "Badge",
        count: msg.files.length,
        childrenProps: fileIcon
      });
    }

    // Fallback when a message has neither text nor attachments
    if (contentParts.length === 0) {
      contentParts.push({
        type: "Text",
        content: "(no content)",
        variant: "caption",
        color: "gray"
      });
    }

    return {
      type: "DataListItem",
      label,
      value: contentParts
    };
  });

  // If there are no messages, show a placeholder text
  const listOrPlaceholder: IAutoView.IAutoViewPresentationComponentProps =
    items.length > 0
      ? { type: "DataList", childrenProps: items }
      : {
          type: "Text",
          content: "No messages available",
          variant: "body2",
          color: "gray"
        };

  // Card header with overall statistics
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Messages (${items.length})`,
    description: `Users: ${input.users?.length || 0}, Bots: ${input.bots?.length || 0}`
  };

  // Card content wrapping the list or placeholder
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: listOrPlaceholder
  };

  // Card footer with pagination controls if provided
  const footerButtons: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.prev) {
    footerButtons.push({
      type: "Button",
      label: "Previous",
      startElement: { type: "Icon", id: "arrow-left", size: 16 },
      href: input.prev
    });
  }
  if (input.next) {
    footerButtons.push({
      type: "Button",
      label: "Next",
      endElement: { type: "Icon", id: "arrow-right", size: 16 },
      href: input.next
    });
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButtons.length ? footerButtons : undefined
  };

  // Compose everything into a vertical card for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
