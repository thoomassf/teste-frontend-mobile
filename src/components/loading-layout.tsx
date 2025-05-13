import Footer from "./footer";
import Header from "./header";

export default function LoadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      {children}
      
      <Footer />
    </div>
  )
}