export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
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
//# sourceMappingURL=0.js.map