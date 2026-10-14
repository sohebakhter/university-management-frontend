const prefix = "/student";
export const studentRoutes = [
  {
    title: "Section",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Section",
        url: `${prefix}/my-section`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
