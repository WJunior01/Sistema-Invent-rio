const express = require('express');
const cors = require('cors');
const app = express();
const inventarioRoutes = require('./routes/inventario');

app.use(cors());
app.use(express.json());
app.use('/api/inventario', inventarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
