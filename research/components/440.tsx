import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsCopilotBillingSelectedUsers {
    /**
     * The total number of seats set to "pending cancellation" for the specified users.
     */
    export type _DeleteResponse = {
      seats_cancelled: number & tags.Type<"int32">;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsCopilotBillingSelectedUsers._DeleteResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Extract the seats_cancelled and determine display state.
  const seats = value.seats_cancelled;
  const hasPending = seats > 0;
  //    Format number with locale separators for readability.
  const formattedSeats = seats.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display an icon + number + label in a compact card.
  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md text-center">
      {hasPending ? (
        <LucideReact.UserMinus className="mx-auto text-amber-500" size={32} />
      ) : (
        <LucideReact.CheckCircle className="mx-auto text-green-500" size={32} />
      )}
      <div
        className={`mt-2 text-3xl font-semibold ${
          hasPending ? "text-gray-900" : "text-gray-700"
        } truncate`}
      >
        {formattedSeats}
      </div>
      <div className="mt-1 text-sm text-gray-500">
        {hasPending
          ? "Seats Pending Cancellation"
          : "No Seats Pending Cancellation"}
      </div>
    </div>
  );
}
