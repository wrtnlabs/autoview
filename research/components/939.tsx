import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserCodespacesMachines {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            machines: AutoViewInputSubTypes.codespace_machine[];
        }
    }
    /**
     * A description of the machine powering a codespace.
     *
     * @title Codespace machine
    */
    export interface codespace_machine {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiUserCodespacesMachines.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes >= 1 << 30) return `${(bytes / (1 << 30)).toFixed(1)} GB`;
    if (bytes >= 1 << 20) return `${(bytes / (1 << 20)).toFixed(1)} MB`;
    if (bytes >= 1 << 10) return `${(bytes / (1 << 10)).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const getStatusIcon = (
    status: AutoViewInputSubTypes.codespace_machine["prebuild_availability"],
  ): JSX.Element => {
    if (status === "ready") {
      return <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Ready" />;
    }
    if (status === "in_progress") {
      return (
        <LucideReact.Loader
          className="animate-spin text-blue-500"
          size={16}
          aria-label="In Progress"
        />
      );
    }
    // "none" or null
    return <LucideReact.XCircle className="text-gray-400" size={16} aria-label="Unavailable" />;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Codespace Machines ({value.total_count})
        </h2>
        <LucideReact.Server className="text-gray-500" size={20} aria-hidden="true" />
      </div>

      {value.machines.length > 0 ? (
        <ul className="space-y-4">
          {value.machines.map((machine, idx) => (
            <li key={`${machine.name}-${idx}`} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <LucideReact.Cpu className="text-gray-500" size={16} aria-hidden="true" />
                    <span className="font-medium text-gray-900">{machine.display_name}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{machine.operating_system}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 md:mt-0">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Cpu className="text-gray-500" size={16} />
                    <span className="text-sm text-gray-700">{machine.cpus} Cores</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.Server className="text-gray-500" size={16} />
                    <span className="text-sm text-gray-700">{formatBytes(machine.memory_in_bytes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.HardDrive className="text-gray-500" size={16} />
                    <span className="text-sm text-gray-700">{formatBytes(machine.storage_in_bytes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(machine.prebuild_availability)}
                    <span className="text-sm text-gray-600">
                      {machine.prebuild_availability === "ready"
                        ? "Ready"
                        : machine.prebuild_availability === "in_progress"
                        ? "In Progress"
                        : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2">No machines available.</span>
        </div>
      )}
    </div>
  );
}
