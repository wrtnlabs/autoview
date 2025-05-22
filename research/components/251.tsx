import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace open {
    export namespace marketing {
      export type OneTimeMsgView = {
        oneTimeMsg?: AutoViewInputSubTypes.marketing.OneTimeMsg;
      };
    }
  }
  export namespace marketing {
    export type OneTimeMsg = {
      id?: string;
      channelId?: string;
      name: string;
      state: "draft" | "waiting" | "sent" | "canceled" | "removed";
      sendMode?:
        | "immediately"
        | "reservedWithSenderTime"
        | "reservedWithReceiverTime";
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
    export type SendMediumSettings = {
      type: string;
    };
    export type OneTimeMsgDraft = {
      oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
    };
  }
  export type Expression = {
    key?: string;
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string"
      | "listOfObject";
    operator?: AutoViewInputSubTypes.Operator;
    values?: {}[];
    and?: AutoViewInputSubTypes.Expression[];
    or?: AutoViewInputSubTypes.Expression[];
  };
  export type Operator = {};
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.oneTimeMsg;
  const stateMap: Record<string, string> = {
    draft: "Draft",
    waiting: "Scheduled",
    sent: "Sent",
    canceled: "Canceled",
    removed: "Removed",
  };
  const stateIcon: Record<string, JSX.Element> = {
    draft: <LucideReact.Edit className="text-gray-500" size={16} />,
    waiting: <LucideReact.Clock className="text-amber-500" size={16} />,
    sent: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    canceled: <LucideReact.XCircle className="text-red-500" size={16} />,
    removed: <LucideReact.Trash2 className="text-red-400" size={16} />,
  };
  const sendModeMap: Record<string, string> = {
    immediately: "Immediately",
    reservedWithSenderTime: "Reserved (Sender Time)",
    reservedWithReceiverTime: "Reserved (Receiver Time)",
  };
  const mediumMap: Record<string, string> = {
    appAlimtalk: "Alimtalk",
    appLine: "Line",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  };
  const mediumIcon: Record<string, JSX.Element> = {
    appAlimtalk: (
      <LucideReact.MessageSquare className="text-blue-500" size={16} />
    ),
    appLine: <LucideReact.MessageCircle className="text-green-500" size={16} />,
    email: <LucideReact.Mail className="text-indigo-500" size={16} />,
    inAppChat: (
      <LucideReact.MessageSquare className="text-teal-500" size={16} />
    ),
    xms: <LucideReact.Package className="text-gray-500" size={16} />,
  };
  function formatDate(ts?: number): string {
    if (!ts) return "-";
    return new Date(ts).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (!msg) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle className="mb-2" size={48} />
        <span className="text-lg">No message data available</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5 space-y-6 max-w-md mx-auto">
      {/* Header: Name & State */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {msg.name}
        </h2>
        <div className="flex items-center space-x-1 text-sm font-medium">
          {stateIcon[msg.state] || <LucideReact.HelpCircle size={16} />}
          <span className="capitalize">{stateMap[msg.state] || msg.state}</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
        {/* Scheduled or Created */}
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>
            {msg.state === "waiting"
              ? msg.localStartAt || formatDate(msg.startAt)
              : formatDate(msg.createdAt)}
          </span>
        </div>
        {/* Send Mode */}
        <div className="flex items-center space-x-2">
          <LucideReact.Clock className="text-gray-400" size={16} />
          <span>{sendModeMap[msg.sendMode || ""] || "-"}</span>
        </div>
        {/* Send Medium */}
        <div className="flex items-center space-x-2">
          {mediumIcon[msg.sendMedium || ""] || (
            <LucideReact.Package className="text-gray-400" size={16} />
          )}
          <span>{mediumMap[msg.sendMedium || ""] || "-"}</span>
        </div>
        {/* Advertising Tag */}
        <div className="flex items-center">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${
              msg.advertising
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.advertising ? "Advertising" : "Organic"}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-t pt-4 grid grid-cols-2 sm:grid-cols-4 text-center">
        <div>
          <div className="text-gray-500 text-xs">Sent</div>
          <div className="text-lg font-semibold text-gray-900">
            {msg.sent ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Views</div>
          <div className="text-lg font-semibold text-gray-900">
            {msg.view ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Goals</div>
          <div className="text-lg font-semibold text-gray-900">
            {msg.goal ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Clicks</div>
          <div className="text-lg font-semibold text-gray-900">
            {msg.click ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
