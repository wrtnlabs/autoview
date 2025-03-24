import type { Meta, StoryObj } from "@storybook/react";

import { List } from "../components/list/List";

const meta = {
  title: "List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "List",
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListWithSubheader: Story = {
  args: {
    type: "List",
    childrenProps: [
      {
        type: "ListSubheader",
        stickToTop: false,
        childrenProps: [
          {
            type: "Text",
            variant: "subtitle2",
            content: "WrtnLabs",
          },
          {
            type: "Text",
            variant: "body2",
            content: "List of team members",
          },
        ],
      },
      {
        type: "ListItem",
        title: "Amber",
        description: "Frontend engineer",
        startElement: {
          type: "Avatar",
          src: "https://images.unsplash.com/photo-1594583388647-364ea6532257?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaG90byUyMGZyZWV8ZW58MHx8MHx8fDA%3D",
          name: "test",
        },
        href: "http://www.naver.com",
        endElement: {
          type: "Chip",
          label: "Active",
          color: "green",
        },
      },
      {
        type: "ListItem",
        title: "Jaxtyn",
        description: "Frontend engineer",
        startElement: {
          type: "Avatar",
          src: "https://plus.unsplash.com/premium_photo-1706429674214-09686c64c6a6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBob3RvJTIwZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
          name: "test",
        },
        href: "http://www.naver.com",
        endElement: {
          type: "Chip",
          label: "Pending",
          color: "orange",
        },
      },
      {
        type: "ListItem",
        title: "Michael",
        description: "Backend engineer",
        startElement: {
          type: "Avatar",
          src: "https://plus.unsplash.com/premium_photo-1674933214600-483da3cb2d0c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvJTIwZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
          name: "test",
        },
        href: "http://www.naver.com",
        endElement: {
          type: "Chip",
          label: "Rejected",
          color: "red",
        },
      },
    ],
  },
};

export const ComplexList: Story = {
  args: {
    type: "List",
    childrenProps: [
      {
        type: "ListItem",
        title: "Bitcoin",
        description: "BTC",
        startElement: {
          type: "Icon",
          id: "bitcoin",
          color: "orange",
          size: 32,
        },
        endElement: [
          {
            type: "Chip",
            color: "green",
            label: "0.33%",
            startElement: {
              type: "Icon",
              id: "caret-up",
              size: 12,
            },
          },
        ],
      },
      {
        type: "ListItem",
        title: "Ethereum",
        description: "ETC",
        startElement: {
          type: "Icon",
          id: "ethereum",
          color: "darkGray",
          size: 32,
        },
        endElement: [
          {
            type: "Chip",
            color: "green",
            label: "0.26%",
            startElement: {
              type: "Icon",
              id: "caret-up",
              size: 12,
            },
          },
        ],
      },
      {
        type: "ListItem",
        title: "Tether",
        description: "USDT",
        startElement: {
          type: "Icon",
          id: "coins",
          size: 32,
          color: "gray",
        },
        endElement: [
          {
            type: "Chip",
            color: "red",
            label: "0.26%",
            startElement: {
              type: "Icon",
              id: "caret-down",
              size: 12,
            },
          },
        ],
      },
    ],
  },
};
