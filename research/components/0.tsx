import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IPerformance {
        cpu: AutoViewInputSubTypes.process.global.NodeJS.CpuUsage;
        memory: AutoViewInputSubTypes.process.global.NodeJS.MemoryUsage;
        resource: AutoViewInputSubTypes.process.global.NodeJS.ResourceUsage;
    }
    export namespace process {
        export namespace global {
            export namespace NodeJS {
                export interface CpuUsage {
                    user: number;
                    system: number;
                }
                export interface MemoryUsage {
                    /**
                     * Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the
                     * process, including all C++ and JavaScript objects and code.
                    */
                    rss: number;
                    /**
                     * Refers to V8's memory usage.
                     *
                     * @title Refers to V8's memory usage
                    */
                    heapTotal: number;
                    /**
                     * Refers to V8's memory usage.
                     *
                     * @title Refers to V8's memory usage
                    */
                    heapUsed: number;
                    external: number;
                    /**
                     * Refers to memory allocated for `ArrayBuffer`s and `SharedArrayBuffer`s, including all Node.js Buffers. This is also included
                     * in the external value. When Node.js is used as an embedded library, this value may be `0` because allocations for `ArrayBuffer`s
                     * may not be tracked in that case.
                    */
                    arrayBuffers: number;
                }
                export interface ResourceUsage {
                    fsRead: number;
                    fsWrite: number;
                    involuntaryContextSwitches: number;
                    ipcReceived: number;
                    ipcSent: number;
                    majorPageFault: number;
                    maxRSS: number;
                    minorPageFault: number;
                    sharedMemorySize: number;
                    signalsCount: number;
                    swappedOut: number;
                    systemCPUTime: number;
                    unsharedDataSize: number;
                    unsharedStackSize: number;
                    userCPUTime: number;
                    voluntaryContextSwitches: number;
                }
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPerformance;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const toMb = (bytes: number) => bytes / (1024 * 1024);

  // CPU times in ms and percentages
  const userMs = (value.cpu.user / 1000).toFixed(1);
  const systemMs = (value.cpu.system / 1000).toFixed(1);
  const totalCpu = value.cpu.user + value.cpu.system || 1;
  const userPct = ((value.cpu.user / totalCpu) * 100).toFixed(1);
  const systemPct = ((value.cpu.system / totalCpu) * 100).toFixed(1);

  // Memory usage in MB and heap percentage
  const rssMb = toMb(value.memory.rss).toFixed(2);
  const heapTotalMb = toMb(value.memory.heapTotal).toFixed(2);
  const heapUsedMb = toMb(value.memory.heapUsed).toFixed(2);
  const externalMb = toMb(value.memory.external).toFixed(2);
  const heapPct = value.memory.heapTotal
    ? ((value.memory.heapUsed / value.memory.heapTotal) * 100).toFixed(1)
    : "0";

  // Resource summary metrics
  const ioOps = (value.resource.fsRead + value.resource.fsWrite).toLocaleString();
  const contextSwitches = (
    value.resource.voluntaryContextSwitches + value.resource.involuntaryContextSwitches
  ).toLocaleString();
  const peakRssMb = toMb(value.resource.maxRSS).toFixed(2);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Activity
          className="text-blue-500"
          size={24}
          strokeWidth={1.5}
          aria-label="Performance Overview"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-700">
          Performance Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU Usage */}
        <div>
          <div className="flex items-center mb-2">
            <LucideReact.Cpu className="text-gray-500" size={20} />
            <h3 className="ml-2 text-md font-medium text-gray-600">
              CPU Usage
            </h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
            <div
              className="bg-blue-500 h-3"
              style={{ width: `${userPct}%` }}
              title={`User ${userPct}%`}
            />
            <div
              className="bg-green-500 h-3"
              style={{ width: `${systemPct}%` }}
              title={`System ${systemPct}%`}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>User: {userMs} ms</span>
            <span>System: {systemMs} ms</span>
          </div>
        </div>

        {/* Memory Usage */}
        <div>
          <div className="flex items-center mb-2">
            <LucideReact.Database className="text-gray-500" size={20} />
            <h3 className="ml-2 text-md font-medium text-gray-600">
              Memory Usage
            </h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-3 rounded-full"
              style={{ width: `${heapPct}%` }}
              title={`Heap ${heapPct}%`}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Heap Used: {heapUsedMb} MB</span>
            <span>Heap Total: {heapTotalMb} MB</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>RSS: {rssMb} MB</span>
            <span>External: {externalMb} MB</span>
          </div>
        </div>
      </div>

      {/* Resource Summary */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Resource Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center bg-gray-50 p-3 rounded">
            <LucideReact.HardDrive className="text-gray-500" size={20} />
            <div className="ml-2">
              <div className="text-sm font-medium text-gray-600">I/O Ops</div>
              <div className="text-lg text-gray-800">{ioOps}</div>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-3 rounded">
            <LucideReact.RefreshCw className="text-gray-500" size={20} />
            <div className="ml-2">
              <div className="text-sm font-medium text-gray-600">
                Context Switches
              </div>
              <div className="text-lg text-gray-800">{contextSwitches}</div>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-3 rounded">
            <LucideReact.Database className="text-indigo-500" size={20} />
            <div className="ml-2">
              <div className="text-sm font-medium text-gray-600">Peak RSS</div>
              <div className="text-lg text-gray-800">{peakRssMb} MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
