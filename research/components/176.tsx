import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ChannelView = {
          channel?: AutoViewInputSubTypes.legacy.v4.LegacyV4Channel;
          manager?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager;
          managerBadge?: AutoViewInputSubTypes.legacy.v4.LegacyV4ManagerBadge;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4Channel = {
        id?: string;
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        homepageUrl?: string;
        description?: string;
        nameDescI18nMap?: {
          [key: string]: AutoViewInputSubTypes.NameDesc;
        };
        country?: string;
        createdAt?: number;
        domain?: string & tags.Pattern<"^[0-9a-z][0-9a-z-]*[0-9a-z]$">;
        color: string & tags.Default<"#123456">;
        userInfoUrl?: string;
        timeZone: string & tags.Default<"UTC">;
        inOperation?: boolean;
        operationTimeScheduling?: boolean;
        operationTimeRanges?: AutoViewInputSubTypes.TimeRange[];
        trafficSource?: {
          [key: string]: {};
        };
        phoneNumber?: string & tags.Default<"+18004424000">;
        avatar?: AutoViewInputSubTypes.TinyFile;
        billAccountId?: string;
        servicePlan?:
          | "xsmall"
          | "small"
          | "medium"
          | "large"
          | "entA"
          | "entAA";
        operationFeature?: boolean;
        mktFeature?: boolean;
        whiteLabelFeature?: boolean;
        billingPeriod?: "yearly" | "monthly";
        billingDay?: number &
          tags.Type<"int32"> &
          tags.Minimum<1> &
          tags.Maximum<31>;
        stopRenewal?: boolean;
        mau?: number & tags.Type<"int32">;
        enableTexting: boolean;
        enableEmail: boolean;
        state?:
          | "waiting"
          | "active"
          | "restricted"
          | "preIndebted"
          | "indebted"
          | "banned"
          | "removed";
        bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
        /**
         * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
         * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
         * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
         */
        trialBeginDate?: string;
        /**
         * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
         * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
         * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
         */
        trialEndDate?: string;
        /**
         * @deprecated
         */
        autoSolvingTimeMinutes?: number & tags.Type<"int32">;
        blockReplyingAfterClosed?: boolean;
        blockReplyingAfterClosedTime?: string;
        defaultPluginId?: string;
        expectedResponseDelay?: "instant" | "normal" | "delayed";
        workingType?: "always" | "never" | "custom";
        awayOption?: "active" | "disabled" | "hidden";
        sourceSurvey?: {
          [key: string]: {};
        };
        bizCategory?: string;
        staffs?: number & tags.Type<"int32">;
        appCommerceId?: string;
        appCommerceType?: string;
        enableMemberHash?: boolean;
        memberHashSalt?: string;
        defaultEmailDomainId?: string;
        enableMfa?: boolean;
        hideAppMessenger?: boolean;
        /**
         * @deprecated
         */
        useSecureFile?: boolean;
        /**
         * @deprecated
         */
        limited?: boolean;
        messengerPlan?: "none" | "standard" | "pro";
        blocked?: boolean;
        working?: boolean;
        avatarUrl?: string;
        trial?: boolean;
        textColor?: string;
        nextOperatingAt?: number;
        initial?: string;
        utcOffset?: string;
        systemDomain?: string;
      };
      export type LegacyV4Manager = {
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
        email: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        role: "owner" | "member";
        removed?: boolean;
        createdAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        operatorScore?: number;
        touchScore?: number;
        avatar?: AutoViewInputSubTypes.TinyFile;
        operatorEmailReminder?: boolean;
        operator?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        managerId?: string;
        avatarUrl?: string;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
      };
      export type LegacyV4ManagerBadge = {
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
  export type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32">;
    height?: number & tags.Type<"int32">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChannelView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const channel = value.channel;
  const manager = value.manager;
  const badge = value.managerBadge;

  // Derived values and placeholders
  const channelCreated = channel?.createdAt
    ? new Date(channel.createdAt).toLocaleDateString()
    : null;
  const servicePlanLabel = channel?.servicePlan
    ? channel.servicePlan.charAt(0).toUpperCase() + channel.servicePlan.slice(1)
    : null;
  const stateLabel = channel?.state
    ? channel.state.charAt(0).toUpperCase() + channel.state.slice(1)
    : null;
  const channelAvatarSrc =
    channel?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      channel?.name || "Channel",
    )}&background=0D8ABC&color=fff`;
  const managerAvatarSrc =
    manager?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      manager?.name || "Manager",
    )}&background=random`;
  const totalAlerts =
    (badge?.alert || 0) +
    (badge?.teamChatAlert || 0) +
    (badge?.userChatAlert || 0) +
    (badge?.teamChatThreadAlert || 0) +
    (badge?.userChatUnread || 0);

  // Image error handler to fallback to placeholder
  function handleImgError(
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    placeholder: string,
  ) {
    e.currentTarget.src = placeholder;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-6 max-w-full">
      {/* Channel Section */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={channelAvatarSrc}
            alt={`${channel?.name || "Channel"} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => handleImgError(e, channelAvatarSrc)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {channel?.name || "Unnamed Channel"}
          </h2>
          {channel?.description && (
            <p className="mt-1 text-gray-600 line-clamp-2">
              {channel.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap text-sm text-gray-500 gap-4">
            {channel?.homepageUrl && (
              <div className="flex items-center gap-1">
                <LucideReact.Link size={16} />
                <a
                  href={channel.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {channel.homepageUrl}
                </a>
              </div>
            )}
            {channel?.userInfoUrl && (
              <div className="flex items-center gap-1">
                <LucideReact.User size={16} />
                <a
                  href={channel.userInfoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {channel.userInfoUrl}
                </a>
              </div>
            )}
            {channel?.domain && (
              <div className="flex items-center gap-1">
                <LucideReact.Globe size={16} />
                <span className="truncate">{channel.domain}</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center text-sm gap-3">
            {channelCreated && (
              <div className="flex items-center gap-1 text-gray-500">
                <LucideReact.Calendar size={16} />
                <span>Created {channelCreated}</span>
              </div>
            )}
            {servicePlanLabel && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                {servicePlanLabel}
              </span>
            )}
            {stateLabel && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                {stateLabel}
              </span>
            )}
            {channel?.bizGrade && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                Grade {channel.bizGrade}
              </span>
            )}
            {channel?.inOperation !== undefined && (
              <div className="flex items-center gap-1">
                {channel.inOperation ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                ) : (
                  <LucideReact.XCircle size={16} className="text-red-500" />
                )}
                <span className="text-gray-500">
                  {channel.inOperation ? "Operational" : "Inactive"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Manager Section */}
      {manager && (
        <div className="pt-4 border-t">
          <h3 className="text-md font-medium text-gray-800">Manager</h3>
          <div className="flex items-start space-x-4 mt-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src={managerAvatarSrc}
                alt={`${manager.name} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => handleImgError(e, managerAvatarSrc)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {manager.name || "Unnamed Manager"}
              </h4>
              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-3">
                {manager.email && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Mail size={16} />
                    <span className="truncate">{manager.email}</span>
                  </div>
                )}
                {manager.mobileNumber && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Phone size={16} />
                    <span>{manager.mobileNumber}</span>
                  </div>
                )}
                {manager.role && (
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                    {manager.role.charAt(0).toUpperCase() +
                      manager.role.slice(1)}
                  </span>
                )}
              </div>
            </div>
            {badge && totalAlerts > 0 && (
              <div className="flex flex-col items-center ml-auto text-sm text-gray-500">
                <LucideReact.AlertCircle size={20} className="text-red-500" />
                <span>{totalAlerts}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
