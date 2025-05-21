import { tags } from "typia";
import React from "react";
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
        "public": boolean;
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
        state: "new" | "authorization_created" | "authorization_pending" | "authorized" | "authorization_revoked" | "issued" | "uploaded" | "approved" | "errored" | "bad_authz" | "destroy_pending" | "dns_changed";
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
  const displayDomain = value.cname ?? value.html_url ?? value.url;
  const statusMap: Record<string, { label: string; color: string }> = {
    built: { label: "Built", color: "green" },
    building: { label: "Building", color: "yellow" },
    errored: { label: "Errored", color: "red" },
    null: { label: "Unknown", color: "gray" },
  };
  const statusKey = value.status ?? "null";
  const { label: statusLabel, color: statusColor } = statusMap[statusKey] ?? statusMap.null;
  const buildTypeLabel = value.build_type
    ? value.build_type.charAt(0).toUpperCase() + value.build_type.slice(1)
    : null;
  const publicLabel = value.public ? "Public" : "Private";
  const publicColor = value.public ? "green" : "gray";
  const custom404Label = value.custom_404 ? "Enabled" : "Disabled";
  const custom404Color = value.custom_404 ? "green" : "gray";
  const domainStateLabel = value.protected_domain_state
    ? value.protected_domain_state === "pending"
      ? "Pending Verification"
      : value.protected_domain_state === "verified"
      ? "Verified"
      : "Unverified"
    : null;
  const domainStateColor =
    value.protected_domain_state === "verified"
      ? "green"
      : value.protected_domain_state === "unverified"
      ? "red"
      : "yellow";

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {displayDomain}
        </h2>
        <div className="flex space-x-2">
          <span
            className={`px-2 py-0.5 text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800 rounded-full`}
          >
            {statusLabel}
          </span>
          <span
            className={`px-2 py-0.5 text-xs font-medium bg-${publicColor}-100 text-${publicColor}-800 rounded-full`}
          >
            {publicLabel}
          </span>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <dt className="font-medium text-gray-700">URL</dt>
          <dd className="truncate">{value.url}</dd>
        </div>
        {buildTypeLabel && (
          <div>
            <dt className="font-medium text-gray-700">Build Type</dt>
            <dd>{buildTypeLabel}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium text-gray-700">Custom 404</dt>
          <dd>
            <span
              className={`px-2 py-0.5 text-xs font-medium bg-${custom404Color}-100 text-${custom404Color}-800 rounded-full`}
            >
              {custom404Label}
            </span>
          </dd>
        </div>
        {domainStateLabel && (
          <div>
            <dt className="font-medium text-gray-700">Domain State</dt>
            <dd>
              <span
                className={`px-2 py-0.5 text-xs font-medium bg-${domainStateColor}-100 text-${domainStateColor}-800 rounded-full`}
              >
                {domainStateLabel}
              </span>
            </dd>
          </div>
        )}
        {value.pending_domain_unverified_at && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-gray-700">
              Verification Expires At
            </dt>
            <dd>{formatDateTime(value.pending_domain_unverified_at)}</dd>
          </div>
        )}
        {value.source && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-gray-700">Source</dt>
            <dd>
              <span className="font-mono">
                {value.source.branch}:{value.source.path}
              </span>
            </dd>
          </div>
        )}
        {value.https_enforced != null && (
          <div>
            <dt className="font-medium text-gray-700">HTTPS Enforced</dt>
            <dd>{value.https_enforced ? "Yes" : "No"}</dd>
          </div>
        )}
      </dl>

      {value.https_certificate && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-md font-semibold text-gray-800">
            HTTPS Certificate
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {value.https_certificate.state}
            </span>
            <span className="text-sm text-gray-600">
              {value.https_certificate.description}
            </span>
          </div>
          <div className="mt-3">
            <dt className="font-medium text-gray-700">Domains</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {value.https_certificate.domains.map((d) => (
                <span
                  key={d}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                >
                  {d}
                </span>
              ))}
            </dd>
          </div>
          {value.https_certificate.expires_at && (
            <div className="mt-2 text-sm text-gray-600">
              Expires at:{" "}
              {new Date(
                value.https_certificate.expires_at
              ).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
