import React from "react";
export namespace AutoViewInputSubTypes {
    export type starred_repository = any;
    export type repository = any;
}
export type AutoViewInput = any[] | any[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repos: any[] = Array.isArray(value) ? value : [];

  if (repos.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No items to display.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, idx) => {
        // Derive display properties with sensible fallbacks
        const name: string = repo.name || repo.full_name || "Unnamed";
        const description: string = repo.description ?? "";
        const starCount: number = repo.stargazers_count ?? repo.stargazerCount ?? repo.stars ?? 0;
        const forkCount: number = repo.forks_count ?? repo.forkCount ?? 0;
        const language: string = (repo.primaryLanguage?.name) ?? repo.language ?? "";
        const updatedRaw: string | undefined = repo.updatedAt || repo.pushedAt || repo.updated_at;
        const updatedAt: string | null = updatedRaw
          ? new Date(updatedRaw).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;
        const avatarUrl: string | undefined = repo.owner?.avatarUrl || repo.owner?.avatar_url;

        return (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition p-4"
          >
            <div className="flex items-center mb-2">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                />
              )}
              <h3 className="text-gray-900 font-semibold text-lg truncate">
                {name}
              </h3>
            </div>
            {description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {description}
              </p>
            )}
            <div className="mt-auto flex flex-wrap items-center text-gray-500 text-xs sm:text-sm space-x-4">
              {language && (
                <span className="px-2 py-0.5 bg-gray-100 rounded">
                  {language}
                </span>
              )}
              <span className="flex items-center">
                <span className="mr-1">★</span>
                {starCount}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🍴</span>
                {forkCount}
              </span>
              {updatedAt && <span>Updated {updatedAt}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
