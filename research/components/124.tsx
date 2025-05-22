import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace IShoppingDeliveryPiece {
    /**
     * Creation information of the delivery piece.
     */
    export type ICreate = {
      /**
       * Target order's {@link IShoppingOrderPublish.id}.
       *
       * @title Target order's {@link IShoppingOrderPublish.id}
       */
      publish_id: string;
      /**
       * Target good's {@link IShoppingOrderGood.id}.
       *
       * @title Target good's {@link IShoppingOrderGood.id}
       */
      good_id: string;
      /**
       * Target stock's {@link IShoppingSaleUnitStock.id}.
       *
       * @title Target stock's {@link IShoppingSaleUnitStock.id}
       */
      stock_id: string;
      /**
       * Quantity of the stock.
       *
       * It can be precision value to express split shipping.
       *
       * @title Quantity of the stock
       */
      quantity: number;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalItems = value.length;
  const totalQuantity = value.reduce((sum, piece) => sum + piece.quantity, 0);

  const piecesByOrder: Record<
    string,
    AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[]
  > = value.reduce(
    (acc, piece) => {
      const { publish_id } = piece;
      if (!acc[publish_id]) acc[publish_id] = [];
      acc[publish_id].push(piece);
      return acc;
    },
    {} as Record<
      string,
      AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[]
    >,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Summary Header */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Package size={20} className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold">Delivery Pieces Summary</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Quantity</span>
          <span>{totalQuantity}</span>
        </div>
      </div>

      {/* Grouped by Order */}
      {Object.entries(piecesByOrder).map(([orderId, pieces]) => (
        <section key={orderId} className="mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-2">
            Order ID: <span className="font-normal">{orderId}</span>
          </h3>
          <ul className="space-y-2">
            {pieces.map((piece, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 p-3 rounded"
              >
                <div className="flex items-center text-sm text-gray-700 mb-1 sm:mb-0">
                  <LucideReact.Box size={16} className="mr-1 text-gray-500" />
                  <span className="truncate">
                    Good ID:{" "}
                    <span className="font-medium">{piece.good_id}</span>
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Truck size={16} className="mr-1 text-gray-500" />
                  <span>
                    Quantity:{" "}
                    <span className="font-medium">{piece.quantity}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
