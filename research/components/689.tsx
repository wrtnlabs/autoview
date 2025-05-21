import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespacesMachines {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesMachines.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format bytes into GB with one decimal place
  const formatBytes = (bytes: number): string => {
    const gb = bytes / (1024 ** 3);
    return `${gb.toFixed(1)} GB`;
  };

  // Map prebuild availability codes to human-readable labels
  const availabilityLabels: Record<string, string> = {
    ready: "Ready",
    in_progress: "In Progress",
    none: "Unavailable",
    null: "Not Supported",
  };

  // Map availability codes to Tailwind color classes
  const availabilityColors: Record<string, string> = {
    ready: "text-green-700 bg-green-100",
    in_progress: "text-yellow-700 bg-yellow-100",
    none: "text-red-700 bg-red-100",
    null: "text-gray-500 bg-gray-100",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const { total_count, machines } = value;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Available Machines ({total_count})
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {machines.map((machine) => {
          // Determine label and color for this machine's prebuild availability
          const rawKey = machine.prebuild_availability === null ? "null" : machine.prebuild_availability;
          const label = availabilityLabels[rawKey];
          const colorClasses = availabilityColors[rawKey];

          return (
            <div
              key={machine.name}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {machine.display_name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">
                ({machine.name})
              </p>
              <p className="mt-2 text-sm text-gray-600">
                OS: <span className="font-medium">{machine.operating_system}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {machine.cpus} CPUs
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {formatBytes(machine.memory_in_bytes)} RAM
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {formatBytes(machine.storage_in_bytes)} Storage
                </span>
                <span className={`px-2 py-1 rounded font-medium ${colorClasses}`}>
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
