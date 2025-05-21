import { tags } from "typia";
import React from "react";
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
    };
    export namespace message {
        export type NestedMessage = {
            blocks?: AutoViewInputSubTypes.message.Block[];
            buttons?: AutoViewInputSubTypes.message.Button[] & tags.MinItems<1> & tags.MaxItems<2>;
            files?: AutoViewInputSubTypes.message.File[] & tags.MinItems<1> & tags.MaxItems<30>;
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
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
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
  // 1. Data extraction and transformations
  const channel = value.channel;
  if (!channel) {
    return <div className="p-4 text-gray-500">No Channel Data</div>;
  }

  const {
    coverImageUrl,
    coverImageColor,
    gradientColor,
    color,
    name,
    description = "",
    createdAt,
    state,
    bizGrade = "unknown",
    staffs
  } = channel;

  // Header styling
  const headerBgColor = coverImageUrl
    ? undefined
    : gradientColor || coverImageColor || color || "#E5E7EB";
  const headerStyle: React.CSSProperties = coverImageUrl
    ? { backgroundImage: `url(${coverImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: headerBgColor };

  // Date formatting
  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;

  // State badge
  const stateKey = state || "removed";
  const stateBadgeClasses: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    waiting: "bg-yellow-100 text-yellow-800",
    restricted: "bg-red-100 text-red-800",
    preIndebted: "bg-orange-100 text-orange-800",
    indebted: "bg-red-100 text-red-800",
    banned: "bg-gray-800 text-white",
    removed: "bg-gray-200 text-gray-600"
  };
  const stateLabel = stateKey.charAt(0).toUpperCase() + stateKey.slice(1);
  const stateBadge = (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${stateBadgeClasses[stateKey]}`}>
      {stateLabel}
    </span>
  );

  // Business grade badge
  const gradeBadgeClasses: Record<string, string> = {
    AA: "bg-blue-100 text-blue-800",
    A: "bg-green-100 text-green-800",
    B: "bg-indigo-100 text-indigo-800",
    C: "bg-yellow-100 text-yellow-800",
    D: "bg-orange-100 text-orange-800",
    F: "bg-red-100 text-red-800",
    unknown: "bg-gray-200 text-gray-600"
  };
  const gradeBadge = (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${gradeBadgeClasses[bizGrade]}`}>
      {bizGrade}
    </span>
  );

  // Staff count
  const staffBadge = typeof staffs === "number" ? (
    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
      {staffs} Staff{staffs !== 1 ? "s" : ""}
    </span>
  ) : null;

  // Manager section
  const manager = value.manager;
  const badge = value.managerBadge;
  // Manager avatar or initials
  let managerAvatar: React.ReactNode = null;
  if (manager) {
    if (manager.avatarUrl) {
      managerAvatar = (
        <img
          src={manager.avatarUrl}
          alt={manager.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    } else {
      const initials = manager.name
        .split(" ")
        .map((s) => s[0] || "")
        .join("")
        .toUpperCase()
        .slice(0, 2);
      managerAvatar = (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
          {initials}
        </div>
      );
    }
  }
  // Unread badge
  const unreadTotal = badge?.unread || 0;
  const unreadBadge =
    unreadTotal > 0 ? (
      <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
        {unreadTotal}
      </span>
    ) : null;

  // 2. Visual structure
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-32 w-full" style={headerStyle} />
      <div className="p-4 -mt-8">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <div className="mt-1">{stateBadge}</div>
        <div className="mt-2 text-gray-700 text-sm line-clamp-2">{description}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {gradeBadge}
          {staffBadge}
        </div>
        {createdDate && (
          <div className="mt-3 text-xs text-gray-500">Created: {createdDate}</div>
        )}
        {manager && (
          <div className="mt-4 flex items-center">
            {managerAvatar}
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{manager.name}</div>
              {manager.email && (
                <div className="text-xs text-gray-500">{manager.email}</div>
              )}
            </div>
            {unreadBadge}
          </div>
        )}
      </div>
    </div>
  );
}
