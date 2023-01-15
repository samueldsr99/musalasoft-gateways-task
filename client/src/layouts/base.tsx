import Navbar from "@/components/navbar";

export type BaseLayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

const BaseLayout: React.FC<BaseLayoutProps> = ({ title, children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto max-w-7xl px-4 pt-12 pb-20 md:px-8">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </>
  );
};

export default BaseLayout;
