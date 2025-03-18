import type { Meta, StoryObj } from "@storybook/react";

import { renderComponent } from "../renderer";

const meta = {
  title: "RenderComponent",
  component: renderComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof renderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
  args: {
    type: "Carousel",
    autoPlay: true,
    items: [
      {
        children: [
          {
            type: "Image",
            src: "https://plus.unsplash.com/premium_photo-1737659209063-32e2b1a385a5?q=80&w=3735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "1",
          },
          {
            type: "Text",
            variant: "body1",
            children: ["Slide 1"],
          },
        ],
      },
      {
        children: [
          {
            type: "Image",
            src: "https://images.unsplash.com/photo-1731331443866-8f6f72027157?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "2",
          },
          {
            type: "Text",
            variant: "body1",
            children: ["Slide 2"],
          },
        ],
      },
      {
        children: [
          {
            type: "Image",
            src: "https://images.unsplash.com/photo-1741115815553-20c3c83ca6c0?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "3",
          },
          {
            type: "Text",
            variant: "body1",
            children: ["Slide 3"],
          },
        ],
      },
    ],
    interval: 25,
    infinite: true,
    effect: "slide",
    speed: 10,
    dotPosition: "bottom",
    showArrows: true,
    indicators: true,
  },
};
