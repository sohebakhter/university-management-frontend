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
    title: "Department Management",
    items: [
      {
        title: "Departments",
        url: `${prefix}/department`,
      },
    ],
  },
  {
    title: "Course Management",
    items: [
      {
        title: "Course",
        url: `${prefix}/course`,
      },
    ],
  },
];
