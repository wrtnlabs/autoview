import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespacesMachines {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesMachines.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const { total_count, machines } = value;

  // Convert bytes to human-readable format
  const formatBytes = (bytes: number): string => {
    if (bytes >= 1e12) return (bytes / 1e12).toFixed(1).replace(/\.0$/, '') + ' TB';
    if (bytes >= 1e9)  return (bytes / 1e9).toFixed(1).replace(/\.0$/, '') + ' GB';
    if (bytes >= 1e6)  return (bytes / 1e6).toFixed(1).replace(/\.0$/, '') + ' MB';
    if (bytes >= 1e3)  return (bytes / 1e3).toFixed(1).replace(/\.0$/, '') + ' KB';
    return bytes + ' B';
  };

  // Map prebuild availability to label and icon
  type StatusKey = 'ready' | 'in_progress' | 'none' | 'unknown';
  const statusMap: Record<StatusKey, { label: string; icon: JSX.Element }> = {
    ready:       { label: 'Ready',       icon: <LucideReact.CheckCircle size={16} className="text-green-500" /> },
    in_progress:{ label: 'In Progress', icon: <LucideReact.Loader size={16} className="animate-spin text-amber-500" /> },
    none:        { label: 'None',        icon: <LucideReact.XCircle size={16} className="text-gray-500" /> },
    unknown:     { label: 'Unknown',     icon: <LucideReact.HelpCircle size={16} className="text-gray-400" /> },
  };

  // 2. Compose the visual structure
  return (
    <section className="p-4 bg-gray-50 rounded-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Codespace Machines</h2>
        <p className="text-gray-600">Total Machines: {total_count}</p>
      </header>

      {machines.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No machines available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {machines.map((machine, idx) => {
            const key = (machine.prebuild_availability ?? 'unknown') as StatusKey;
            const { label, icon } = statusMap[key];

            return (
              <div key={idx} className="flex flex-col p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {machine.display_name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {machine.operating_system}
                </p>

                <div className="flex items-center gap-4 text-gray-700 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <LucideReact.Cpu size={16} className="text-gray-500" />
                    <span>{machine.cpus} CPUs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Server size={16} className="text-gray-500" />
                    <span>{formatBytes(machine.memory_in_bytes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Database size={16} className="text-gray-500" />
                    <span>{formatBytes(machine.storage_in_bytes)}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center text-sm">
                  {icon}
                  <span className="ml-2 text-gray-700">{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
