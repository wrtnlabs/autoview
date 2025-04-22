import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IPerformance = {
        cpu: Schema.process.global.NodeJS.CpuUsage;
        memory: Schema.process.global.NodeJS.MemoryUsage;
        resource: Schema.process.global.NodeJS.ResourceUsage;
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
type IAutoViewTransformerInputType = Schema.IPerformance;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: build a mermaid bar chart for CPU usage
  const cpuBarMermaid = [
    "mermaid",
    "bar",
    "    title CPU Usage",
    `    "User": ${input.cpu.user}`,
    `    "System": ${input.cpu.system}`,
    "```"
  ].join("\n");

  // Helper: build a markdown table for memory usage
  const memoryTable = [
    "| Memory Metric       | Value         |",
    "|---------------------|--------------:|",
    `| rss                 | ${input.memory.rss} |`,
    `| heapTotal           | ${input.memory.heapTotal} |`,
    `| heapUsed            | ${input.memory.heapUsed} |`,
    `| external            | ${input.memory.external} |`,
    `| arrayBuffers        | ${input.memory.arrayBuffers} |`
  ].join("\n");

  // Helper: build a markdown table for key resource metrics
  const resourceTable = [
    "| Resource Metric              | Value         |",
    "|------------------------------|--------------:|",
    `| fsRead                       | ${input.resource.fsRead} |`,
    `| fsWrite                      | ${input.resource.fsWrite} |`,
    `| majorPageFault               | ${input.resource.majorPageFault} |`,
    `| minorPageFault               | ${input.resource.minorPageFault} |`,
    `| userCPUTime                  | ${input.resource.userCPUTime} |`,
    `| systemCPUTime                | ${input.resource.systemCPUTime} |`,
    `| voluntaryContextSwitches     | ${input.resource.voluntaryContextSwitches} |`,
    `| involuntaryContextSwitches   | ${input.resource.involuntaryContextSwitches} |`,
    "",
    "*Note: Additional resource metrics are available in logs.*"
  ].join("\n");

  // Combine all sections into one markdown payload
  const fullMarkdown = [cpuBarMermaid, "", "## Memory Usage", memoryTable, "", "## Resource Usage", resourceTable].join("\n\n");

  // Return a vertical card with header and markdown content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with an icon for visual appeal
        type: "CardHeader",
        title: "System Performance",
        startElement: {
          type: "Icon",
          id: "microchip",
          color: "blue",
          size: 24
        }
      },
      {
        // Card content rendering our markdown (with mermaid chart & tables)
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: fullMarkdown
        }
      }
    ]
  };
}
