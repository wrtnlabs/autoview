import React from "react";
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
  // CPU usage percentages
  const cpuUser = value.cpu.user;
  const cpuSystem = value.cpu.system;
  const cpuTotal = cpuUser + cpuSystem || 1;
  const cpuUserPct = (cpuUser / cpuTotal) * 100;
  const cpuSystemPct = (cpuSystem / cpuTotal) * 100;

  // Memory usage conversions
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
  const rssMB = toMB(value.memory.rss);
  const heapTotalMB = toMB(value.memory.heapTotal);
  const heapUsedMB = toMB(value.memory.heapUsed);
  const externalMB = toMB(value.memory.external);
  const arrayBuffersMB = toMB(value.memory.arrayBuffers);
  const heapUsagePct =
    value.memory.heapTotal > 0
      ? ((value.memory.heapUsed / value.memory.heapTotal) * 100).toFixed(1)
      : '0';

  // Resource usage key metrics
  const toSeconds = (micros: number) => (micros / 1e6).toFixed(2);
  const resourceMetrics: { label: string; value: string }[] = [
    { label: 'Max RSS', value: `${toMB(value.resource.maxRSS)} MB` },
    { label: 'FS Reads', value: new Intl.NumberFormat().format(value.resource.fsRead) },
    { label: 'FS Writes', value: new Intl.NumberFormat().format(value.resource.fsWrite) },
    {
      label: 'Voluntary Context Switches',
      value: new Intl.NumberFormat().format(value.resource.voluntaryContextSwitches),
    },
    {
      label: 'Involuntary Context Switches',
      value: new Intl.NumberFormat().format(value.resource.involuntaryContextSwitches),
    },
    { label: 'Minor Page Faults', value: value.resource.minorPageFault.toString() },
    { label: 'Major Page Faults', value: value.resource.majorPageFault.toString() },
    { label: 'Signals Count', value: value.resource.signalsCount.toString() },
    { label: 'IPC Received', value: value.resource.ipcReceived.toString() },
    { label: 'IPC Sent', value: value.resource.ipcSent.toString() },
    {
      label: 'User CPU Time',
      value: `${toSeconds(value.resource.userCPUTime)} s`,
    },
    {
      label: 'System CPU Time',
      value: `${toSeconds(value.resource.systemCPUTime)} s`,
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Performance Metrics</h2>

      {/* CPU Usage */}
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-2">CPU Usage</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <span className="mr-4">User: {cpuUser.toFixed(0)}</span>
          <span>System: {cpuSystem.toFixed(0)}</span>
        </div>
        <div className="relative h-3 w-full bg-gray-200 rounded overflow-hidden">
          <div
            className="absolute left-0 top-0 h-3 bg-blue-500"
            style={{ width: `${cpuUserPct}%` }}
          />
          <div
            className="absolute top-0 h-3 bg-green-500"
            style={{
              left: `${cpuUserPct}%`,
              width: `${cpuSystemPct}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{cpuUserPct.toFixed(1)}%</span>
          <span>{cpuSystemPct.toFixed(1)}%</span>
        </div>
      </section>

      {/* Memory Usage */}
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Memory Usage</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500">RSS</dt>
            <dd className="font-medium text-gray-800">{rssMB} MB</dd>
          </div>
          <div>
            <dt className="text-gray-500">Heap Total</dt>
            <dd className="font-medium text-gray-800">{heapTotalMB} MB</dd>
          </div>
          <div>
            <dt className="text-gray-500">Heap Used</dt>
            <dd className="font-medium text-gray-800">
              {heapUsedMB} MB ({heapUsagePct}%)
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">External</dt>
            <dd className="font-medium text-gray-800">{externalMB} MB</dd>
          </div>
          <div>
            <dt className="text-gray-500">Array Buffers</dt>
            <dd className="font-medium text-gray-800">{arrayBuffersMB} MB</dd>
          </div>
        </dl>
      </section>

      {/* Resource Usage */}
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Resource Usage</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {resourceMetrics.map((m) => (
              <div key={m.label} className="flex justify-between">
                <span className="text-gray-500 truncate">{m.label}</span>
                <span className="font-medium text-gray-800">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
