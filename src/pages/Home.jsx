import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-9xl font-bold">ADVYON</h1>
      <SignedIn>
        <div className="absolute top-5 right-5 z-50">
          <SignOutButton>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="absolute top-5 right-5 z-50">
          <a href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </a>
        </div>
      </SignedOut>
    </div>
  );
}
