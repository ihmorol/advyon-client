import { Outlet } from "react-router-dom";
import CursorAnimation from "@/components/CursorAnimation";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CursorAnimation />
      <main className="p-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
