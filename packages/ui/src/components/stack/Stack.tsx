import { IAutoViewStackProps } from "@autoview/interface";
import { Stack as MuiStack } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const Stack = ({
  direction,
  justifyContent,
  alignItems,
  wrap,
  gap,
  childComponents,
}: IAutoViewStackProps) => {
  return (
    <MuiStack
      direction={direction}
      justifyContent={justifyContent ?? "flex-start"}
      alignItems={alignItems ?? "center"}
      flexWrap={wrap}
      gap={gap}
      sx={{
        "> *": {
          width: direction === "row" ? undefined : "100%",
          maxWidth: "100%",
          flexShrink: 0,
        },
      }}
    >
      {renderComponent(childComponents)}
    </MuiStack>
  );
};
