import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposAttestations {
    export type PostResponse = {
      /**
       * The ID of the attestation.
       */
      id?: number & tags.Type<"int32">;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposAttestations.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation
  const { id } = value;
  const hasId = id != null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <LucideReact.Hash
          size={20}
          className="text-gray-500"
          aria-hidden="true"
        />
        <span className="text-lg font-semibold text-gray-900">
          Attestation ID
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold text-gray-800">
        {hasId ? (
          <span>{id}</span>
        ) : (
          <span className="text-gray-500 italic">Not available</span>
        )}
      </div>
    </div>
  );
}
