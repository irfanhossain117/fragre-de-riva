export default function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-10">

      <div>

        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back Admin
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-full bg-[#A88442]" />

      </div>

    </header>
  );
}