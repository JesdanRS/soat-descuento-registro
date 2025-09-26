#!/bin/bash

# Script para construir el frontend para producción
echo "🏗️ Construyendo frontend para producción..."

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Construir para producción
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ -d "dist" ]; then
    echo "✅ Frontend construido exitosamente en la carpeta 'dist'"
    echo "📁 Archivos listos para despliegue:"
    ls -la dist/
else
    echo "❌ Error: No se pudo construir el frontend"
    exit 1
fi

echo "🚀 Frontend listo para despliegue en AWS EC2"
