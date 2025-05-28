import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_AlarmType {
        export interface ReadResponseType_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_AlarmType.ReadResponseType_gt_;
        }
    }
    export namespace PaginationResponseType_lt_AlarmType {
        export interface ReadResponseType_gt_ {
            list: AutoViewInputSubTypes.AlarmType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        }
    }
    export namespace AlarmType {
        export interface Element {
            id: number;
            /**
             * 유저의 아이디
            */
            userId: number & tags.Type<"int32">;
            resourceName?: string;
            /**
             * 알람이 가리키는 리소스의 아이디로, 리소스마다 동일한 숫자의 아이디를 가질 수 있기에 유니크한 값이 아니다.
            */
            resourceId?: number & tags.Type<"int32">;
            redirectLink?: number;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_AlarmType.ReadResponseType_gt_;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure and derive pagination metadata
  const {
    data: { list, totalResult, totalPage, page, search },
  } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header: search info and pagination summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {search && (
          <div className="text-sm text-gray-500">
            Searched for{" "}
            <span className="font-medium text-gray-700">&quot;{search}&quot;</span>
          </div>
        )}
        <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
          <div>
            Page{" "}
            <span className="font-medium text-gray-800">{page}</span> of{" "}
            <span className="font-medium text-gray-800">{totalPage}</span>
          </div>
          <div>
            <span className="font-medium text-gray-800">{list.length}</span> items
          </div>
          <div>
            Total: <span className="font-medium text-gray-800">{totalResult}</span>
          </div>
        </div>
      </div>

      {/* List of alarms */}
      <ul className="divide-y divide-gray-200">
        {list.map((item) => (
          <li
            key={item.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Alarm ID */}
            <div className="flex items-center space-x-2">
              <LucideReact.Hash size={16} className="text-gray-500" />
              <span className="font-medium text-gray-800">#{item.id}</span>
            </div>

            {/* Details */}
            <div className="mt-2 sm:mt-0 flex flex-wrap items-center space-x-4 text-gray-600">
              {/* User ID */}
              <div className="flex items-center space-x-1">
                <LucideReact.User size={16} className="text-gray-500" />
                <span>User {item.userId}</span>
              </div>

              {/* Resource Name */}
              <div className="flex items-center space-x-1">
                <LucideReact.FileText size={16} className="text-gray-500" />
                <span>{item.resourceName ?? "N/A"}</span>
              </div>

              {/* Resource ID */}
              <div className="flex items-center space-x-1">
                <LucideReact.Hash size={16} className="text-gray-500" />
                <span>{item.resourceId != null ? item.resourceId : "N/A"}</span>
              </div>

              {/* Redirect Link */}
              {item.redirectLink != null && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Link size={16} className="text-blue-500" />
                  <span>{item.redirectLink}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
