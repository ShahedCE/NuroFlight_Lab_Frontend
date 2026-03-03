export const revalidate = 60;

import { jobPosts } from "@/dummy_data/career";
import CareerClient from "./CareerClient";

export default function CareerPage() {
  return <CareerClient jobs={jobPosts} />;
}