import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
