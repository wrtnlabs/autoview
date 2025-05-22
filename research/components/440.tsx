import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCopilotBillingSelectedUsers._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const seats = value.seats_cancelled;
  const formattedSeats = new Intl.NumberFormat().format(seats);
  const isNone = seats === 0;
  const statusText = isNone
    ? 'No seats pending cancellation'
    : `${formattedSeats} seat${seats > 1 ? 's' : ''} pending cancellation`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center">
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            isNone ? 'bg-green-400' : 'bg-red-400'
          }`}
          aria-hidden="true"
        />
        <h2 className="ml-2 text-sm font-medium text-gray-800">
          Cancellation Status
        </h2>
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-900 truncate">
        {statusText}
      </p>
    </div>
  );
}
