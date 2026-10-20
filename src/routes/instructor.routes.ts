const prefix = "/instructor";
export const instructorRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Sections",
        url: `${prefix}/section`,
      },
    ],
  },
  {
    title: "Examination Management",
    items: [
      {
        title: "Examination",
        url: `${prefix}/exam`,
      },
    ],
  },
  {
    title: "Result Management",
    items: [
      {
        title: "Results",
        url: `${prefix}/result`,
      },
    ],
  },
  
];
