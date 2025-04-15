import type * as IAutoView from "@autoview/interface";
type IPerformance = {
    cpu: process.global.NodeJS.CpuUsage;
    memory: process.global.NodeJS.MemoryUsage;
    resource: process.global.NodeJS.ResourceUsage;
};
namespace process {
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
type IAutoViewTransformerInputType = IPerformance;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We create a vertical card that shows overall system performance.
  // The card is composed of a header with an icon and title, and a content section displaying the CPU,
  // Memory, and Resource usage via a data list. We use Markdown components to render the textual
  // information in an engaging way.
  
  // Create the header component with an icon. The icon "signal" is used to represent performance.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "System Performance",
    description: "Real-time performance metrics",
    startElement: {
      type: "Icon",
      id: "signal", // expecting a valid icon name from the icon library (e.g., "signal")
      color: "blue",
      size: 24,
    },
  };

  // Create DataListItem for CPU usage.
  const cpuDataItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    // Using Markdown to format the title.
    label: {
      type: "Markdown",
      content: "### CPU Usage",
    },
    // Display CPU details in a list format.
    value: {
      type: "Markdown",
      content: `- User: ${input.cpu.user}\n- System: ${input.cpu.system}`,
    },
  };

  // Create DataListItem for Memory usage.
  const memoryDataItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Markdown",
      content: "### Memory Usage",
    },
    value: {
      type: "Markdown",
      content:
        `- RSS: ${input.memory.rss}\n` +
        `- Heap Total: ${input.memory.heapTotal}\n` +
        `- Heap Used: ${input.memory.heapUsed}\n` +
        `- External: ${input.memory.external}\n` +
        `- Array Buffers: ${input.memory.arrayBuffers}`,
    },
  };

  // Create DataListItem for Resource usage.
  const resourceDataItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Markdown",
      content: "### Resource Usage",
    },
    value: {
      type: "Markdown",
      content:
        `- fsRead: ${input.resource.fsRead}\n` +
        `- fsWrite: ${input.resource.fsWrite}\n` +
        `- Involuntary Context Switches: ${input.resource.involuntaryContextSwitches}\n` +
        `- IPC Received: ${input.resource.ipcReceived}\n` +
        `- IPC Sent: ${input.resource.ipcSent}\n` +
        `- Major Page Fault: ${input.resource.majorPageFault}\n` +
        `- Max RSS: ${input.resource.maxRSS}\n` +
        `- Minor Page Fault: ${input.resource.minorPageFault}\n` +
        `- Shared Memory Size: ${input.resource.sharedMemorySize}\n` +
        `- Signals Count: ${input.resource.signalsCount}\n` +
        `- Swapped Out: ${input.resource.swappedOut}\n` +
        `- System CPU Time: ${input.resource.systemCPUTime}\n` +
        `- Unshared Data Size: ${input.resource.unsharedDataSize}\n` +
        `- Unshared Stack Size: ${input.resource.unsharedStackSize}\n` +
        `- User CPU Time: ${input.resource.userCPUTime}\n` +
        `- Voluntary Context Switches: ${input.resource.voluntaryContextSwitches}`,
    },
  };

  // Compose a DataList to group the individual performance items.
  const performanceDataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [cpuDataItem, memoryDataItem, resourceDataItem],
  };

  // Wrap the DataList within a CardContent so that it is visually separated from the header.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [performanceDataList],
  };

  // Assemble the vertical card with header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed component which visualizes the performance data.
  return verticalCard;
}
