import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ChannelView {
            channel?: AutoViewInputSubTypes.Channel;
            manager?: AutoViewInputSubTypes.Manager;
            managerBadge?: AutoViewInputSubTypes.ManagerBadge;
        }
    }
    export interface Channel {
        id?: string;
        welcomeMessage: AutoViewInputSubTypes.message.NestedMessage;
        welcomeMessageI18nMap?: {
            [key: string]: AutoViewInputSubTypes.message.NestedMessage;
        };
        createdAt?: number;
        updatedAt?: number;
        userInfoUrl?: string;
        trafficSource?: {
            [key: string]: {};
        };
        billAccountId?: string;
        name: string & tags.Pattern<"^[^@#$%:/\\x08\\\\]+$">;
        nameDescI18nMap?: {
            [key: string]: AutoViewInputSubTypes.NameDesc;
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
        indebtedDueDate?: string & tags.Format<"date">;
        followUpTexting: boolean;
        followUpEmail: boolean;
        followUpAskName?: boolean;
        followUpMandatory?: boolean;
        state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
        entVerified?: boolean;
        bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
        defaultPluginId?: string;
        workingType?: "always" | "never" | "custom";
        sourceSurvey?: {
            [key: string]: {};
        };
        bizCategory?: string;
        staffs?: number & tags.Type<"int32">;
        appCommerceId?: string;
        appCommerceType?: string;
        appCommerceDomain?: string;
        enableMemberHash?: boolean;
        defaultEmailDomainId?: string;
        enableMfa?: boolean;
        hideAppMessenger?: boolean;
        baseTutorialCompleted: boolean;
        bizCertificated?: boolean;
        mktAlimtalkAllowed?: boolean;
        bizCertificatedCountries?: string[];
        managedUserChatRetentionDuration?: string;
        blocked?: boolean;
        working?: boolean;
        avatarUrl?: string;
        expectedResponseDelay?: "instant" | "normal" | "delayed";
        inOperation?: boolean;
        operationTimeScheduling?: boolean;
        nextWorkingTime?: number;
        nextAwayTime?: number;
        operationTimeRanges?: AutoViewInputSubTypes.TimeRange[];
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
        nextOperatingAt?: number;
        usingFollowUp?: boolean;
        initial?: string;
        utcOffset?: string;
        systemDomain?: string;
        pluginIconColor?: string;
        brightness?: number;
        coverImageUrl?: string;
        coverImageBright?: boolean;
        dayUntilIndebted?: number & tags.Type<"int32">;
    }
    export namespace message {
        export interface NestedMessage {
            blocks?: AutoViewInputSubTypes.message.Block[];
            buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
            webPage?: AutoViewInputSubTypes.message.WebPage;
            form?: AutoViewInputSubTypes.message.form.Form;
        }
        export interface Block {
            type: "bullets" | "code" | "text";
            language?: string;
            value?: string;
            blocks?: AutoViewInputSubTypes.message.Block[];
        }
        export interface Button {
            title: string;
            colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
            action: AutoViewInputSubTypes.message.action.Action;
            /**
             * @deprecated
            */
            url?: string;
        }
        export namespace action {
            export interface Action {
                attributes?: AutoViewInputSubTypes.message.action.Attributes;
                type: string;
            }
            export interface Attributes {
            }
        }
        export interface File {
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
        }
        export interface WebPage {
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
        }
        export namespace form {
            export interface Form {
                submittedAt?: number;
                inputs?: AutoViewInputSubTypes.message.form.FormInput[];
                type: string;
            }
            export interface FormInput {
                value?: {};
                readOnly?: boolean;
                type?: "text" | "number" | "bool" | "date" | "datetime" | "radio" | "singleSelect" | "checkbox" | "multiSelect";
                label?: string;
                bindingKey?: string;
                dataType?: "string" | "date" | "list" | "listOfNumber" | "number" | "datetime" | "boolean";
                userChatProfileBindingKey?: boolean;
                userProfileBindingKey?: boolean;
            }
        }
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TimeRange {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    }
    export interface Manager {
        id?: string;
        channelId?: string;
        accountId?: string;
        name: string;
        description?: string;
        showDescriptionToFront?: boolean;
        nameDescI18nMap?: {
            [key: string]: AutoViewInputSubTypes.NameDesc;
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
        avatar?: AutoViewInputSubTypes.TinyFile;
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
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
    export interface ManagerBadge {
        id?: string;
        teamChatAlert?: number & tags.Type<"int32">;
        teamChatUnread?: number & tags.Type<"int32">;
        userChatAlert?: number & tags.Type<"int32">;
        userChatUnread?: number & tags.Type<"int32">;
        teamChatThreadAlert?: number & tags.Type<"int32">;
        teamChatThreadUnread?: number & tags.Type<"int32">;
        updatedAt?: number;
        version?: number & tags.Type<"int32">;
        managerId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChannelView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const channel = value.channel;
  const manager = value.manager;
  const badge = value.managerBadge;

  // Format timestamps into human-readable strings
  const formatDate = (timestamp?: number): string =>
    timestamp ? new Date(timestamp).toLocaleString() : '—';

  // Map channel state to a label and icon
  const stateConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    waiting: {
      label: 'Waiting',
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
    },
    active: {
      label: 'Active',
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    },
    restricted: {
      label: 'Restricted',
      icon: <LucideReact.AlertTriangle className="text-yellow-600" size={16} />,
    },
    preIndebted: {
      label: 'Pre-indebted',
      icon: <LucideReact.AlertTriangle className="text-yellow-600" size={16} />,
    },
    indebted: {
      label: 'Indebted',
      icon: <LucideReact.AlertTriangle className="text-red-600" size={16} />,
    },
    banned: {
      label: 'Banned',
      icon: <LucideReact.XCircle className="text-red-600" size={16} />,
    },
    removed: {
      label: 'Removed',
      icon: <LucideReact.Trash2 className="text-gray-500" size={16} />,
    },
  };

  const stateKey = channel?.state ?? '';
  const channelState =
    stateConfig[stateKey] ?? {
      label: 'Unknown',
      icon: <LucideReact.HelpCircle className="text-gray-500" size={16} />,
    };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Channel Header */}
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LucideReact.Hash size={20} />
            {channel?.name ?? '—'}
          </h2>
          {channel?.description && (
            <p className="text-sm text-gray-500 line-clamp-2">{channel.description}</p>
          )}
        </div>

        {/* Channel Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Created: {formatDate(channel?.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Updated: {formatDate(channel?.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            {channelState.icon}
            <span>{channelState.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Bot size={16} />
            <span>Bot: {channel?.botName ?? '—'}</span>
          </div>
        </div>

        {/* Manager & Activity Section */}
        {(manager || badge) && (
          <div className="pt-4 border-t border-gray-200 space-y-4">
            {manager && (
              <div>
                <h3 className="text-md font-semibold flex items-center gap-2">
                  <LucideReact.User size={18} />
                  Manager
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-2">
                  {manager.email && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Mail size={16} />
                      <span>{manager.email}</span>
                    </div>
                  )}
                  {manager.mobileNumber && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Phone size={16} />
                      <span>{manager.mobileNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {badge && (
              <div>
                <h3 className="text-md font-semibold flex items-center gap-2">
                  <LucideReact.BadgeCheck size={18} />
                  Activity
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
                  <div className="flex items-center gap-1">
                    <LucideReact.MessageSquare size={16} />
                    <span>{badge.unread ?? 0} Unread</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.AlertTriangle size={16} />
                    <span>{badge.alert ?? 0} Alerts</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
