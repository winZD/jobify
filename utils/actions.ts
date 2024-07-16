"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./db";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import { redirect } from "next/navigation";

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) redirect("/");
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: { clerkId: userId, ...values },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}
