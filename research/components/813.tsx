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
  const statusInfo = (() => {
    switch (value.status) {
      case "built":
        return {
          label: "Built",
          icon: (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ),
        };
      case "building":
        return {
          label: "Building",
          icon: <LucideReact.Clock className="text-amber-500" size={16} />,
        };
      case "errored":
        return {
          label: "Errored",
          icon: (
            <LucideReact.AlertTriangle className="text-red-500" size={16} />
          ),
        };
      default:
        return {
          label: "Unknown",
          icon: <LucideReact.HelpCircle className="text-gray-400" size={16} />,
        };
    }
  })();

  const domainStateInfo = (() => {
    switch (value.protected_domain_state ?? null) {
      case "pending":
        return {
          label: "Pending",
          icon: <LucideReact.Clock className="text-amber-500" size={16} />,
        };
      case "verified":
        return {
          label: "Verified",
          icon: (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ),
        };
      case "unverified":
        return {
          label: "Unverified",
          icon: <LucideReact.XCircle className="text-red-500" size={16} />,
        };
      default:
        return {
          label: "N/A",
          icon: <LucideReact.HelpCircle className="text-gray-400" size={16} />,
        };
    }
  })();

  const formattedPendingUnverified = value.pending_domain_unverified_at
    ? new Date(value.pending_domain_unverified_at).toLocaleString()
    : null;

  const formattedCertExpires = value.https_certificate?.expires_at
    ? new Date(value.https_certificate.expires_at).toLocaleDateString()
    : null;

  const certInfo = (() => {
    const cert = value.https_certificate;
    if (!cert) {
      return {
        label: "None",
        icon: <LucideReact.Lock className="text-gray-400" size={16} />,
      };
    }
    let icon;
    switch (cert.state) {
      case "issued":
      case "authorized":
        icon = <LucideReact.CheckCircle className="text-green-500" size={16} />;
        break;
      case "errored":
      case "bad_authz":
        icon = <LucideReact.AlertTriangle className="text-red-500" size={16} />;
        break;
      default:
        icon = <LucideReact.Clock className="text-amber-500" size={16} />;
    }
    return { label: cert.state, icon };
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <header className="flex items-center gap-2">
        <LucideReact.Globe size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">GitHub Pages</h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          {statusInfo.icon}
          <span className="text-gray-700">
            Status: <span className="font-medium">{statusInfo.label}</span>
          </span>
        </div>

        <div className="flex items-start gap-2">
          <LucideReact.Link size={16} className="text-gray-400 mt-[2px]" />
          <div className="text-blue-600 break-all">
            {value.html_url || value.url}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span className="text-gray-700">
            Build type:{" "}
            <span className="font-medium">{value.build_type ?? "N/A"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span className="text-gray-700">
            CNAME: <span className="font-medium">{value.cname || "None"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {domainStateInfo.icon}
          <span className="text-gray-700">
            Domain state:{" "}
            <span className="font-medium">{domainStateInfo.label}</span>
          </span>
        </div>

        {formattedPendingUnverified && (
          <div className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="text-gray-700">
              Pending unverified at:{" "}
              <span className="font-medium">{formattedPendingUnverified}</span>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <LucideReact.FileText
            size={16}
            className={` ${value.custom_404 ? "text-green-500" : "text-gray-400"}`}
          />
          <span className="text-gray-700">
            Custom 404:{" "}
            <span className="font-medium">
              {value.custom_404 ? "Yes" : "No"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {value.public ? (
            <LucideReact.Unlock size={16} className="text-green-500" />
          ) : (
            <LucideReact.Lock size={16} className="text-red-500" />
          )}
          <span className="text-gray-700">
            Public site:{" "}
            <span className="font-medium">{value.public ? "Yes" : "No"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {value.https_enforced ? (
            <LucideReact.Lock size={16} className="text-green-500" />
          ) : (
            <LucideReact.Unlock size={16} className="text-gray-400" />
          )}
          <span className="text-gray-700">
            HTTPS enforced:{" "}
            <span className="font-medium">
              {value.https_enforced ? "Yes" : "No"}
            </span>
          </span>
        </div>
      </div>

      {value.source && (
        <div className="bg-gray-50 p-3 rounded-md">
          <h3 className="text-sm font-medium text-gray-800 mb-1">
            Source Configuration
          </h3>
          <p className="text-gray-700 text-sm">
            Branch: <span className="font-medium">{value.source.branch}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Path: <span className="font-medium">{value.source.path}</span>
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-3 rounded-md space-y-1">
        <h3 className="text-sm font-medium text-gray-800">HTTPS Certificate</h3>
        <div className="flex items-center gap-2">
          {certInfo.icon}
          <span className="text-gray-700">
            State: <span className="font-medium">{certInfo.label}</span>
          </span>
        </div>
        {value.https_certificate?.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {value.https_certificate.description}
          </p>
        )}
        {value.https_certificate?.domains && (
          <p className="text-gray-700 text-sm">
            Domains:{" "}
            <span className="font-medium">
              {value.https_certificate.domains.join(", ")}
            </span>
          </p>
        )}
        {formattedCertExpires && (
          <p className="text-gray-700 text-sm">
            Expires: <span className="font-medium">{formattedCertExpires}</span>
          </p>
        )}
      </div>
    </div>
  );
}
