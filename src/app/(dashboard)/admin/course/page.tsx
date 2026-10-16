import CourseList from "@/components/modules/courses/course-list";

const CoursePage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p>here is the courses.</p>
      </div>
      <CourseList />
    </div>
  );
};

export default CoursePage;
