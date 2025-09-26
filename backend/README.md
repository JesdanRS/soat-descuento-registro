# Backend SOAT Descuento Registro

Backend en Node.js para el sistema de registro de descuentos SOAT.

## Características

- API REST con Express.js
- Guardado de datos en archivo .txt
- CORS habilitado para frontend
- Validación de campos obligatorios
- Endpoints para consultar registros

## Instalación

```bash
cd backend
npm install
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Endpoints

### POST /api/register
Registra un nuevo usuario con descuento.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "placa": "ABC-123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registro guardado exitosamente",
  "data": {
    "email": "usuario@ejemplo.com",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### GET /api/registros
Obtiene todos los registros guardados.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "data": "01/01/2024 12:00:00 | Email: usuario@ejemplo.com | Contraseña: contraseña123 | Placa: ABC-123"
    }
  ],
  "total": 1
}
```

### GET /api/health
Verifica el estado del servidor.

## Archivos de Datos

Los registros se guardan en `data/registros.txt` con el formato:
```
01/01/2024 12:00:00 | Email: usuario@ejemplo.com | Contraseña: contraseña123 | Placa: ABC-123
```

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 3001)

## Despliegue en AWS EC2

1. Instalar Node.js en la instancia EC2
2. Clonar el repositorio
3. Instalar dependencias: `npm install`
4. Ejecutar: `npm start`
5. Configurar nginx como proxy reverso (opcional)
6. Configurar firewall para permitir el puerto 3001
