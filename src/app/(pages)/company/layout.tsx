import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
