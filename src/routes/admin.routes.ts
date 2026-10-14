const prefix = "/admin";
export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Instructor Approval",
        url: `${prefix}/approve-instructor`,
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
