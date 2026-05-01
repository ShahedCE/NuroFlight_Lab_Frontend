// src/app/team/page.tsx
export const revalidate = 60;

import { getTeamMembers } from "@/lib/public/public-api";
import TeamClient from "./team-client";

export default async  function TeamPage() {
  const members= await getTeamMembers();
  return <TeamClient members={members} />;
}