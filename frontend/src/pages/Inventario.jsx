import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TabelaDivergencias from '../components/TabelaDivergencias';

export default function Inventario() {
  const [dados, setDados] = useState([]);
  const [metricas, setMetricas] = useState({ IRA: 0, ILA: 0 });

  useEffect(() => {
    axios.get('http://localhost:3000/api/inventario/1/divergencias').then(res => setDados(res.data));
    axios.get('http://localhost:3000/api/inventario/1/metricas').then(res => setMetricas(res.data));
  }, []);

  const exportar = () => {
    window.open('http://localhost:3000/api/inventario/1/exportar');
  };

  return (
    <div>
      <div className="mb-4">
        <p><strong>IRA:</strong> {(metricas.IRA * 100).toFixed(2)}%</p>
        <p><strong>ILA:</strong> {(metricas.ILA * 100).toFixed(2)}%</p>
      </div>
      <button onClick={exportar} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar Excel</button>
      <TabelaDivergencias dados={dados} />
    </div>
  );
}
