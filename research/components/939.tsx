import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiUserCodespacesMachines.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytesToGB = (bytes: number): string =>
    `${(bytes / 1073741824).toFixed(1)} GB`;

  const getPrebuildInfo = (
    status: AutoViewInputSubTypes.codespace_machine["prebuild_availability"],
  ): { text: string; Icon: React.ComponentType<any>; color: string } => {
    switch (status) {
      case "ready":
        return {
          text: "Ready",
          Icon: LucideReact.CheckCircle,
          color: "text-green-500",
        };
      case "in_progress":
        return {
          text: "In Progress",
          Icon: LucideReact.Clock,
          color: "text-amber-500",
        };
      case "none":
        return {
          text: "None",
          Icon: LucideReact.XCircle,
          color: "text-gray-500",
        };
      default:
        return {
          text: "Unknown",
          Icon: LucideReact.AlertTriangle,
          color: "text-gray-400",
        };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-white border-b">
        <LucideReact.Server size={20} className="text-gray-600" />
        <h2 className="ml-2 text-xl font-semibold text-gray-800">
          Codespace Machines ({value.total_count})
        </h2>
      </div>

      {value.machines.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No machines available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {value.machines.map((machine) => {
            const { text, Icon, color } = getPrebuildInfo(
              machine.prebuild_availability,
            );
            return (
              <div
                key={machine.name}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3
                  className="text-lg font-medium text-gray-800 truncate"
                  title={machine.display_name}
                >
                  {machine.display_name}
                </h3>
                <p className="mt-1 flex items-center text-sm text-gray-600">
                  <LucideReact.Monitor size={16} className="mr-1" />
                  {machine.operating_system}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <LucideReact.Cpu size={16} className="mr-1 text-gray-500" />
                    {machine.cpus} cores
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Server
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    {formatBytesToGB(machine.memory_in_bytes)}
                  </div>
                  <div className="flex items-center">
                    <LucideReact.HardDrive
                      size={16}
                      className="mr-1 text-gray-500"
                    />
                    {formatBytesToGB(machine.storage_in_bytes)}
                  </div>
                </div>

                <div className="mt-3 flex items-center text-sm">
                  <Icon size={16} className={`mr-1 ${color}`} />
                  <span className="text-gray-700">{text}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
