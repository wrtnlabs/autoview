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
  // Build header for the conversation overview
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.chat
      ? `Chat ${input.chat.channelId ?? input.chat.id ?? ""}`
      : "No Chat Data",
    description: input.chat
      ? input.chat.active
        ? "Status: Active"
        : "Status: Inactive"
      : undefined,
    // Use a chat bubble icon to illustrate this is a conversation
    startElement: {
      type: "Icon",
      id: "comments", // FontAwesome icon name
      color: "blue",
      size: 24,
    },
  };

  // Build an array of presentation components for the content section
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // If there are managers associated, show an avatar group
  if (Array.isArray(input.managers) && input.managers.length > 0) {
    const avatars = input.managers.map((m) => ({
      type: "Avatar" as const,
      src: m.avatarUrl,
      name: m.name,
      variant: "primary" as const,
      size: 32 as const,
    }));
    contentChildren.push({
      type: "AvatarGroup" as const,
      childrenProps: avatars,
      totalItems: input.managers.length,
    });
  }

  // Build a data list of core identifiers and timestamps
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.chat) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Chat ID", variant: "subtitle2" }],
      value: [{ type: "Text", content: input.chat.id ?? "N/A", variant: "body2" }],
    });
    if (input.chat.createdAt) {
      listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Chat Created", variant: "subtitle2" }],
        value: [
          {
            type: "Text",
            content: new Date(input.chat.createdAt).toLocaleString(),
            variant: "body2",
          },
        ],
      });
    }
  }
  if (input.message) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Message ID", variant: "subtitle2" }],
      value: [{ type: "Text", content: input.message.id, variant: "body2" }],
    });
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Sent At", variant: "subtitle2" }],
      value: [
        {
          type: "Text",
          content: new Date(input.message.createdAt).toLocaleString(),
          variant: "body2",
        },
      ],
    });
    if (input.message.chatType) {
      listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Chat Type", variant: "subtitle2" }],
        value: [{ type: "Text", content: input.message.chatType, variant: "body2" }],
      });
    }
  }
  if (listItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: listItems,
    });
  }

  // If there's plain text content, render it via Markdown to allow richer formatting
  if (input.message?.plainText) {
    contentChildren.push({
      type: "Markdown",
      content: input.message.plainText,
    });
  }

  // If a web page preview is available, show an image and a link
  if (input.message?.webPage) {
    const wp = input.message.webPage;
    if (wp.imageUrl) {
      contentChildren.push({
        type: "Image",
        src: wp.imageUrl,
        alt: wp.title,
      });
    }
    contentChildren.push({
      type: "Button",
      label: [`Open Link: ${wp.title ?? wp.url}`],
      href: wp.url,
      variant: "outlined",
      size: "small",
      color: "primary",
    });
  }

  // If thread info exists, offer a button to view the thread
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.thread && input.thread.id) {
    footer = {
      type: "CardFooter",
      childrenProps: {
        type: "Button",
        label: ["View Thread"],
        href: `/thread/${input.thread.id}`,
        variant: "contained",
        color: "secondary",
        size: "medium",
      },
    };
  }

  // Compose the vertical card as the root component
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: contentChildren,
      },
      // Only include footer if defined
      ...(footer ? [footer] : []),
    ],
  };

  return card;
}
