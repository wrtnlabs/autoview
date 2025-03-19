import type { Meta, StoryObj } from "@storybook/react";

import { DefaultList } from "./component";

const meta = {
  title: "DefaultList",
  component: DefaultList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DefaultList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};
