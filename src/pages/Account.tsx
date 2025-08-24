import { useAuth } from "../state/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AccountPage() {
  const { user, updateProfile, signOut } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");

  if (!user) return null;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Account</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium">Display name</label>
          <Input value={displayName} onChange={e=>setDisplayName(e.target.value)} />
          <Button onClick={async ()=>{ if (updateProfile) await updateProfile({ displayName }); }}>Save</Button>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium">Email</label>
          <Input disabled value={user.email ?? ""} />
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
      </div>
    </div>
  );
}
