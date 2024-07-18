"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField, CustomFormSelect } from "./FormComponentsFile";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/utils/actions";

/* const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
}); */
function CreateJobForm() {
  // 1. Define your form
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "There was an error!" });
        return;
      }
      toast({ description: "Job created!" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/jobs");
    },
  });

  // 2. Define a submit handler
  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "loading..." : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateJobForm;
