import { Button } from "@/components/ui/button";

const Header = () => {
  const navigationItems = [
    "Inicio",
    "Guía de atención de su siniestro", 
    "Precios SOAT",
    "Puntos de Venta",
    "Comprobante SOAT",
    "Verificar de vigencia de SOAT",
    "Compra tu SOAT",
    "Contáctanos"
  ];

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded"></div>
              <span className="text-xl font-bold text-primary">UNIVida</span>
              <span className="text-sm text-univida-gray">Seguros y Reaseguros Personales</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost" 
                className="text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50"
              >
                {item}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" className="lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;