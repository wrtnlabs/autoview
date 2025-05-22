import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ChannelView = {
      channel?: AutoViewInputSubTypes.Channel;
      manager?: AutoViewInputSubTypes.Manager;
      managerBadge?: AutoViewInputSubTypes.ManagerBadge;
    };
  }
  export type Channel = {
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
    state?:
      | "waiting"
      | "active"
      | "restricted"
      | "preIndebted"
      | "indebted"
      | "banned"
      | "removed";
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
  };
  export namespace message {
    export type NestedMessage = {
      blocks?: AutoViewInputSubTypes.message.Block[];
      buttons?: AutoViewInputSubTypes.message.Button[] &
        tags.MinItems<1> &
        tags.MaxItems<2>;
      files?: AutoViewInputSubTypes.message.File[] &
        tags.MinItems<1> &
        tags.MaxItems<30>;
      webPage?: AutoViewInputSubTypes.message.WebPage;
      form?: AutoViewInputSubTypes.message.form.Form;
    };
    export type Block = {
      type: "bullets" | "code" | "text";
      language?: string;
      value?: string;
      blocks?: AutoViewInputSubTypes.message.Block[];
    };
    export type Button = {
      title: string;
      colorVariant?:
        | "cobalt"
        | "green"
        | "orange"
        | "red"
        | "black"
        | "pink"
        | "purple";
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
    export namespace form {
      export type Form = {
        submittedAt?: number;
        inputs?: AutoViewInputSubTypes.message.form.FormInput[];
        type: string;
      };
      export type FormInput = {
        value?: {};
        readOnly?: boolean;
        type?:
          | "text"
          | "number"
          | "bool"
          | "date"
          | "datetime"
          | "radio"
          | "singleSelect"
          | "checkbox"
          | "multiSelect";
        label?: string;
        bindingKey?: string;
        dataType?:
          | "string"
          | "date"
          | "list"
          | "listOfNumber"
          | "number"
          | "datetime"
          | "boolean";
        userChatProfileBindingKey?: boolean;
        userProfileBindingKey?: boolean;
      };
    }
  }
  export type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
  };
  export type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] &
      tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
  };
  export type Manager = {
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
    chatAlertSound?:
      | "none"
      | "drop"
      | "woody"
      | "bounce"
      | "crystal"
      | "xylo"
      | "quickKnock"
      | "candy"
      | "shine";
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
  };
  export type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32">;
    height?: number & tags.Type<"int32">;
  };
  export type ManagerBadge = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChannelView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const channel = value.channel;
  const manager = value.manager;
  const badge = value.managerBadge;

  // If no channel data, show placeholder
  if (!channel) {
    return (
      <div className="p-4 text-gray-500 flex items-center gap-2">
        <LucideReact.AlertCircle size={24} />
        <span>No Channel Data Available</span>
      </div>
    );
  }

  // Format creation date
  const createdAt = channel.createdAt
    ? new Date(channel.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  // Derive state label and icon
  const stateLabel = channel.state
    ? channel.state.charAt(0).toUpperCase() + channel.state.slice(1)
    : "Unknown";
  const stateIcon = (() => {
    switch (channel.state) {
      case "active":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "waiting":
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      case "restricted":
      case "indebted":
      case "preIndebted":
        return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      case "banned":
      case "removed":
        return <LucideReact.XCircle size={16} className="text-red-600" />;
      default:
        return <LucideReact.AlertCircle size={16} className="text-gray-400" />;
    }
  })();

  // Biz grade color mapping
  const gradeColor = (() => {
    switch (channel.bizGrade) {
      case "AA":
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
      case "C":
        return "bg-amber-100 text-amber-800";
      case "D":
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  })();

  // Cover image fallback
  const coverSrc = channel.coverImageUrl
    ? channel.coverImageUrl
    : `https://placehold.co/400x300/f1f5f9/64748b?text=${encodeURIComponent(
        channel.name,
      )}`;

  // Manager avatar fallback
  const avatarSrc =
    manager?.avatarUrl ||
    (manager?.avatar && `${manager.avatar.bucket}/${manager.avatar.key}`) ||
    (manager?.name &&
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        manager.name,
      )}&background=0D8ABC&color=fff`);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover */}
      <div className="w-full aspect-video bg-gray-200">
        <img
          src={coverSrc}
          alt={`${channel.name} cover`}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/400x300/f1f5f9/64748b?text=${encodeURIComponent(
              channel.name,
            )}`;
          }}
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Channel Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {channel.name}
          </h2>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="flex items-center gap-1">
              {stateIcon}
              <span className="text-sm text-gray-700">{stateLabel}</span>
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${gradeColor}`}
            >
              {channel.bizGrade}
            </span>
          </div>
        </div>

        {/* Description */}
        {channel.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {channel.description}
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Created: {createdAt}</span>
          </div>
          {channel.timeZone && (
            <div className="flex items-center gap-1">
              <LucideReact.Clock size={16} />
              <span>{channel.timeZone}</span>
            </div>
          )}
          {channel.domain && (
            <div className="flex items-center gap-1 truncate">
              <LucideReact.Link size={16} />
              <span className="truncate">{channel.domain}</span>
            </div>
          )}
          {channel.phoneNumber && (
            <div className="flex items-center gap-1">
              <LucideReact.Phone size={16} />
              <span>{channel.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Manager Section */}
        {manager && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Manager</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={manager.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        manager.name,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                ) : (
                  <LucideReact.User className="w-full h-full text-gray-400 p-2" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-gray-800 font-medium truncate">
                  {manager.name}
                </div>
                {manager.email && (
                  <div className="flex items-center gap-1 text-gray-600 text-sm truncate">
                    <LucideReact.Mail size={14} />
                    <span className="truncate">{manager.email}</span>
                  </div>
                )}
                {manager.mobileNumber && (
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <LucideReact.Phone size={14} />
                    <span>{manager.mobileNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Badge Counts */}
            {badge && (
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LucideReact.MessageSquare size={16} />
                  <span>Team Unread: {badge.teamChatUnread ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.MessageCircle size={16} />
                  <span>User Unread: {badge.userChatUnread ?? 0}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
