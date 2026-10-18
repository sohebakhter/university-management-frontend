const prefix = "/student";
export const studentRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Available Section",
        url: `${prefix}/section`,
      },
    ],
  },
  {
    title: "Registration Management",
    items: [
      {
        title: "Registration",
        url: `${prefix}/registration`,
      },
    ],
  },
];
