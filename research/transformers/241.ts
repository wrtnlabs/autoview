import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export type ThreadRootMessageView = {
            chat?: Schema.Chat;
            message?: Schema.Message;
            thread?: Schema.message.MessageThread;
            bot?: Schema.bot.Bot;
            managers?: Schema.Manager[];
        };
    }
    export type Chat = {
        active?: boolean;
        createdAt?: number;
        channelId?: string;
        id?: string;
        managerIds?: string[] & tags.UniqueItems;
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
        export type Bot = {
            color?: string & tags.Default<"#123456">;
            createdAt?: number;
            avatarUrl?: string;
            ai?: boolean;
            name?: string;
            channelId?: string;
            id?: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: Schema.NameDesc;
            };
        };
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
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
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.open.ThreadRootMessageView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format timestamp into human-readable string
  const formatDate = (ts?: number): string =>
    ts != null ? new Date(ts).toLocaleString() : "Unknown date";

  // Build CardHeader startElement: use bot avatar if available, otherwise generic icon
  const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.bot && input.bot.avatarUrl
    ? {
        type: "Avatar",
        src: input.bot.avatarUrl,
        name: input.bot.name ?? "Bot",
        variant: "info",
        size: 40,
      }
    : {
        type: "Icon",
        id: "robot",
        color: "gray",
        size: 40,
      };

  // Build CardHeader endElement: show thread reply count
  const replyCount = input.thread?.replyCount ?? 0;
  const endElement: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: replyCount + (replyCount === 1 ? " reply" : " replies"),
    size: "small",
    variant: "outlined",
    color: "secondary",
  };

  // Compose CardHeader
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.bot?.name ?? input.chat?.channelId ?? "Conversation",
    description: input.bot?.description,
    startElement,
    endElement,
  };

  // Build CardContent children array based on message content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  const msg = input.message;
  if (msg?.webPage) {
    const page = msg.webPage;
    // Show preview image if available
    if (page.imageUrl) {
      contentChildren.push({
        type: "Image",
        src: page.imageUrl,
        alt: page.title,
      });
    }
    // Show title and description as markdown with link
    const mdLines = [
      page.title ? `### [${page.title}](${page.url})` : "",
      page.description || "",
    ].filter(Boolean);
    contentChildren.push({
      type: "Markdown",
      content: mdLines.join("\n\n"),
    });
  } else if (msg?.plainText) {
    // Render plain text as markdown for auto formatting
    contentChildren.push({
      type: "Markdown",
      content: msg.plainText,
    });
  } else {
    // Fallback when no content present
    contentChildren.push({
      type: "Text",
      content: "No message content available.",
      variant: "caption",
    });
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build CardFooter components: chat status chip, timestamp, managers avatars
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Chat active/inactive status
  if (input.chat?.active != null) {
    footerChildren.push({
      type: "Chip",
      label: input.chat.active ? "Chat Active" : "Chat Inactive",
      size: "small",
      variant: "outlined",
      color: input.chat.active ? "success" : "error",
    });
  }

  // Message timestamp
  if (msg?.createdAt != null) {
    footerChildren.push({
      type: "Text",
      content: formatDate(msg.createdAt),
      variant: "caption",
    });
  }

  // Managers avatar group
  const mgrs = input.managers || [];
  if (mgrs.length > 0) {
    const avatars: IAutoView.IAutoViewAvatarProps[] = mgrs.map((m) => ({
      type: "Avatar",
      src: m.avatarUrl,
      name: m.name,
      variant: "primary",
      size: 24,
    }));
    footerChildren.push({
      type: "AvatarGroup",
      childrenProps: avatars,
      maxItems: 5,
      totalItems: mgrs.length,
    });
  } else {
    // Indicate no managers when list is empty
    footerChildren.push({
      type: "Text",
      content: "No managers assigned",
      variant: "caption",
    });
  }

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Combine all into a vertical card for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  return card;
}
