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
  {
    title: "Semester Management",
    items: [
      {
        title: "Semester",
        url: `${prefix}/semester`,
      },
    ],
  },
  {
    title: "Section Management",
    items: [
      {
        title: "Section",
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
