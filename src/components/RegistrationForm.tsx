import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ci: "",
    placa: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nombre.trim() || !formData.ci.trim()) {
      toast({
        title: "Error",
        description: "Por favor complete los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Success message
    toast({
      title: "¡Registro exitoso!",
      description: "Te contactaremos pronto con tu descuento del 3%",
    });

    // Reset form
    setFormData({
      nombre: "",
      ci: "",
      placa: ""
    });
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
            ¡Registrate para obtener el 3% de descuento!
          </CardTitle>
          <p className="text-muted-foreground">
            En tu próxima compra del SOAT
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
                Nombre *
              </Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 border-primary/30 focus:border-primary"
                placeholder="Ingrese su nombre completo"
              />
            </div>

            <div>
              <Label htmlFor="ci" className="text-sm font-medium text-foreground">
                CI *
              </Label>
              <Input
                id="ci"
                name="ci"
                type="text"
                required
                value={formData.ci}
                onChange={handleChange}
                className="mt-1 border-primary/30 focus:border-primary"
                placeholder="Ingrese su Cédula de Identidad"
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