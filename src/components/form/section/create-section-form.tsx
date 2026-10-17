import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { CreateSectionZodSchema } from "@/validation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCreateSection,
  useGetAllCourses,
  useGetAllInstructors,
  useGetAllSemesters,
} from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, Instructor, Semester } from "@/types";

const CreateSectionForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createSection, isPending } = useCreateSection();

  const { data: course } = useGetAllCourses();
  const { data: semester } = useGetAllSemesters();
  const { data: instructor } = useGetAllInstructors();

  const courses = course?.data || [];
  const semesters = semester?.data || [];
  const instructors = instructor?.data || [];

  const form = useForm({
    defaultValues: {
      name: "",
      capacity: 0,
      courseId: "",
      semesterId: "",
      instructorId: "",
    },
    validators: {
      onSubmit: CreateSectionZodSchema,
    },
    onSubmit: ({ value }) => {
      const sectionData = {
        name: value.name.trim(),
        capacity: Number(value.capacity),
        courseId: value.courseId.trim(),
        semesterId: value.semesterId.trim(),
        instructorId: value.instructorId.trim(),
      };

      createSection(sectionData, {
        onSuccess: () => {
          toast.success("Section created successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error creating section:", error);
          toast.error(error.message || "Failed to create section");
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Section Name</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. CSE-201-A"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="capacity">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Student Capacity</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  placeholder="e.g. 40"
                  value={field.state.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(value === "" ? 0 : Number(value));
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="courseId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Course</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>

                  <SelectContent>
                    {courses.map((course: Course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="semesterId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Semester</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>

                  <SelectContent>
                    {semesters.map((semester: Semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="instructorId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Instructor</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Instructor" />
                  </SelectTrigger>

                  <SelectContent>
                    {instructors.map((instructor: Instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Section"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CreateSectionForm;
