import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type MessageView = {
        message?: Schema.Message;
        bot?: Schema.bot.CustomBot;
        user?: Schema.user.User;
        savedMessage?: Schema.IndexedMessage;
    };
    export type Message = {
        chatKey: string;
        id: string;
        mainKey?: string;
        threadKey?: string;
        meetKey?: string;
        frontKey?: string;
        channelId: string;
        chatType: string;
        chatId: string;
        personType: string;
        personId: string;
        requestId?: string;
        language?: string;
        createdAt: number;
        version?: number & tags.Type<"int32">;
        blocks?: Schema.message.Block[];
        plainText?: string;
        updatedAt?: number;
        inboundEmailId?: string;
        thread?: Schema.message.MessageThread;
        meet?: Schema.message.meet.MessageMeet;
        removerKey?: string;
        buttons?: Schema.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
        files?: Schema.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
        webPage?: Schema.message.WebPage;
        log?: Schema.message.Log;
        reactions?: Schema.message.Reaction[];
        form?: Schema.message.form.Form;
        state?: "sending" | "sent" | "failed" | "removed";
        options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent" | "silentToManager" | "silentToUser")[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        marketing?: Schema.message.userchat.MessageMarketing;
        supportBot?: Schema.message.userchat.MessageSupportBot;
        workflow?: Schema.message.userchat.MessageWorkflow;
        alf?: Schema.message.alf.MessageAlf;
        alertLevel?: "alert" | "unread" | "none";
        ivr?: Schema.meet.ivr.MessageIvr;
        threadMsg?: boolean;
        meetMsg?: boolean;
        broadcastedMsg?: boolean;
        workflowButton?: boolean;
        rootMessageId?: string;
        removedByWriter?: boolean;
        threadRoot?: boolean;
        meetRoot?: boolean;
    };
    export namespace message {
        export type Block = {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: Schema.message.Block[];
        };
        export type MessageThread = {
            id?: string;
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
            repliedManagerIds?: string[] & tags.UniqueItems;
            replyCount?: number & tags.Type<"int32">;
            chatType?: string;
            chatId?: string;
            rootMessageId?: string;
        };
        export namespace meet {
            export type MessageMeet = {
                id?: string;
                chatType?: string;
                channelId?: string;
                state?: "live" | "ended" | "transcribing" | "transcribed" | "transcribeFailed";
                mode?: "audio" | "video";
                amassedPersons?: string[] & tags.UniqueItems;
                roomStartedAt?: number;
                call?: Schema.message.meet.Call;
                front?: Schema.message.meet.Front;
                recording?: Schema.message.meet.Recording;
                country?: string;
                stateV2?: "live" | "ended" | "transcribing" | "transcribed" | "transcribeFailed";
                meetEndedAt?: number;
                managerIds?: string[] & tags.UniqueItems;
                meetType?: "front" | "call" | "team";
            };
            export type Call = {
                id?: string;
                from?: string & tags.Default<"+18004424000">;
                to?: string & tags.Default<"+18004424000">;
                direction?: "inbound" | "outbound";
                callServerIp?: string;
                missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
                firstWaitingStartedAt?: number;
                createAt?: number;
                engagedAt?: number;
                closedAt?: number;
                missedHandledAt?: number;
                voiceMail?: boolean;
                userPhoneNumberType?: "mobileNumber" | "landlineNumber";
            };
            export type Front = {
                id?: string;
                direction?: "inbound" | "outbound";
                missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
                engagedAt?: number;
                firstWaitingStartedAt?: number;
                missedHandledAt?: number;
            };
            export type Recording = {
                id: string;
                bucket: string;
                key: string;
                contentType?: string;
                duration?: number;
                size?: number & tags.Type<"int32"> & tags.Maximum<10485760>;
                name?: string;
                type?: "file" | "image" | "video" | "audio";
                channelId?: string;
                chatType?: string;
                chatId?: string;
            };
        }
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
        export type Log = {
            action?: "changeName" | "changeScope" | "close" | "autoClose" | "create" | "invite" | "join" | "assign" | "autoAssign" | "unassign" | "leave" | "open" | "autoOpen" | "enqueue" | "remove" | "snooze" | "addTags" | "removeTags" | "assignTeam" | "unassignTeam" | "joinMeet" | "leaveMeet" | "inviteMeet" | "missMeet" | "callbackMeet" | "processBranch" | "sendXms" | "addUserTags" | "removeUserTags" | "updatePriority" | "startWorkflow" | "endWorkflow" | "interruptWorkflow" | "interruptWorkflowByBot" | "tryOpenWithAlf";
            values?: string[];
            triggerType?: string;
            triggerId?: string;
        };
        export type Reaction = {
            emojiName: string;
            personKeys?: string[] & tags.UniqueItems;
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
        export namespace userchat {
            export type MessageMarketing = {
                type?: string;
                id?: string;
                advertising?: boolean;
                sendToOfflineXms?: boolean;
                sendToOfflineEmail?: boolean;
                exposureType?: "fullScreen";
            };
            /**
             * @deprecated
            */
            export type MessageSupportBot = {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                stepIndex?: number & tags.Type<"int32">;
                buttons?: Schema.supportbot.SupportBotRouteSection_dollar_Button[];
                submitButtonIndex?: number & tags.Type<"int32">;
            };
            export type MessageWorkflow = {
                id?: string;
                revisionId?: string;
                sectionId?: string;
                actionIndex?: number & tags.Type<"int32">;
                submitButtonId?: string;
                buttonBotMessage?: boolean;
            };
        }
        export namespace alf {
            export type MessageAlf = {
                type?: "complete" | "rag" | "incomplete" | "impossible" | "command" | "faq" | "failed" | "rateLimited" | "openUserChat" | "system";
                references?: Schema.message.alf.Reference[];
                mentionAlfAnswered?: boolean;
            };
            export type Reference = {
                index?: string;
                type: string;
            };
        }
    }
    export namespace supportbot {
        export type SupportBotRouteSection_dollar_Button = {
            text: string;
            nextSectionId: string;
        };
    }
    export namespace meet {
        export namespace ivr {
            export type MessageIvr = {
                audioFile?: Schema.message.File;
            };
        }
    }
    export namespace bot {
        export type CustomBot = {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: Schema.NameDesc;
            };
            createdAt?: number;
            avatar?: Schema.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        };
    }
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
    export namespace user {
        export type User = {
            id?: string;
            channelId?: string;
            memberId?: string;
            veilId?: string;
            unifiedId?: string;
            type?: "member" | "lead" | "unified";
            name?: string;
            mobileNumberQualified?: boolean;
            emailQualified?: boolean;
            profile?: {
                [key: string]: {};
            };
            profileOnce?: Schema.profile.UserProfile;
            tags?: string[] & tags.MinItems<0> & tags.MaxItems<20> & tags.UniqueItems;
            userImportTags?: string[] & tags.MinItems<0> & tags.MaxItems<30>;
            alert?: number & tags.Type<"int32">;
            unread?: number & tags.Type<"int32">;
            popUpChatId?: string;
            blocked?: boolean;
            blockedKey?: string;
            unsubscribeEmail?: boolean;
            unsubscribeEmailUpdatedAt?: number;
            unsubscribeTexting?: boolean;
            unsubscribeTextingUpdatedAt?: number;
            hasChat?: boolean;
            mainChatId?: string;
            hasPushToken?: boolean;
            language?: string & tags.Default<"en">;
            country?: string;
            timeZone?: string;
            province?: string;
            city?: string;
            latitude?: number;
            longitude?: number;
            web?: Schema.WebInfo;
            mobile?: Schema.MobileInfo;
            sessionsCount?: number & tags.Type<"int32">;
            lastSeenAt?: number;
            createdAt?: number;
            updatedAt?: number;
            version?: number & tags.Type<"int32">;
            managedKey?: number & tags.Type<"int32">;
            named?: boolean;
            member?: boolean;
            email?: string;
            avatarUrl?: string;
            mobileNumber?: string & tags.Default<"+18004424000">;
            landlineNumber?: string & tags.Default<"+18004424000">;
            constrainted?: boolean;
            systemLanguage?: string & tags.Default<"en">;
        };
    }
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
    export type IndexedMessage = {
        messageId?: string;
        indexedAt?: number;
        type?: "mentioned" | "teamMentioned" | "reacted" | "saved";
        chatId?: string;
        chatType?: string;
        personId?: string;
        personType?: string;
        channelId?: string;
        expireAt?: number;
        updatedAt?: number;
        createdAt?: number;
    };
}
type IAutoViewTransformerInputType = Schema.MessageView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there is no message to display, fall back to a simple markdown notification.
  if (!input.message) {
    return {
      type: "Markdown",
      content: "No message available to display.",
    };
  }

  const msg = input.message;

  // Build the sender representation: prefer bot icon, then user avatar, else default user icon.
  let senderElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (input.bot) {
    senderElement = {
      type: "Icon",
      id: "robot",
      size: 24,
      color: "gray",
    };
  } else if (input.user && input.user.avatarUrl) {
    senderElement = {
      type: "Avatar",
      src: input.user.avatarUrl,
      name: input.user.name,
      variant: "primary",
      size: 36,
    };
  } else {
    senderElement = {
      type: "Icon",
      id: "user",
      size: 24,
      color: "gray",
    };
  }

  // Format the timestamp if available.
  const timestamp = msg.createdAt
    ? new Date(msg.createdAt).toLocaleString()
    : undefined;

  // Compose the card header: sender, name/title, and timestamp as description.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: senderElement,
    title: input.bot?.name || input.user?.name || "Unknown Sender",
    description: timestamp,
  };

  // Consolidate text content: transform blocks into markdown or use plainText.
  let markdownContent = "";
  if (Array.isArray(msg.blocks) && msg.blocks.length > 0) {
    // Convert each block into its markdown representation.
    const parts = msg.blocks.map((b) => {
      switch (b.type) {
        case "code":
          // Wrap code in fenced block with optional language.
          return "" + (b.language || "") + "\n" + (b.value || "") + "\n```";
        case "bullets":
          // Render sub-blocks as list items.
          if (Array.isArray(b.blocks)) {
            return b.blocks
              .map((item) => "- " + (item.value || ""))
              .join("\n");
          }
          return b.value || "";
        default:
          // Plain text block.
          return b.value || "";
      }
    });
    markdownContent = parts.join("\n\n");
  } else if (msg.plainText) {
    markdownContent = msg.plainText;
  }

  // Fallback if neither blocks nor plainText produce content.
  if (!markdownContent) {
    markdownContent = "_No textual content available._";
  }

  const contentMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownContent,
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [contentMarkdown],
  };

  // Build footer elements: reactions and file count badge if present.
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Reactions: show as a chip group of emoji + count.
  if (Array.isArray(msg.reactions) && msg.reactions.length > 0) {
    const chips: IAutoView.IAutoViewChipProps[] = msg.reactions.map((r) => {
      const count = Array.isArray(r.personKeys) ? r.personKeys.length : 0;
      return {
        type: "Chip",
        label: `${r.emojiName} ${count}`,
        size: "small",
        variant: "filled",
      };
    });
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: chips,
    });
  }

  // File attachments: show a badge with count and a file icon.
  if (Array.isArray(msg.files) && msg.files.length > 0) {
    footerChildren.push({
      type: "Badge",
      count: msg.files.length,
      maxCount: 99,
      showZero: false,
      childrenProps: {
        type: "Icon",
        id: "file-alt",
        size: 16,
        color: "gray",
      },
    });
  }

  // Only include a footer if we have any elements.
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (footerChildren.length > 0) {
    footer = {
      type: "CardFooter",
      childrenProps: footerChildren,
    };
  }

  // Assemble a vertical card with header, content, and optional footer.
  const children = [header, content] as (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  )[];
  if (footer) {
    children.push(footer);
  }

  return {
    type: "VerticalCard",
    childrenProps: children,
  };
}
