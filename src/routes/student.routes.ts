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
        title: "My Registration",
        url: `${prefix}/my-registration`,
      },
    ],
  },
  {
    title: "Examination Management",
    items: [
      {
        title: "Exams",
        url: `${prefix}/exam`,
      },
    ],
  },
  {
    title: "Result Management",
    items: [
      {
        title: "My Results",
        url: `${prefix}/result`,
      },
    ],
  },
  {
    title: "Attendance Management",
    items: [
      {
        title: "My Attendance",
        url: `${prefix}/attendance`,
      },
    ],
  },
  {
    title: "Payment Management",
    items: [
      {
        title: "Payments History",
        url: `${prefix}/payments`,
      },
    ],
  },
];
