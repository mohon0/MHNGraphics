import Footer from "@/components/layout/footer/Footer";
import SearchHeader from "@/components/layout/Header/SearchHeader";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SearchHeader />
      {children}
      <Footer />
    </div>
  );
}
