import { Outlet } from "react-router-dom";

export default function AppLayout() {
  console.log("Rendering AppLayout");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
