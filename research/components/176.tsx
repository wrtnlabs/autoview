import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ChannelView {
                    channel?: AutoViewInputSubTypes.legacy.v4.LegacyV4Channel;
                    manager?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager;
                    managerBadge?: AutoViewInputSubTypes.legacy.v4.LegacyV4ManagerBadge;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Channel {
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
            }
            export interface LegacyV4Manager {
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
            }
            export interface LegacyV4ManagerBadge {
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
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChannelView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const channel = value.channel;
  const manager = value.manager;
  const badge = value.managerBadge;

  // Fallback avatar URLs
  const channelAvatar =
    channel?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      channel?.name || "Channel"
    )}&background=0D8ABC&color=fff`;
  const managerAvatar =
    manager?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      manager?.name || "Manager"
    )}&background=64748B&color=fff`;

  // Date formatting
  const createdAtDate = channel?.createdAt
    ? new Date(channel.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : null;

  // State label & icon mapping
  const stateLabelMap: Record<string, string> = {
    waiting: "Waiting",
    active: "Active",
    restricted: "Restricted",
    preIndebted: "Pre-Indebted",
    indebted: "Indebted",
    banned: "Banned",
    removed: "Removed"
  };
  const state = channel?.state;
  const stateLabel = state ? stateLabelMap[state] || state : null;

  const getStateIcon = () => {
    switch (state) {
      case "active":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "waiting":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "restricted":
      case "banned":
      case "indebted":
      case "preIndebted":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  // Manager badge unread count
  const unreadCount = badge?.unread ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If there's no channel data, show a placeholder state
  if (!channel) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-sm">No channel information available.</p>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Avatar, Name, State */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={channelAvatar}
            alt={`${channel.name} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                channel.name
              )}&background=E5E7EB&color=6B7280`;
            }}
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {channel.name}
          </h2>
          {stateLabel && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
              {getStateIcon()}
              <span>{stateLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {channel.description && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-2">
          {channel.description}
        </p>
      )}

      {/* Meta information */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        {createdAtDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} />
            <span>{createdAtDate}</span>
          </div>
        )}
        {channel.homepageUrl && (
          <div className="flex items-center space-x-1">
            <LucideReact.Link size={16} />
            <a
              href={channel.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:underline text-blue-600"
            >
              {channel.homepageUrl}
            </a>
          </div>
        )}
        {channel.phoneNumber && (
          <div className="flex items-center space-x-1">
            <LucideReact.Phone size={16} />
            <span>{channel.phoneNumber}</span>
          </div>
        )}
        {channel.country && (
          <div className="flex items-center space-x-1">
            <LucideReact.Globe size={16} />
            <span>{channel.country}</span>
          </div>
        )}
      </div>

      {/* Manager section */}
      {manager && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium text-gray-800">Administrator</h3>
          <div className="flex items-center space-x-3 mt-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={managerAvatar}
                alt={`${manager.name} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    manager.name
                  )}&background=E5E7EB&color=6B7280`;
                }}
              />
            </div>
            <div className="flex-grow">
              <p className="text-gray-900 font-medium truncate">{manager.name}</p>
              <p className="text-gray-600 text-sm truncate">{manager.email}</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-2">
              <LucideReact.MessageSquare size={16} />
              <span>Unread: {unreadCount}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
