import Typography from "@/components/atom/typography";
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
      <main className="container mx-auto max-w-7xl px-4 pt-12 md:px-8">
        <Typography as="h1" size="4xl" className="text-center md:text-left">
          {title}
        </Typography>
        {children}
      </main>
    </>
  );
};

export default BaseLayout;
