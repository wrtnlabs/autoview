import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The configuration for GitHub Pages for a repository.
   *
   * @title GitHub Pages
   */
  export type page = {
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
    public: boolean;
    https_certificate?: AutoViewInputSubTypes.pages_https_certificate;
    /**
     * Whether https is enabled on the domain
     */
    https_enforced?: boolean;
  };
  /**
   * @title Pages Source Hash
   */
  export type pages_source_hash = {
    branch: string;
    path: string;
  };
  /**
   * @title Pages Https Certificate
   */
  export type pages_https_certificate = {
    state:
      | "new"
      | "authorization_created"
      | "authorization_pending"
      | "authorized"
      | "authorization_revoked"
      | "issued"
      | "uploaded"
      | "approved"
      | "errored"
      | "bad_authz"
      | "destroy_pending"
      | "dns_changed";
    description: string;
    /**
     * Array of the domain set and its alternate name (if it is configured)
     */
    domains: string[];
    expires_at?: string & tags.Format<"date">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.page;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const buildStatus = value.status ?? "unknown";
  let StatusIcon: any = LucideReact.Circle;
  let statusColor = "text-gray-400";
  switch (buildStatus) {
    case "built":
      StatusIcon = LucideReact.CheckCircle;
      statusColor = "text-green-500";
      break;
    case "building":
      StatusIcon = LucideReact.Loader;
      statusColor = "animate-spin text-blue-500";
      break;
    case "errored":
      StatusIcon = LucideReact.AlertTriangle;
      statusColor = "text-red-500";
      break;
  }

  const domainState = value.protected_domain_state ?? null;
  let DomainStateIcon: any = null;
  let domainColor = "";
  if (domainState) {
    switch (domainState) {
      case "verified":
        DomainStateIcon = LucideReact.CheckCircle;
        domainColor = "text-green-500";
        break;
      case "pending":
        DomainStateIcon = LucideReact.Clock;
        domainColor = "text-amber-500";
        break;
      case "unverified":
        DomainStateIcon = LucideReact.AlertTriangle;
        domainColor = "text-red-500";
        break;
    }
  }
  const pendingUnverifiedDate = value.pending_domain_unverified_at
    ? new Date(value.pending_domain_unverified_at).toLocaleString()
    : null;

  let CertIcon: any = LucideReact.Info;
  let certColor = "text-gray-400";
  if (value.https_certificate) {
    const certState = value.https_certificate.state;
    switch (certState) {
      case "issued":
      case "authorized":
        CertIcon = LucideReact.CheckCircle;
        certColor = "text-green-500";
        break;
      case "authorization_pending":
      case "new":
      case "authorization_created":
      case "dns_changed":
      case "destroy_pending":
        CertIcon = LucideReact.Clock;
        certColor = "text-amber-500";
        break;
      case "errored":
      case "bad_authz":
        CertIcon = LucideReact.AlertTriangle;
        certColor = "text-red-500";
        break;
      default:
        CertIcon = LucideReact.Info;
        certColor = "text-gray-400";
    }
  }
  const expiresAtDate = value.https_certificate?.expires_at
    ? new Date(value.https_certificate.expires_at).toLocaleDateString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">GitHub Pages</h2>
        <div className={`flex items-center gap-1 ${statusColor}`}>
          <StatusIcon size={16} />
          <span className="capitalize text-sm">{buildStatus}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600 break-all">
        <LucideReact.Link size={16} />
        <span className="text-sm">{value.html_url || value.url}</span>
      </div>

      {value.source && (
        <div className="flex items-center gap-1 text-gray-600">
          <LucideReact.GitBranch size={16} />
          <span className="text-sm font-medium">{value.source.branch}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm font-mono">{value.source.path}</span>
        </div>
      )}

      {value.cname && (
        <div className="flex items-center gap-2 text-gray-600">
          <LucideReact.Globe size={16} />
          <span className="text-sm">{value.cname}</span>
          {DomainStateIcon && (
            <DomainStateIcon size={16} className={`${domainColor}`} />
          )}
          {domainState === "pending" && pendingUnverifiedDate && (
            <span className="text-xs text-gray-400 ml-2">
              Expires: {pendingUnverifiedDate}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-1 text-gray-600">
          {value.public ? (
            <LucideReact.Eye size={16} className="text-green-500" />
          ) : (
            <LucideReact.EyeOff size={16} className="text-gray-400" />
          )}
          <span className="text-sm">{value.public ? "Public" : "Private"}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          {value.https_enforced ? (
            <LucideReact.Lock size={16} className="text-green-500" />
          ) : (
            <LucideReact.Unlock size={16} className="text-red-500" />
          )}
          <span className="text-sm">
            HTTPS {value.https_enforced ? "Enforced" : "Not Enforced"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-600">
        {value.custom_404 ? (
          <LucideReact.CheckCircle size={16} className="text-green-500" />
        ) : (
          <LucideReact.XCircle size={16} className="text-gray-400" />
        )}
        <span className="text-sm">Custom 404 Page</span>
      </div>

      {value.build_type && (
        <div className="flex items-center gap-1 text-gray-600">
          <LucideReact.Package size={16} />
          <span className="text-sm capitalize">{value.build_type} build</span>
        </div>
      )}

      {value.https_certificate && (
        <div className="p-3 bg-gray-50 rounded-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              HTTPS Certificate
            </span>
            <CertIcon size={16} className={certColor} />
          </div>
          <p className="text-sm text-gray-600">
            {value.https_certificate.description}
          </p>
          <p className="text-xs text-gray-500">
            Domains: {value.https_certificate.domains.join(", ")}
          </p>
          {expiresAtDate && (
            <p className="text-xs text-gray-500">Expires: {expiresAtDate}</p>
          )}
        </div>
      )}
    </div>
  );
}
