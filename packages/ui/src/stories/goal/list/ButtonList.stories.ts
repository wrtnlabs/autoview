import type { Meta, StoryObj } from "@storybook/react";

import { ButtonList } from "./component";

const meta = {
  title: "ButtonList",
  component: ButtonList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};
