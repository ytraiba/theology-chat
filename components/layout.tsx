interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="h-fit sm:h-16 w-full pt-4 sm:py-4  ">
          <nav className="ml-4 sm:pl-6">
            <a href="https://www.yasintraiba.com/" className="hover:text-slate-600 cursor-pointer">
              Built By Yasin Traiba
            </a>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
