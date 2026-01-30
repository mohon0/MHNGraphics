import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header/Header';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header fixed />
      {children}
      <Footer />
    </div>
  );
}
