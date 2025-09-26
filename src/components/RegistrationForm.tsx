import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    placa: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Error",
        description: "Por favor complete los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      // Enviar datos al backend (ruta relativa para funcionar detrás de Nginx/EC2)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "¡Registro exitoso!",
          description: "Te contactaremos pronto con tu descuento del 10%",
        });

        // Reset form
        setFormData({
          email: "",
          password: "",
          placa: ""
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Error al procesar el registro",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor. Inténtalo más tarde.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            ¡Registrate para obtener el 10% de descuento!
          </CardTitle>
          <p className="text-muted-foreground">
            En tu próxima compra del SOAT
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo Electrónico *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-primary/30 focus:border-primary"
                placeholder="Ingrese su correo electrónico"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 border-primary/30 focus:border-primary"
                placeholder="Ingrese su contraseña"
              />
            </div>

            <div>
              <Label htmlFor="placa" className="text-sm font-medium text-foreground">
                PLACA
              </Label>
              <p className="text-xs text-muted-foreground mb-1">
                Para vehículos que ya cuenten con SOAT en una gestión anterior
              </p>
              <Input
                id="placa"
                name="placa"
                type="text"
                value={formData.placa}
                onChange={handleChange}
                className="mt-1 border-primary/30 focus:border-primary"
                placeholder="Ingrese la placa del vehículo"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Registrarme y Obtener Descuento
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              * Campos obligatorios
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;