import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    title: "Introduction",
    type: "page",
    display: "hidden",
    theme: {
      timestamp: false,
      // typesetting: "article",
      layout: "full",
      // navbar: false,
      toc: false,
      sidebar: false,
      footer: false,
      breadcrumb: false,
      collapsed: false,
      pagination: false,
    },
  },
  docs: {
    title: "📖 Guide Documents",
    type: "page",
  },
};
export default meta;
