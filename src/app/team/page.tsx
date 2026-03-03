// src/app/team/page.tsx
export const revalidate = 60;

import { teamMembers } from "@/dummy_data/team";
import TeamClient from "./team-client";

export default function TeamPage() {
  return <TeamClient members={teamMembers} />;
}