import express from 'express';
import cors from 'cors'; // Agrega esto si necesitas CORS en desarrollo
const app = express();

app.use(express.json());
app.use(cors()); // Agrega esto si necesitas CORS en desarrollo

app.post('/users', (req, res) => {
  const userCredentials = req.body;
  // Lógica para manejar la solicitud de inicio de sesión
  res.json({ message: 'Usuario autenticado', user: userCredentials });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
