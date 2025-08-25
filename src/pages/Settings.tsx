export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="mt-2">Manage your profile settings.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Billing</h2>
          <p className="mt-2">Manage your billing information.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="mt-2">Manage your notification settings.</p>
        </div>
      </div>
    </div>
  );
}
