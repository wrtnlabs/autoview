import type { Meta, StoryObj } from "@storybook/react";

import { DefaultAvatarGroup } from "./component";

const meta = {
  title: "DefaultAvatarGroup",
  component: DefaultAvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DefaultAvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
