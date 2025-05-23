import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsCopilotBillingSelectedUsers {
        /**
         * The total number of seats set to "pending cancellation" for the specified users.
        */
        export interface _DeleteResponse {
            seats_cancelled: number & tags.Type<"int32">;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCopilotBillingSelectedUsers._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const count = value.seats_cancelled;
  const formattedCount = count.toLocaleString();
  const hasCancelled = count > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasCancelled) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center w-full max-w-xs text-green-600">
        <LucideReact.CheckCircle size={20} className="mr-2 flex-shrink-0" aria-label="No pending cancellations" />
        <span className="text-sm font-medium">No Pending Cancellations</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-xs">
      <div className="flex items-center text-gray-600 text-sm font-medium mb-1">
        <LucideReact.Clock size={16} className="text-amber-500 mr-1 flex-shrink-0" aria-label="Pending cancellation" />
        <span>Seats Pending Cancellation</span>
      </div>
      <div className="flex items-baseline text-red-600 text-3xl font-bold">
        <LucideReact.Users size={20} className="mr-2 flex-shrink-0" aria-hidden="true" />
        <span>{formattedCount}</span>
      </div>
    </div>
  );

  // 3. Return the React element.
}
