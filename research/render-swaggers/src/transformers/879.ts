import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Code Frequency Stat
     *
     * @title Code Frequency Stat
    */
    export type code_frequency_stat = (number & tags.Type<"int32">)[];
}
type IAutoViewTransformerInputType = Schema.code_frequency_stat[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to format UNIX timestamp (seconds) to YYYY-MM-DD
    const formatDate = (ts: number): string => {
        const date = new Date(ts * 1000);
        // ISO date portion e.g. "2023-08-01"
        return date.toISOString().slice(0, 10);
    };

    // If there's no data, show a friendly notice
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "## Code Frequency Stat\n\n_No data available to display._",
        };
    }

    // Sort the data by week timestamp ascending
    const sorted = [...input].sort((a, b) => (a[0] || 0) - (b[0] || 0));

    // Optionally limit to the most recent 52 weeks for brevity on mobile
    const recent = sorted.length > 52 ? sorted.slice(-52) : sorted;

    // Build Markdown table: Week | 👍 Additions | 👎 Deletions
    const header = "| Week       | 👍 Additions | 👎 Deletions |\n|------------|-------------:|------------:|";
    const rows = recent.map(record => {
        const [weekTs, additions = 0, deletions = 0] = record;
        const weekStr = formatDate(weekTs);
        // Ensure deletions is positive for display
        const dels = Math.abs(deletions);
        return `| ${weekStr} | ${additions.toLocaleString()}       | ${dels.toLocaleString()}      |`;
    });

    const markdownContent = [
        "## Code Frequency Stat",
        "",
        "_Showing last " + recent.length + " weeks of activity_",
        "",
        header,
        ...rows
    ].join("\n");

    // Return as a Markdown component for rich, responsive rendering
    return {
        type: "Markdown",
        content: markdownContent,
    };
}
