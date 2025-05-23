import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export interface interaction_limit_response {
        limit: AutoViewInputSubTypes.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    }
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format the expiration date into a human-friendly string
  const expiresDate = new Date(value.expires_at);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Compute relative time (e.g., "in 2 hours", "5 minutes ago")
  function getRelativeTime(target: Date): string {
    const diff = target.getTime() - Date.now();
    const units: [string, number][] = [
      ['day', 86_400_000],
      ['hour', 3_600_000],
      ['minute', 60_000],
      ['second', 1_000],
    ];
    for (const [unit, ms] of units) {
      const amount = Math.floor(diff / ms);
      if (Math.abs(amount) >= 1) {
        const label = Math.abs(amount) === 1 ? unit : `${unit}s`;
        return diff > 0
          ? `in ${amount} ${label}`
          : `${Math.abs(amount)} ${label} ago`;
      }
    }
    return 'just now';
  }
  const relativeExpires = getRelativeTime(expiresDate);

  // Map each limit type to a display label, color, and icon
  const limitMapping: Record<
    AutoViewInputSubTypes.interaction_group,
    { label: string; color: string; icon: keyof typeof LucideReact }
  > = {
    existing_users: {
      label: 'Existing Users',
      color: 'text-gray-500',
      icon: 'Users',
    },
    contributors_only: {
      label: 'Contributors Only',
      color: 'text-blue-500',
      icon: 'Edit',
    },
    collaborators_only: {
      label: 'Collaborators Only',
      color: 'text-green-500',
      icon: 'UserCheck',
    },
  };
  const { label: limitLabel, color: limitColor, icon: limitIcon } =
    limitMapping[value.limit];

  // Define icon props type to include LucideReact icon custom props
  type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    title?: string;
  };
  const LimitIcon = LucideReact[limitIcon] as React.FC<IconProps>;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md space-y-4 text-gray-700 text-sm">
      {/* Interaction Limit */}
      <div className="flex items-center gap-2">
        <LimitIcon size={16} className={limitColor} />
        <span className="font-medium">Limit:</span>
        <span>{limitLabel}</span>
      </div>

      {/* Origin */}
      <div className="flex items-center gap-2">
        <LucideReact.Link size={16} className="text-gray-500" />
        <span className="truncate break-all">{value.origin}</span>
      </div>

      {/* Expiration */}
      <div className="flex items-center gap-2">
        <LucideReact.Calendar size={16} className="text-gray-500" />
        <span className="font-medium">Expires:</span>
        <span>{formattedExpires}</span>
        <span className="text-gray-500">({relativeExpires})</span>
      </div>
    </div>
  );
}
