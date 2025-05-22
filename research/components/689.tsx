import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCodespacesMachines.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    const gb = bytes / 1024 ** 3;
    return `${gb.toFixed(1)} GB`;
  };

  const getStatus = (
    status: AutoViewInputSubTypes.codespace_machine["prebuild_availability"],
  ): { label: string; icon: JSX.Element } => {
    switch (status) {
      case "ready":
        return {
          label: "Prebuild Ready",
          icon: (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Prebuild Ready"
            />
          ),
        };
      case "in_progress":
        return {
          label: "Prebuild In Progress",
          icon: (
            <LucideReact.Loader
              size={16}
              className="animate-spin text-blue-500"
              aria-label="Prebuild In Progress"
            />
          ),
        };
      case "none":
        return {
          label: "No Prebuild",
          icon: (
            <LucideReact.XCircle
              size={16}
              className="text-gray-500"
              aria-label="No Prebuild"
            />
          ),
        };
      default:
        return {
          label: "Unknown Status",
          icon: (
            <LucideReact.AlertTriangle
              size={16}
              className="text-yellow-500"
              aria-label="Unknown Status"
            />
          ),
        };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Summary */}
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <LucideReact.Server
          size={20}
          className="text-gray-500"
          aria-label="Machines"
        />
        <span className="font-medium">Total Machines: {value.total_count}</span>
      </div>

      {/* Machine cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.machines.map((machine) => {
          const { label, icon } = getStatus(machine.prebuild_availability);

          return (
            <div
              key={machine.name}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {machine.display_name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {machine.operating_system}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.Cpu
                    size={16}
                    className="text-gray-500"
                    aria-label="CPUs"
                  />
                  <span>{machine.cpus} cores</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.Server
                    size={16}
                    className="text-gray-500"
                    aria-label="Memory"
                  />
                  <span>{formatBytes(machine.memory_in_bytes)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.Database
                    size={16}
                    className="text-gray-500"
                    aria-label="Storage"
                  />
                  <span>{formatBytes(machine.storage_in_bytes)}</span>
                </div>
              </div>

              <div
                className="flex items-center gap-1 mt-2 text-gray-700"
                aria-label={label}
              >
                {icon}
                <span className="text-sm">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
