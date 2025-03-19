import type { Meta, StoryObj } from "@storybook/react";

import { AvatarGroupTotal } from "./component";

const meta = {
  title: "AvatarGroupTotal",
  component: AvatarGroupTotal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarGroupTotal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
