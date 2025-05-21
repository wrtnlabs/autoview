import { tags } from "typia";
import React from "react";
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
                servicePlan?: "xsmall" | "small" | "medium" | "large" | "entA" | "entAA";
                operationFeature?: boolean;
                mktFeature?: boolean;
                whiteLabelFeature?: boolean;
                billingPeriod?: "yearly" | "monthly";
                billingDay?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>;
                stopRenewal?: boolean;
                mau?: number & tags.Type<"int32">;
                enableTexting: boolean;
                enableEmail: boolean;
                state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
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
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChannelView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const channel = value.channel;
  const manager = value.manager;
  const badge = value.managerBadge;

  const createdDate = channel?.createdAt
    ? new Date(channel.createdAt).toLocaleDateString('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  const plan = channel?.servicePlan
    ? channel.servicePlan.charAt(0).toUpperCase() + channel.servicePlan.slice(1)
    : '—';

  const status = channel?.state
    ? channel.state.charAt(0).toUpperCase() + channel.state.slice(1)
    : 'Unknown';

  const isOperational =
    channel?.inOperation === true
      ? 'Operational'
      : channel?.inOperation === false
      ? 'Not operational'
      : '—';

  const bizGrade = channel?.bizGrade ? channel.bizGrade.toUpperCase() : '—';

  const unreadCount = badge?.unread ?? 0;
  const alertCount = badge?.alert ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Channel Section */}
      {channel && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {channel.name}
            </h2>
            <span
              className="px-2 py-0.5 text-xs font-medium rounded"
              style={{ backgroundColor: channel.color || '#123456', color: '#fff' }}
            >
              {bizGrade}
            </span>
          </div>
          {channel.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {channel.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {channel.domain && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {channel.domain}
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
              Plan: {plan}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
              Status: {status}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
              {isOperational}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <div>Created: {createdDate}</div>
            {channel.country && <div>Country: {channel.country}</div>}
          </div>
        </div>
      )}

      {/* Manager Section */}
      {manager && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Manager
          </h3>
          <div className="flex items-center space-x-3">
            {manager.avatarUrl && (
              <img
                src={manager.avatarUrl}
                alt={manager.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <p className="text-gray-800 font-medium truncate">
                {manager.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {manager.email}
              </p>
            </div>
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
              {manager.role.charAt(0).toUpperCase() + manager.role.slice(1)}
            </span>
          </div>
          {manager.mobileNumber && (
            <p className="mt-2 text-xs text-gray-500">
              📱 {manager.mobileNumber}
            </p>
          )}
        </div>
      )}

      {/* Badge Section */}
      {badge && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Notifications
          </h3>
          <div className="flex space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                Alerts
              </span>
              <span className="font-medium text-gray-800">{alertCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                Unread
              </span>
              <span className="font-medium text-gray-800">{unreadCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
