import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The configuration for GitHub Pages for a repository.
     *
     * @title GitHub Pages
    */
    export interface page {
        /**
         * The API address for accessing this Page resource.
        */
        url: string;
        /**
         * The status of the most recent build of the Page.
        */
        status: "built" | "building" | "errored" | null;
        /**
         * The Pages site's custom domain
        */
        cname: string | null;
        /**
         * The state if the domain is verified
        */
        protected_domain_state?: "pending" | "verified" | "unverified" | null;
        /**
         * The timestamp when a pending domain becomes unverified.
        */
        pending_domain_unverified_at?: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the Page has a custom 404 page.
        */
        custom_404: boolean;
        /**
         * The web address the Page can be accessed from.
        */
        html_url?: string;
        /**
         * The process in which the Page will be built.
        */
        build_type?: "legacy" | "workflow" | null;
        source?: AutoViewInputSubTypes.pages_source_hash;
        /**
         * Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site.
        */
        "public": boolean;
        https_certificate?: AutoViewInputSubTypes.pages_https_certificate;
        /**
         * Whether https is enabled on the domain
        */
        https_enforced?: boolean;
    }
    /**
     * @title Pages Source Hash
    */
    export interface pages_source_hash {
        branch: string;
        path: string;
    }
    /**
     * @title Pages Https Certificate
    */
    export interface pages_https_certificate {
        state: "new" | "authorization_created" | "authorization_pending" | "authorized" | "authorization_revoked" | "issued" | "uploaded" | "approved" | "errored" | "bad_authz" | "destroy_pending" | "dns_changed";
        description: string;
        /**
         * Array of the domain set and its alternate name (if it is configured)
        */
        domains: string[];
        expires_at?: string & tags.Format<"date">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.page;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusMap = {
    built: {
      label: "Built",
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    },
    building: {
      label: "Building",
      icon: <LucideReact.Loader className="animate-spin text-amber-500" size={16} />,
    },
    errored: {
      label: "Errored",
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />,
    },
    null: {
      label: "Unknown",
      icon: <LucideReact.HelpCircle className="text-gray-400" size={16} />,
    },
  } as const;

  const protectionMap = {
    pending: { label: "Pending", color: "text-amber-500" },
    verified: { label: "Verified", color: "text-green-500" },
    unverified: { label: "Unverified", color: "text-red-500" },
    null: { label: "N/A", color: "text-gray-400" },
  } as const;

  const certStateMap = {
    new: { icon: <LucideReact.FileText className="text-blue-500" size={16} />, label: "New" },
    authorization_created: { icon: <LucideReact.FileText className="text-blue-500" size={16} />, label: "Auth Created" },
    authorization_pending: { icon: <LucideReact.Loader className="animate-spin text-amber-500" size={16} />, label: "Auth Pending" },
    authorized: { icon: <LucideReact.CheckCircle className="text-green-500" size={16} />, label: "Authorized" },
    authorization_revoked: { icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />, label: "Auth Revoked" },
    issued: { icon: <LucideReact.CheckCircle className="text-green-500" size={16} />, label: "Issued" },
    uploaded: { icon: <LucideReact.CheckCircle className="text-green-500" size={16} />, label: "Uploaded" },
    approved: { icon: <LucideReact.CheckCircle className="text-green-500" size={16} />, label: "Approved" },
    errored: { icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />, label: "Errored" },
    bad_authz: { icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />, label: "Bad Auth" },
    destroy_pending: { icon: <LucideReact.Loader className="animate-spin text-amber-500" size={16} />, label: "Destroy Pending" },
    dns_changed: { icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />, label: "DNS Changed" },
  } as const;

  const formattedPendingUnverify = value.pending_domain_unverified_at
    ? new Date(value.pending_domain_unverified_at).toLocaleString()
    : "—";

  const cert = value.https_certificate;
  const formattedCertExpiry = cert?.expires_at
    ? new Date(cert.expires_at).toLocaleDateString()
    : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header with primary URLs */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 truncate">
          <LucideReact.Link className="text-gray-500" size={16} />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
            title={value.url}
          >
            {value.url}
          </a>
        </div>
        {value.html_url && (
          <div className="flex items-center gap-2 truncate">
            <LucideReact.Globe className="text-gray-500" size={16} />
            <a
              href={value.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
              title={value.html_url}
            >
              {value.html_url}
            </a>
          </div>
        )}
      </div>

      {/* Core status and flags */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-1">
          {statusMap[value.status ?? "null"].icon}
          <dt className="font-medium">Status:</dt>
          <dd>{statusMap[value.status ?? "null"].label}</dd>
        </div>
        <div className="flex items-center gap-1">
          {value.public ? (
            <LucideReact.Unlock className="text-green-500" size={16} />
          ) : (
            <LucideReact.Lock className="text-red-500" size={16} />
          )}
          <dt className="font-medium">Public:</dt>
          <dd>{value.public ? "Yes" : "No"}</dd>
        </div>
        <div className="flex items-center gap-1">
          {value.https_enforced ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <dt className="font-medium">HTTPS Enforced:</dt>
          <dd>{value.https_enforced ? "Yes" : "No"}</dd>
        </div>
        <div className="flex items-center gap-1">
          {value.custom_404 ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <dt className="font-medium">Custom 404:</dt>
          <dd>{value.custom_404 ? "Enabled" : "Disabled"}</dd>
        </div>
        <dt className="font-medium">Build Type:</dt>
        <dd className="truncate">{value.build_type ?? "—"}</dd>
      </dl>

      {/* Domain configuration */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="font-medium">CNAME:</dt>
        <dd className="truncate">{value.cname ?? "—"}</dd>
        <div className="flex items-center gap-1">
          {(() => {
            const key = value.protected_domain_state ?? "null";
            return (
              <>
                <LucideReact.Shield className={protectionMap[key].color} size={16} />
                <dt className="font-medium">Domain State:</dt>
                <dd className={protectionMap[key].color}>
                  {protectionMap[key].label}
                </dd>
              </>
            );
          })()}
        </div>
        <dt className="font-medium">Pending Unverify At:</dt>
        <dd>{formattedPendingUnverify}</dd>
      </dl>

      {/* Source info */}
      {value.source && (
        <div className="text-sm">
          <dt className="font-medium">Source:</dt>
          <dd>
            <span className="font-mono bg-gray-100 px-1 rounded-sm">
              {value.source.branch}:{value.source.path}
            </span>
          </dd>
        </div>
      )}

      {/* HTTPS Certificate details */}
      {cert && (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1">
            {certStateMap[cert.state]?.icon}
            <dt className="font-medium">Certificate:</dt>
            <dd>{certStateMap[cert.state]?.label}</dd>
          </div>
          <dt className="font-medium">Domains:</dt>
          <dd>{cert.domains.join(", ")}</dd>
          <dt className="font-medium">Expires:</dt>
          <dd>{formattedCertExpiry}</dd>
          {cert.description && (
            <>
              <dt className="font-medium">Note:</dt>
              <dd className="italic text-gray-600">{cert.description}</dd>
            </>
          )}
        </div>
      )}
    </div>
  );
}
