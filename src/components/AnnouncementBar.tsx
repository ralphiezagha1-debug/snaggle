import { Megaphone } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white text-sm">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-2">
        <Megaphone className="h-4 w-4" />
        <span>🚀 Snaggle is live on Firebase — UI polish and features landing this week.</span>
      </div>
    </div>
  );
}
