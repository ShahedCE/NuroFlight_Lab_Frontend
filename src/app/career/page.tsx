export const revalidate = 60;

import { getJobPosts } from "@/lib/public/public-api";
import CareerClient from "./CareerClient";

// The reason for a rewrite: 
// There's a type incompatibility between `PublicJobPost` and the expected `JobPost` type in CareerClient,
// specifically because `deadline` can be `null` or `undefined` (instead of just `string | undefined`).
// We need to map the result so that any `null` deadline is converted to `undefined`.

export default async function CareerPage() {
  const jobPosts = (await getJobPosts()).map((job) => ({
    ...job,
    deadline: job.deadline === null ? undefined : job.deadline,
  }));
  return <CareerClient jobs={jobPosts} />;
}