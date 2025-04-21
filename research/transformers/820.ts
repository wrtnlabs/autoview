import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * @title GitHub Pages deployment status
    */
    export type pages_deployment_status = {
        /**
         * The current status of the deployment.
        */
        status?: "deployment_in_progress" | "syncing_files" | "finished_file_sync" | "updating_pages" | "purging_cdn" | "deployment_cancelled" | "deployment_failed" | "deployment_content_failed" | "deployment_attempt_error" | "deployment_lost" | "succeed";
    };
}
type IAutoViewTransformerInputType = Schema.pages_deployment_status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map each deployment status to a human-readable label,
   * an icon name (FontAwesome kebab-case), and a color theme.
   */
  const statusMap: Record<string, { label: string; icon: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    deployment_in_progress: {
      label: "Deployment in Progress",
      icon: "spinner",
      color: "cyan",
    },
    syncing_files: {
      label: "Syncing Files",
      icon: "file-upload",
      color: "blue",
    },
    finished_file_sync: {
      label: "Finished File Sync",
      icon: "file-alt",
      color: "teal",
    },
    updating_pages: {
      label: "Updating Pages",
      icon: "cog",
      color: "indigo",
    },
    purging_cdn: {
      label: "Purging CDN",
      icon: "network-wired",
      color: "violet",
    },
    deployment_cancelled: {
      label: "Deployment Cancelled",
      icon: "minus-circle",
      color: "gray",
    },
    deployment_failed: {
      label: "Deployment Failed",
      icon: "times-circle",
      color: "red",
    },
    deployment_content_failed: {
      label: "Content Sync Failed",
      icon: "file-times",
      color: "red",
    },
    deployment_attempt_error: {
      label: "Attempt Error",
      icon: "exclamation-triangle",
      color: "orange",
    },
    deployment_lost: {
      label: "Deployment Lost",
      icon: "question-circle",
      color: "darkGray",
    },
    succeed: {
      label: "Succeeded",
      icon: "check-circle",
      color: "green",
    },
    // Fallback for undefined or unknown statuses
    unknown: {
      label: "Unknown Status",
      icon: "question-circle",
      color: "gray",
    },
  };

  // Determine which mapping to use, default to 'unknown' if missing
  const key = input.status ?? "unknown";
  const info = statusMap[key] || statusMap.unknown;

  // Compose a responsive vertical card summarizing the deployment status.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Clear title for the card
        title: "GitHub Pages Deployment",
        // Small subtitle to show the exact status label
        description: info.label,
        // Leading icon to make status instantly recognizable
        startElement: {
          type: "Icon",
          id: info.icon,
          color: info.color,
          size: 24,
        },
        // A colored chip to reinforce the status visually
        endElement: {
          type: "Chip",
          label: info.label,
          color: info.color,
          size: "small",
          variant: "filled",
        },
      },
      {
        type: "CardContent",
        // Markdown lets us emphasize the status and keep the UI text-light
        childrenProps: {
          type: "Markdown",
          content: `
**Current Status:** \`${info.label}\`

> Status code: \`${key}\`

_Last updated: ${new Date().toLocaleString()}_
          `.trim(),
        },
      },
    ],
  };
}
