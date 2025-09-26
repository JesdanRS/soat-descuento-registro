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
      {/* Franja de logo superior */}
      <div className="w-full bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-start items-center">
          <a href="/" aria-label="Inicio" className="inline-flex items-center">
            <img
              src="/assets/image.png"
              alt="Logo principal"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain select-none"
              draggable={false}
            />
          </a>
        </div>
      </div>

      {/* Barra de navegación debajo del logo */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center">
          <nav className="hidden lg:flex items-center space-x-8">
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

          {/* Botón menú móvil (opcional) */}
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