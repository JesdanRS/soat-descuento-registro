const Footer = () => {
  return (
    <footer className="w-full">
      {/* Orange section */}
      <div className="bg-univida-orange text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">
            Líneas Gratuitas: UNIVida: 800-10-9119 | SOAT: 800-10-8444
          </p>
          <p className="mb-2">"Atendemos las 24 horas, los 7 días de la semana."</p>
          <p>Compra tu SOAT por WhatsApp 67171702 (Univida-Luka).</p>
        </div>
      </div>

      {/* Blue section */}
      <div className="bg-univida-blue-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Risk Qualification */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 uppercase">
                Nuestra Calificación de Riesgo
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-3xl font-bold">A1</div>
                  <div className="text-sm text-gray-300">Otorgada por AESA RATINGS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">AA3</div>
                  <div className="text-sm text-gray-300">Otorgada por Moody's Local</div>
                </div>
              </div>
            </div>

            {/* Pages */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Páginas</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-univida-orange hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="text-univida-orange hover:text-white transition-colors">Empresa</a></li>
                <li><a href="#" className="text-univida-orange hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#" className="text-univida-orange hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-univida-orange hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Contáctanos</h3>
              <div className="text-sm space-y-2">
                <p>Av. Camacho, esquina Calle Bueno, N° 1485</p>
                <p>Edificio La Urbana, piso 3.</p>
                <p className="mt-4">
                  <span className="text-univida-orange">Email:</span> atencionalcliente@univida.bo
                </p>
                <p>(591-2) 2151000</p>
              </div>
            </div>
          </div>

          {/* APS Imagen */}
          <div className="mt-8 py-4 border-t border-white/20">
            <div className="bg-white rounded p-3 text-center">
              <img src="/assets/image2.png" alt="APS" className="mx-auto h-16 w-auto object-contain" />
            </div>
          </div>

          {/* Company name */}
          <div className="text-center mt-6 pt-4 border-t border-white/20">
            <p className="text-sm">SEGUROS Y REASEGUROS PERSONALES UNIVIDA S.A.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;