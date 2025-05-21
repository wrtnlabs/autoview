import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export type UserChatView = {
            campaign?: AutoViewInputSubTypes.marketing.Campaign;
            bookmark?: AutoViewInputSubTypes.ChatBookmark;
            session?: AutoViewInputSubTypes.ChatSession;
            userSession?: AutoViewInputSubTypes.ChatSession;
            chatTags?: AutoViewInputSubTypes.ChatTag[];
            message?: AutoViewInputSubTypes.Message;
            oneTimeMsg?: AutoViewInputSubTypes.marketing.OneTimeMsg;
            userOnline?: AutoViewInputSubTypes.Online;
            supportBot?: AutoViewInputSubTypes.supportbot.SupportBot;
            workflow?: AutoViewInputSubTypes.workflow.Workflow;
            appMessenger?: AutoViewInputSubTypes.app.messenger.AppMessenger;
            user?: AutoViewInputSubTypes.user.User;
            userChat?: AutoViewInputSubTypes.userchat.UserChat;
        };
    }
    export namespace marketing {
        /**
         * ### 이벤트 기록
         *
         * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
        */
        export type Campaign = {
            id?: string;
            channelId?: string;
            name: string;
            state?: "draft" | "active" | "stopped" | "removed";
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            userQuery?: AutoViewInputSubTypes.Expression;
            triggerEventName: string;
            triggerEventQuery?: AutoViewInputSubTypes.Expression;
            waitingTime: string;
            filterEventName?: string;
            filterEventQuery?: AutoViewInputSubTypes.Expression;
            filterMatch?: "positive" | "negative";
            filterHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            goalHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            cooldown?: string;
            sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
            channelOperationId?: string;
            sendTimeRanges?: AutoViewInputSubTypes.TimeRange[];
            startAt?: number;
            endAt?: number;
            deleteMessageAfterStop?: boolean;
            draft?: AutoViewInputSubTypes.marketing.CampaignDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
            managerId?: string;
            recipeCaseId?: string;
        };
        export type HoldingPropertyConstant = {
            baseEventName: string;
            baseEventKey: string;
            eventQuery?: AutoViewInputSubTypes.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: AutoViewInputSubTypes.EventSchema;
            values?: {};
        };
        export type CampaignDraft = {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
        export type CampaignMsg = {
            id: string;
            campaignId?: string;
            channelId?: string;
            name: string;
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings: AutoViewInputSubTypes.marketing.SendMediumSettings;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
        };
        export type SendMediumSettings = {
            type: string;
        };
        export type OneTimeMsg = {
            id?: string;
            channelId?: string;
            name: string;
            state: "draft" | "waiting" | "sent" | "canceled" | "removed";
            sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
            channelOperationId?: string;
            sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
            userQuery?: AutoViewInputSubTypes.Expression;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            startAt?: number;
            localStartAt?: string & tags.Format<"date-time">;
            draft?: AutoViewInputSubTypes.marketing.OneTimeMsgDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
        };
        export type OneTimeMsgDraft = {
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
        };
    }
    export type Expression = {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: AutoViewInputSubTypes.Operator;
        values?: {}[];
        and?: AutoViewInputSubTypes.Expression[];
        or?: AutoViewInputSubTypes.Expression[];
    };
    export type Operator = {};
    export type EventSchema = {
        id?: string;
        channelId?: string;
        eventName?: string;
        key?: string;
        parentKey?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export type ChatBookmark = {
        key?: string;
        chatId?: string;
        chatKey?: string;
        bookmarkKey?: string;
        channelId?: string;
        version?: number & tags.Type<"int32">;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
    export type ChatSession = {
        key?: string;
        chatId?: string;
        teamChatSectionId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        allMentionImportant?: boolean;
        readAt?: number;
        receivedAt?: number;
        postedAt?: number;
        updatedAt?: number;
        createdAt?: number;
        version?: number & tags.Type<"int32">;
        id?: string;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
    export type ChatTag = {
        id?: string;
        channelId?: string;
        colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
        name: string;
        key: string;
        description?: string;
        /**
         * @deprecated
        */
        followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        createdAt?: number;
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
        blocks?: AutoViewInputSubTypes.message.Block[];
        plainText?: string;
        updatedAt?: number;
        inboundEmailId?: string;
        thread?: AutoViewInputSubTypes.message.MessageThread;
        meet?: AutoViewInputSubTypes.message.meet.MessageMeet;
        removerKey?: string;
        buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
        files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
        webPage?: AutoViewInputSubTypes.message.WebPage;
        log?: AutoViewInputSubTypes.message.Log;
        reactions?: AutoViewInputSubTypes.message.Reaction[];
        form?: AutoViewInputSubTypes.message.form.Form;
        state?: "sending" | "sent" | "failed" | "removed";
        options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent" | "silentToManager" | "silentToUser")[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        marketing?: AutoViewInputSubTypes.message.userchat.MessageMarketing;
        supportBot?: AutoViewInputSubTypes.message.userchat.MessageSupportBot;
        workflow?: AutoViewInputSubTypes.message.userchat.MessageWorkflow;
        alf?: AutoViewInputSubTypes.message.alf.MessageAlf;
        alertLevel?: "alert" | "unread" | "none";
        ivr?: AutoViewInputSubTypes.meet.ivr.MessageIvr;
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
            blocks?: AutoViewInputSubTypes.message.Block[];
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
                call?: AutoViewInputSubTypes.message.meet.Call;
                front?: AutoViewInputSubTypes.message.meet.Front;
                recording?: AutoViewInputSubTypes.message.meet.Recording;
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
            action: AutoViewInputSubTypes.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        };
        export namespace action {
            export type Action = {
                attributes?: AutoViewInputSubTypes.message.action.Attributes;
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
                inputs?: AutoViewInputSubTypes.message.form.FormInput[];
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
                buttons?: AutoViewInputSubTypes.supportbot.SupportBotRouteSection_dollar_Button[];
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
                references?: AutoViewInputSubTypes.message.alf.Reference[];
                mentionAlfAnswered?: boolean;
            };
            export type Reference = {
                index?: string;
                type: string;
            };
        }
        export type NestedMessage = {
            blocks?: AutoViewInputSubTypes.message.Block[];
            buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
            webPage?: AutoViewInputSubTypes.message.WebPage;
            form?: AutoViewInputSubTypes.message.form.Form;
        };
    }
    export namespace supportbot {
        export type SupportBotRouteSection_dollar_Button = {
            text: string;
            nextSectionId: string;
        };
        export type SupportBot = {
            id?: string;
            channelId: string;
            botName: string;
            name: string;
            order: number & tags.Minimum<0>;
            pageQuery?: AutoViewInputSubTypes.Expression;
            userQuery?: AutoViewInputSubTypes.Expression;
            draft?: AutoViewInputSubTypes.supportbot.SupportBotDraft;
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
        export type SupportBotDraft = {
            supportBot?: AutoViewInputSubTypes.supportbot.SupportBot;
            sections?: AutoViewInputSubTypes.supportbot.SupportBotSection[];
        };
        export type SupportBotSection = {
            name?: string;
            actions?: AutoViewInputSubTypes.userchat.UserChatStaticAction[];
            id?: string;
            steps?: AutoViewInputSubTypes.supportbot.SupportBotSection_dollar_Step[];
            type: string;
        };
        export type SupportBotSection_dollar_Step = {
            message: AutoViewInputSubTypes.message.NestedMessage;
        };
    }
    export namespace meet {
        export namespace ivr {
            export type MessageIvr = {
                audioFile?: AutoViewInputSubTypes.message.File;
            };
        }
    }
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
    export namespace userchat {
        export type UserChatStaticAction = {
            type: string;
        };
        export namespace actions {
            export type UserChatAction = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
        }
        export type UserChat = {
            id?: string;
            channelId?: string;
            alfStateKey?: string;
            contactKey?: string;
            contactMediumType?: string;
            liveMeetId?: string;
            sync?: boolean;
            state?: "closed" | "opened" | "snoozed" | "queued";
            missedReason?: "notInOperation" | "userLeft" | "ringTimeOver" | "inboundRateLimit" | "noOperator" | "exceededQueue" | "abandonedInQueue" | "workflow" | "preservedNumber" | "unregisteredNumber" | "blockedUser";
            managed?: boolean;
            priority?: "low" | "medium" | "high";
            userId?: string;
            xerId?: string;
            name?: string;
            title?: string;
            description?: string;
            subtextType?: "description" | "incoming";
            handling?: AutoViewInputSubTypes.userchat.handling.UserChatHandling;
            source?: AutoViewInputSubTypes.userchat.UserChatSource;
            managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
            assigneeId?: string;
            teamId?: string;
            tags?: string[] & tags.MinItems<1> & tags.MaxItems<8> & tags.UniqueItems;
            profile?: {
                [key: string]: {};
            };
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalCheckedAt?: number;
            goalState?: "achieved" | "notAchieved" | "waiting" | "none";
            firstOpenedAt?: number;
            openedAt?: number;
            firstQueuedAt?: number;
            queuedAt?: number;
            createdAt?: number;
            updatedAt?: number;
            frontMessageId?: string;
            frontUpdatedAt?: number;
            deskMessageId?: string;
            summarizedMessageId?: string;
            deskUpdatedAt?: number;
            userLastMessageId?: string;
            followUpTriggeredAt?: number;
            firstAssigneeIdAfterOpen?: string;
            firstRepliedAt?: number;
            firstRepliedAtAfterOpen?: number;
            oneStop?: boolean;
            waitingTime?: number & tags.Type<"int32">;
            avgReplyTime?: number & tags.Type<"int32">;
            totalReplyTime?: number & tags.Type<"int32">;
            replyCount?: number & tags.Type<"int32">;
            resolutionTime?: number & tags.Type<"int32">;
            operationWaitingTime?: number & tags.Type<"int32">;
            operationAvgReplyTime?: number & tags.Type<"int32">;
            operationTotalReplyTime?: number & tags.Type<"int32">;
            operationReplyCount?: number & tags.Type<"int32">;
            operationResolutionTime?: number & tags.Type<"int32">;
            askedAt?: number;
            firstAskedAt?: number;
            closedAt?: number;
            snoozedAt?: number;
            expiresAt?: number;
            version?: number & tags.Type<"int32">;
            lastInboundEmailId?: string;
            alfRequestedAt?: number;
        };
        export namespace handling {
            export type UserChatHandling = {
                type: string;
            };
        }
        export type UserChatSource = {
            page?: string;
            marketing?: AutoViewInputSubTypes.userchat.UserChatSource_dollar_Marketing;
            supportBot?: AutoViewInputSubTypes.userchat.UserChatSource_dollar_SupportBot;
            workflow?: AutoViewInputSubTypes.userchat.UserChatSource_dollar_Workflow;
            appMessenger?: AutoViewInputSubTypes.userchat.UserChatSource_dollar_AppMessenger;
        };
        export type UserChatSource_dollar_Marketing = {
            id?: string;
            type?: string;
        };
        export type UserChatSource_dollar_SupportBot = {
            id?: string;
            revisionId?: string;
            sectionPath?: string[];
        };
        export type UserChatSource_dollar_Workflow = {
            id?: string;
            revisionId?: string;
            traceId?: string;
            sectionPath?: string[];
            causeOfEnd?: string;
        };
        export type UserChatSource_dollar_AppMessenger = {
            id?: string;
            mediumType?: string;
            displayName?: string;
        };
    }
    export namespace workflow {
        export type Workflow = {
            id?: string;
            channelId: string;
            triggerType: "startChatByUserAtLounge" | "messageByUser" | "messageByManager" | "waitingForManagerReply" | "waitingForUserReply" | "chatWaitInQueued" | "chatOpenedByUser" | "chatOpenedByManager" | "chatClosed" | "startCallByUser" | "callWaitInQueued" | "callOpenedByUser" | "callOpenedByManager" | "callClosed" | "modular";
            trigger: AutoViewInputSubTypes.workflow.WorkflowTrigger;
            draft?: AutoViewInputSubTypes.workflow.WorkflowDraft;
            exclusive?: boolean;
            revisionId?: string;
            name: string;
            rank?: number & tags.Type<"int32">;
            state: "draft" | "active" | "stopped" | "removed";
            managerId?: string;
            draftManagerId?: string;
            recipeCaseId?: string;
            useAlf?: boolean;
            start?: number & tags.Type<"int32">;
            end?: number & tags.Type<"int32">;
            chatOpen?: number & tags.Type<"int32">;
            draftUpdatedAt?: number;
            createdAt?: number;
            updatedAt?: number;
            removedAt?: number;
            batchedAt?: number;
            migrationInfo?: AutoViewInputSubTypes.workflow.MigrationInfo;
            previewable?: boolean;
        };
        export type WorkflowTrigger = {
            filter?: AutoViewInputSubTypes.Expression;
            targetMediumSet: ("inAppChat" | "appKakao" | "appLine" | "appNaverTalk" | "appInstagramMessenger" | "call" | "email")[] & tags.UniqueItems;
            runMode: AutoViewInputSubTypes.workflow.WorkflowRunMode;
            botName: string;
            language: string & tags.Default<"en">;
            type?: "startChatByUserAtLounge" | "messageByUser" | "messageByManager" | "waitingForManagerReply" | "waitingForUserReply" | "chatWaitInQueued" | "chatOpenedByUser" | "chatOpenedByManager" | "chatClosed" | "startCallByUser" | "callWaitInQueued" | "callOpenedByUser" | "callOpenedByManager" | "callClosed" | "modular";
        };
        export type WorkflowRunMode = {
            mode: "always" | "inOperation" | "notInOperation" | "private";
            channelOperationId?: string;
        };
        export type WorkflowDraft = {
            workflow: AutoViewInputSubTypes.workflow.Workflow;
            sections?: AutoViewInputSubTypes.workflow.WorkflowSection[];
            previewSection?: AutoViewInputSubTypes.workflow.WorkflowPreviewSection;
            revisionEditorPosition?: AutoViewInputSubTypes.workflow.WorkflowRevisionEditorPosition;
        };
        export type WorkflowSection = {
            id: string;
            actions: AutoViewInputSubTypes.userchat.actions.UserChatAction[];
            name?: string;
            nextSectionId?: string;
        };
        export type WorkflowPreviewSection = {
            id: string;
            actions: AutoViewInputSubTypes.userchat.actions.UserChatAction[];
            name?: string;
            nextSectionId?: string;
        };
        export type WorkflowRevisionEditorPosition = {
            id?: string;
            workflowId?: string;
            revisionId?: string;
            edgePositions?: AutoViewInputSubTypes.workflow.WorkflowEdgePosition[];
            sectionPositions?: AutoViewInputSubTypes.workflow.WorkflowSectionPosition[];
            createdAt?: number;
            updatedAt?: number;
        };
        export type WorkflowEdgePosition = {
            sourceSection: AutoViewInputSubTypes.workflow.WorkflowEdgePosition_dollar_SourceSection;
            targetSection: AutoViewInputSubTypes.workflow.WorkflowEdgePosition_dollar_TargetSection;
            edgeLabelOffset?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        };
        export type WorkflowEdgePosition_dollar_SourceSection = {
            id: string;
            direction: "left" | "right" | "top" | "bottom";
            offset: number & tags.Type<"uint32"> & tags.Maximum<100>;
            type: "section" | "branch" | "button" | "branchAction";
            index?: number & tags.Type<"int32">;
        };
        export type WorkflowEdgePosition_dollar_TargetSection = {
            id: string;
            direction: "left" | "right" | "top" | "bottom";
            offset: number & tags.Type<"uint32"> & tags.Maximum<100>;
        };
        export type WorkflowSectionPosition = {
            sectionId: string;
            position: AutoViewInputSubTypes.workflow.WorkflowSectionPosition_dollar_Position;
        };
        export type WorkflowSectionPosition_dollar_Position = {
            x: number & tags.Type<"int32">;
            y: number & tags.Type<"int32">;
        };
        export type MigrationInfo = {
            fromType?: string;
            fromId?: string;
            workflowRevisionId?: string;
        };
    }
    export type SendUserChatMessageAction = any;
    export type SendUserChatPrivateMessageAction = any;
    export type SendTeamChatMessageAction = any;
    export type SendFormMessageAction = any;
    export type SendXmsAction = any;
    export type ButtonAction = any;
    export type ManagerAssignAction = any;
    export type ManagerUnassignAction = any;
    export type TeamAssignAction = any;
    export type TeamUnassignAction = any;
    export type InviteFollowersAction = any;
    export type RemoveFollowersAction = any;
    export type AddUserTagsAction = any;
    export type RemoveUserTagsAction = any;
    export type AddUserChatTagsAction = any;
    export type RemoveUserChatTagsAction = any;
    export type UserChatDescriptionAction = any;
    export type UserChatStateAction = any;
    export type UserChatPriorityAction = any;
    export type BranchAction = any;
    export type CollectUserReplyAction = any;
    export type AlfAction = any;
    export type CallModularWorkflowAction = any;
    export type ApplyRulesAction = any;
    export type IvrButtonAction = any;
    export type AudioMessageAction = any;
    export type VoiceMailAction = any;
    export type EndCallAction = any;
    export type SendCallFormMessageAction = any;
    export namespace app {
        export namespace messenger {
            export type AppMessenger = {
                name?: string;
                active?: boolean;
                language?: string & tags.Default<"en">;
                displayName?: string;
                defaultMessenger?: boolean;
                iconKey?: string;
                pluginTextI18n?: AutoViewInputSubTypes.I18nText;
                channelId?: string;
                id?: string;
                mediumType?: string;
                mediumId?: string;
            };
        }
    }
    export type I18nText = {
        text?: string;
        en?: string;
        ja?: string;
        ko?: string;
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
            profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
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
            web?: AutoViewInputSubTypes.WebInfo;
            mobile?: AutoViewInputSubTypes.MobileInfo;
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
}
export type AutoViewInput = AutoViewInputSubTypes.desk.UserChatView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const name = user?.name || "Unknown User";
  const avatarUrl = user?.avatarUrl;
  const initials = name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isOnline = !!value.userOnline;
  const unreadCount = value.session?.unread ?? 0;

  const lastMsg = value.message;
  const lastText =
    lastMsg?.plainText ||
    lastMsg?.blocks?.[0]?.value ||
    "No messages available";
  const lastTime = lastMsg?.createdAt
    ? new Date(lastMsg.createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const chatState = value.userChat?.state;
  let stateLabel: string | null = null;
  let stateClasses = "";
  switch (chatState) {
    case "opened":
      stateLabel = "Open";
      stateClasses = "bg-green-100 text-green-800";
      break;
    case "queued":
      stateLabel = "Queued";
      stateClasses = "bg-blue-100 text-blue-800";
      break;
    case "closed":
      stateLabel = "Closed";
      stateClasses = "bg-gray-100 text-gray-800";
      break;
    case "snoozed":
      stateLabel = "Snoozed";
      stateClasses = "bg-yellow-100 text-yellow-800";
      break;
    default:
      break;
  }

  const tagColorMap: Record<string, string> = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    olive: "bg-green-100 text-green-800",
    green: "bg-green-100 text-green-800",
    cobalt: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    navy: "bg-gray-100 text-gray-800",
  };

  const tagBadges =
    value.chatTags?.map(tag => {
      const variant = tag.colorVariant || "navy";
      const classes = tagColorMap[variant] || tagColorMap.navy;
      return (
        <span
          key={tag.key || tag.id || tag.name}
          className={`px-2 py-1 text-xs font-medium rounded ${classes}`}
        >
          {tag.name}
        </span>
      );
    }) || [];

  const indicators: React.ReactNode[] = [];
  if (value.campaign) {
    indicators.push(
      <div key="campaign" className="p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">Campaign</span>
        <p className="mt-1 text-sm text-gray-900 truncate">
          {value.campaign.name}
        </p>
      </div>
    );
  }
  if (value.oneTimeMsg) {
    indicators.push(
      <div key="oneTimeMsg" className="p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">One-Time Msg</span>
        <p className="mt-1 text-sm text-gray-900 truncate">
          {value.oneTimeMsg.name}
        </p>
      </div>
    );
  }
  if (value.supportBot) {
    indicators.push(
      <div key="supportBot" className="p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">Bot</span>
        <p className="mt-1 text-sm text-gray-900 truncate">
          {value.supportBot.botName}
        </p>
      </div>
    );
  }
  if (value.workflow) {
    indicators.push(
      <div key="workflow" className="p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">Workflow</span>
        <p className="mt-1 text-sm text-gray-900 truncate">
          {value.workflow.name}
        </p>
      </div>
    );
  }
  if (value.appMessenger) {
    indicators.push(
      <div key="appMessenger" className="p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">App</span>
        <p className="mt-1 text-sm text-gray-900 truncate">
          {value.appMessenger.displayName || value.appMessenger.name}
        </p>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {initials}
            </div>
          )}
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-900 truncate">
              {name}
            </h2>
            {isOnline && (
              <span className="text-sm text-green-600">Online</span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
          {stateLabel && (
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${stateClasses}`}
            >
              {stateLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700 text-sm line-clamp-2">{lastText}</p>
        {lastTime && (
          <p className="mt-1 text-xs text-gray-500 truncate">{lastTime}</p>
        )}
      </div>

      {tagBadges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">{tagBadges}</div>
      )}

      {indicators.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">{indicators}</div>
      )}
    </div>
  );
}
