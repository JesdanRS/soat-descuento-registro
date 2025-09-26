#!/bin/bash

# Script de despliegue para AWS EC2
# Ejecutar en la instancia EC2

echo "🚀 Iniciando despliegue del sistema SOAT Descuento..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
sudo yum update -y

# Instalar Node.js
echo "📦 Instalando Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verificar instalación
echo "✅ Verificando Node.js..."
node --version
npm --version

# Instalar PM2 para gestión de procesos
echo "📦 Instalando PM2..."
sudo npm install -g pm2

# Crear directorio de la aplicación
echo "📁 Creando directorio de aplicación..."
sudo mkdir -p /opt/soat-app
sudo chown ec2-user:ec2-user /opt/soat-app

# Copiar archivos (asumiendo que ya están en la instancia)
echo "📋 Copiando archivos de aplicación..."
# cp -r . /opt/soat-app/

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd /opt/soat-app/backend
npm install

# Crear archivo de configuración de PM2
echo "⚙️ Configurando PM2..."
cat > /opt/soat-app/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'soat-backend',
    script: 'backend/server.js',
    cwd: '/opt/soat-app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
EOF

# Configurar firewall
echo "🔥 Configurando firewall..."
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload

# Iniciar aplicación con PM2
echo "🚀 Iniciando aplicación..."
cd /opt/soat-app
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configurar nginx (opcional)
echo "🌐 Configurando nginx..."
sudo yum install -y nginx

# Crear configuración de nginx
sudo tee /etc/nginx/conf.d/soat-app.conf << EOF
server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        root /opt/soat-app/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Iniciar nginx
sudo systemctl start nginx
sudo systemctl enable nginx

echo "✅ Despliegue completado!"
echo "🌐 Aplicación disponible en: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "📊 Estado de la aplicación: pm2 status"
echo "📝 Logs: pm2 logs soat-backend"
echo "🔄 Reiniciar: pm2 restart soat-backend"
