"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./db";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

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

type GetAllJobsTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = { clerkId: userId };

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: { id, clerkId: userId },
    });
    return job;
  } catch (error) {
    return null;
  }
}
