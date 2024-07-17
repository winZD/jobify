"use client";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { JobStatus } from "@/utils/types";
import { Button } from "./ui/button";
import { FormEvent } from "react";

function SearchForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    console.log({ search, jobStatus });
  };
  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-xl"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Search jobs" name="search" />
      <Select name="jobStatus">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => (
            <SelectItem key={jobStatus} value={jobStatus}>
              {jobStatus}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchForm;
