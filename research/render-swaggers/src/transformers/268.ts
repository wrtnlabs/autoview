import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export namespace message {
            export type MessagesView = {
                prev?: string;
                next?: string;
                messages?: Schema.Message[];
                bots?: Schema.bot.Bot[];
            };
        }
    }
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
}
type IAutoViewTransformerInputType = Schema.desk.message.MessagesView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build a map of bot definitions for quick lookup
  const botsMap: Record<string, Schema.bot.Bot> = {};
  if (input.bots) {
    for (const bot of input.bots) {
      if (bot.id) {
        botsMap[bot.id] = bot;
      }
    }
  }

  // Transform each message into a DataListItem
  const messageItems: IAutoView.IAutoViewDataListItemProps[] = (input.messages || []).map((msg) => {
    // Determine if the message sender is a bot with metadata
    const botInfo = msg.personType === "bot" ? botsMap[msg.personId] : undefined;
    const isBot = Boolean(botInfo);

    // Avatar for sender: use bot avatar if available; otherwise use initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      size: 32,
      variant: isBot ? "info" : "primary",
      src: isBot ? botInfo!.avatarUrl : undefined,
      name: isBot ? botInfo!.name : msg.personId,
    };

    // Format timestamp into a human‐readable form
    const timestamp = new Date(msg.createdAt).toLocaleTimeString();

    // Header text: "Name • HH:MM:SS"
    const headerText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body2",
      content: `${isBot ? botInfo!.name : msg.personId} • ${timestamp}`,
    };

    // Build the markdown content from plainText or block values
    let contentString = msg.plainText ?? "";
    if (!contentString && msg.blocks) {
      contentString = msg.blocks.map((b) => b.value ?? "").join("\n\n");
    }
    const markdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: contentString,
    };

    // If there are image‐type files, render them with Image components
    const images: IAutoView.IAutoViewImageProps[] = (msg.files || [])
      .filter((file) => file.contentType?.startsWith("image/"))
      .map((file) => ({
        type: "Image",
        src: `${file.bucket}/${file.key}`,
        alt: file.name,
      }));

    // Compose the children components for the message body
    const messageBody: IAutoView.IAutoViewPresentationComponentProps[] = [
      markdown,
      ...images,
    ];

    return {
      type: "DataListItem",
      label: [avatar, headerText],
      value: messageBody,
    };
  });

  // If there are no messages, show a placeholder item
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps:
      messageItems.length > 0
        ? messageItems
        : [
            {
              type: "DataListItem",
              label: {
                type: "Text",
                variant: "body1",
                content: "No messages available",
              },
              value: [],
            },
          ],
  };

  // Card header with an icon and summary
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Conversation",
    description: `Total messages: ${messageItems.length}`,
    startElement: {
      type: "Icon",
      id: "comments",
      size: 24,
      color: "blue",
    },
  };

  // Pagination controls if prev/next links exist
  const paginationButtons: IAutoView.IAutoViewButtonProps[] = [];
  if (input.prev) {
    paginationButtons.push({
      type: "Button",
      label: "Previous",
      variant: "text",
      size: "medium",
      href: input.prev,
    });
  }
  if (input.next) {
    paginationButtons.push({
      type: "Button",
      label: "Next",
      variant: "text",
      size: "medium",
      href: input.next,
    });
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: paginationButtons,
  };

  // Combine header, message list, and footer into a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      { type: "CardContent", childrenProps: dataList },
      cardFooter,
    ],
  };
}
