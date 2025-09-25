import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-background via-secondary/30 to-primary/10">
        <div className="w-full max-w-lg">
          <RegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
