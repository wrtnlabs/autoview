import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserCodespacesMachines {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            machines: AutoViewInputSubTypes.codespace_machine[];
        };
    }
    /**
     * A description of the machine powering a codespace.
     *
     * @title Codespace machine
    */
    export type codespace_machine = {
        /**
         * The name of the machine.
        */
        name: string;
        /**
         * The display name of the machine includes cores, memory, and storage.
        */
        display_name: string;
        /**
         * The operating system of the machine.
        */
        operating_system: string;
        /**
         * How much storage is available to the codespace.
        */
        storage_in_bytes: number & tags.Type<"int32">;
        /**
         * How much memory is available to the codespace.
        */
        memory_in_bytes: number & tags.Type<"int32">;
        /**
         * How many cores are available to the codespace.
        */
        cpus: number & tags.Type<"int32">;
        /**
         * Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be "null" if prebuilds are not supported or prebuild availability could not be determined. Value will be "none" if no prebuild is available. Latest values "ready" and "in_progress" indicate the prebuild availability status.
        */
        prebuild_availability: "none" | "ready" | "in_progress" | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiUserCodespacesMachines.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 ** 3) {
      return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
    }
    if (bytes >= 1024 ** 2) {
      return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    }
    return `${bytes} B`;
  };

  const getPrebuildLabel = (
    status: AutoViewInputSubTypes.codespace_machine["prebuild_availability"],
  ): { text: string; colorClass: string } => {
    switch (status) {
      case "ready":
        return { text: "Prebuild Ready", colorClass: "bg-green-100 text-green-800" };
      case "in_progress":
        return { text: "Prebuild In Progress", colorClass: "bg-blue-100 text-blue-800" };
      case "none":
        return { text: "No Prebuild", colorClass: "bg-gray-100 text-gray-600" };
      default:
        return { text: "Unknown", colorClass: "bg-yellow-100 text-yellow-800" };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Codespace Machines ({value.total_count})
      </h2>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {value.machines.map((machine) => {
          const badge = getPrebuildLabel(machine.prebuild_availability);
          return (
            <li
              key={machine.name}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className="text-md font-medium text-gray-900 truncate"
                    title={machine.display_name}
                  >
                    {machine.display_name}
                  </h3>
                  <span
                    className={`text-xs font-medium uppercase px-2 py-0.5 rounded ${badge.colorClass}`}
                  >
                    {badge.text}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 truncate">
                  {machine.operating_system}
                </p>
                <div className="flex flex-wrap text-sm text-gray-700 space-x-4">
                  <span>
                    {machine.cpus} CPU{machine.cpus !== 1 ? "s" : ""}
                  </span>
                  <span>{formatBytes(machine.memory_in_bytes)}</span>
                  <span>{formatBytes(machine.storage_in_bytes)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
