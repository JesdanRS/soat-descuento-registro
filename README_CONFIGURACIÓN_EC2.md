# Configuración completa en AWS EC2 (Ubuntu)

Pasos para desplegar frontend (Vite/React) y backend (Node/Express) con Nginx y PM2.

## Requisitos
- Security Group: abrir 80/TCP (y 443 si usarás HTTPS)
- Salida a internet permitida

## Construir frontend
```
cd ~/soat-descuento-registro
npm ci || npm install
npm run build
```

## Backend con PM2 (puerto 3001)
```
cd ~/soat-descuento-registro/backend
npm install
PORT=3001 NODE_ENV=production pm2 start server.js --name soat-backend --time
pm2 save
pm2 startup
# ejecuta el comando que imprime pm2
curl -s http://127.0.0.1:3001/api/health
```

## Nginx
```
sudo apt update && sudo apt install -y nginx

sudo tee /etc/nginx/sites-available/soat.conf >/dev/null << 'EOF'
server {
    listen 80 default_server;
    server_name _;
    root /home/ubuntu/soat-descuento-registro/dist;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/soat.conf /etc/nginx/sites-enabled/soat.conf
sudo nginx -t && sudo systemctl restart nginx
```

## Permisos para servir dist/
```
sudo chmod o+rx /home/ubuntu
sudo chmod o+rx /home/ubuntu/soat-descuento-registro
sudo chmod -R o+rx /home/ubuntu/soat-descuento-registro/dist
sudo find /home/ubuntu/soat-descuento-registro/dist -type f -exec chmod o+r {} \;
```

## Verificación
```
curl -I http://127.0.0.1
curl -s http://127.0.0.1/api/health
```

## Logs útiles
```
sudo tail -n 100 /var/log/nginx/error.log
sudo tail -n 100 /var/log/nginx/access.log
pm2 list
pm2 logs soat-backend
sudo ss -ltnp | grep ':80\|:3001'
```

## Problemas comunes
- 502: backend caído o proxy mal apuntado
- 403/500 al servir dist: faltan permisos en el path (usar chmod o+rx)
- TIMEOUT desde fuera: revisar Security Group o NACL
- conflicting server name "_": más de un server en 80; deja un solo default_server

## Despliegues futuros
```
cd ~/soat-descuento-registro
npm ci || npm install
npm run build
pm2 restart soat-backend
sudo systemctl restart nginx
```
