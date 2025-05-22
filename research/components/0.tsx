import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type IPerformance = {
    cpu: AutoViewInputSubTypes.process.global.NodeJS.CpuUsage;
    memory: AutoViewInputSubTypes.process.global.NodeJS.MemoryUsage;
    resource: AutoViewInputSubTypes.process.global.NodeJS.ResourceUsage;
  };
  export namespace process {
    export namespace global {
      export namespace NodeJS {
        export type CpuUsage = {
          user: number;
          system: number;
        };
        export type MemoryUsage = {
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
        };
        export type ResourceUsage = {
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
        };
      }
    }
  }
}
export type AutoViewInput = AutoViewInputSubTypes.IPerformance;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const cpuUserSec = (value.cpu.user / 1e6).toFixed(2);
  const cpuSystemSec = (value.cpu.system / 1e6).toFixed(2);
  const bytesToMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
  const rssMB = bytesToMB(value.memory.rss);
  const heapTotalMB = bytesToMB(value.memory.heapTotal);
  const heapUsedMB = bytesToMB(value.memory.heapUsed);
  const externalMB = bytesToMB(value.memory.external);
  const arrayBuffersMB = bytesToMB(value.memory.arrayBuffers);
  const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
  const {
    fsRead,
    fsWrite,
    involuntaryContextSwitches,
    voluntaryContextSwitches,
    majorPageFault,
    minorPageFault,
  } = value.resource;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-800">
        <LucideReact.Activity size={20} className="text-blue-500 mr-2" />
        Performance Overview
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section>
          <h3 className="flex items-center text-md font-medium text-gray-700">
            <LucideReact.Cpu size={18} className="text-gray-500 mr-1" />
            CPU Usage
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>
              <span className="font-medium">User:</span> {cpuUserSec}s
            </li>
            <li>
              <span className="font-medium">System:</span> {cpuSystemSec}s
            </li>
          </ul>
        </section>
        <section>
          <h3 className="flex items-center text-md font-medium text-gray-700">
            <LucideReact.Database size={18} className="text-gray-500 mr-1" />
            Memory (MB)
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>
              <span className="font-medium">RSS:</span> {rssMB} MB
            </li>
            <li>
              <span className="font-medium">Heap Total:</span> {heapTotalMB} MB
            </li>
            <li>
              <span className="font-medium">Heap Used:</span> {heapUsedMB} MB
            </li>
            <li>
              <span className="font-medium">External:</span> {externalMB} MB
            </li>
            <li>
              <span className="font-medium">Array Buffers:</span>{" "}
              {arrayBuffersMB} MB
            </li>
          </ul>
        </section>
        <section>
          <h3 className="flex items-center text-md font-medium text-gray-700">
            <LucideReact.PieChart size={18} className="text-gray-500 mr-1" />
            Resource Usage
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>
              <span className="font-medium">FS Reads:</span>{" "}
              {formatNumber(fsRead)}
            </li>
            <li>
              <span className="font-medium">FS Writes:</span>{" "}
              {formatNumber(fsWrite)}
            </li>
            <li>
              <span className="font-medium">Voluntary CS:</span>{" "}
              {formatNumber(voluntaryContextSwitches)}
            </li>
            <li>
              <span className="font-medium">Involuntary CS:</span>{" "}
              {formatNumber(involuntaryContextSwitches)}
            </li>
            <li>
              <span className="font-medium">Major Page Faults:</span>{" "}
              {formatNumber(majorPageFault)}
            </li>
            <li>
              <span className="font-medium">Minor Page Faults:</span>{" "}
              {formatNumber(minorPageFault)}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
  // 3. Return the React element.
}
