import {
  Activity,
  Building2,
  CalendarHeart,
  Clock,
  Euro,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Home,
  Hospital,
  MapPinned,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  building: Building2,
  calendar: CalendarHeart,
  clock: Clock,
  euro: Euro,
  graduation: GraduationCap,
  handshake: Handshake,
  heart: HeartHandshake,
  home: Home,
  hospital: Hospital,
  map: MapPinned,
  shield: ShieldCheck,
  users: Users,
};

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? HeartHandshake;
  return <Cmp className={className} aria-hidden="true" strokeWidth={1.75} />;
}
