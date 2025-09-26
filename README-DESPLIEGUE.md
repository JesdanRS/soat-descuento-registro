# SOAT Descuento Registro - Guía de Despliegue

Sistema completo para registro de descuentos SOAT con frontend React y backend Node.js.

## 📋 Cambios Realizados

### Frontend
- ✅ Campo "Nombre" cambiado por "Correo Electrónico"
- ✅ Campo "CI" cambiado por "Contraseña"
- ✅ Integración con backend para envío de datos
- ✅ Validación de campos obligatorios

### Backend
- ✅ API REST con Express.js
- ✅ Endpoint POST `/api/register` para guardar registros
- ✅ Endpoint GET `/api/registros` para consultar datos
- ✅ Guardado de datos en archivo `data/registros.txt`
- ✅ CORS configurado para frontend
- ✅ Validación de campos obligatorios

## 🚀 Despliegue en AWS EC2

### 1. Preparar la Instancia EC2

```bash
# Conectar a la instancia EC2
ssh -i tu-key.pem ec2-user@tu-ip-publica

# Actualizar sistema
sudo yum update -y
```

### 2. Instalar Node.js

```bash
# Instalar Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 3. Instalar PM2 (Gestión de Procesos)

```bash
sudo npm install -g pm2
```

### 4. Subir Archivos a EC2

```bash
# Desde tu máquina local, subir archivos
scp -i tu-key.pem -r . ec2-user@tu-ip-publica:/home/ec2-user/soat-app/

# O clonar desde Git si tienes el repositorio
git clone tu-repositorio.git
```

### 5. Configurar Backend

```bash
cd /home/ec2-user/soat-app/backend
npm install
```

### 6. Construir Frontend

```bash
cd /home/ec2-user/soat-app
npm install
npm run build
```

### 7. Configurar PM2

```bash
# Crear archivo de configuración
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'soat-backend',
    script: 'backend/server.js',
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

# Iniciar aplicación
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 8. Configurar Nginx

```bash
# Instalar nginx
sudo yum install -y nginx

# Crear configuración
sudo tee /etc/nginx/conf.d/soat-app.conf << EOF
server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        root /home/ec2-user/soat-app/dist;
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
```

### 9. Configurar Firewall

```bash
# Abrir puertos necesarios
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

## 📊 Monitoreo y Gestión

### Comandos Útiles

```bash
# Ver estado de la aplicación
pm2 status

# Ver logs
pm2 logs soat-backend

# Reiniciar aplicación
pm2 restart soat-backend

# Ver logs de nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Verificar Datos Guardados

```bash
# Ver archivo de registros
cat /home/ec2-user/soat-app/backend/data/registros.txt

# O usar la API
curl http://localhost:3001/api/registros
```

## 🔧 Configuración de Producción

### Variables de Entorno

Crear archivo `.env` en el directorio `backend/`:

```bash
PORT=3001
NODE_ENV=production
```

### Optimizaciones

1. **Configurar SSL** (opcional):
   ```bash
   # Instalar certbot
   sudo yum install -y certbot python3-certbot-nginx
   
   # Obtener certificado SSL
   sudo certbot --nginx -d tu-dominio.com
   ```

2. **Configurar backup automático**:
   ```bash
   # Crear script de backup
   cat > backup.sh << EOF
   #!/bin/bash
   cp /home/ec2-user/soat-app/backend/data/registros.txt /home/ec2-user/backups/registros-\$(date +%Y%m%d).txt
   EOF
   
   chmod +x backup.sh
   
   # Agregar a crontab
   crontab -e
   # Agregar: 0 2 * * * /home/ec2-user/backup.sh
   ```

## 📱 Acceso a la Aplicación

- **Frontend**: `http://tu-ip-publica`
- **API Health**: `http://tu-ip-publica/api/health`
- **Registros**: `http://tu-ip-publica/api/registros`

## 🛠️ Desarrollo Local

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

## 📝 Estructura de Datos

Los registros se guardan en formato:
```
01/01/2024 12:00:00 | Email: usuario@ejemplo.com | Contraseña: contraseña123 | Placa: ABC-123
```

## 🔍 Troubleshooting

### Problemas Comunes

1. **Error de CORS**: Verificar que el backend esté ejecutándose en puerto 3001
2. **Error 404**: Verificar configuración de nginx
3. **Error de permisos**: Verificar que PM2 tenga permisos para escribir en el directorio de datos

### Logs Importantes

```bash
# Logs de la aplicación
pm2 logs soat-backend

# Logs de nginx
sudo tail -f /var/log/nginx/error.log

# Logs del sistema
sudo journalctl -u nginx
```
