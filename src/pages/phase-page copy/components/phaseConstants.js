import { Crown, ShieldCheck, User } from "lucide-react";

export const PHASES = [
  {
    key: "master_scheduler",
    label: "Master Scheduler",
    icon: Crown,
    desc: "The Master Scheduler is distributing General Education Schedules to all departments.",
    color: "purple",
  },
  {
    key: "super_user",
    label: "Super User",
    icon: ShieldCheck,
    desc: "The Super-Users are distributing department-specific GE subjects to other departments.",
    color: "blue",
  },
  {
    key: "user",
    label: "Regular User",
    icon: User,
    desc: "Regular users are filling up their department schedules with courses.",
    color: "green",
  },
];

export const STEPS = [
  { year: 1, sem: 1, label: "1st Year - 1st Sem" },
  { year: 2, sem: 1, label: "2nd Year - 1st Sem" },
  { year: 3, sem: 1, label: "3rd Year - 1st Sem" },
  { year: 4, sem: 1, label: "4th Year - 1st Sem" },
  { year: 1, sem: 2, label: "1st Year - 2nd Sem" },
  { year: 2, sem: 2, label: "2nd Year - 2nd Sem" },
  { year: 3, sem: 2, label: "3rd Year - 2nd Sem" },
  { year: 4, sem: 2, label: "4th Year - 2nd Sem" },
];
