import React from 'react';

export default function TabelaDivergencias({ dados }) {
  return (
    <table className="mt-4 w-full border">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Descrição</th>
          <th>Esperado</th>
          <th>Contagem</th>
          <th>Divergente</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item, idx) => (
          <tr key={idx} className="text-center">
            <td>{item.sku}</td>
            <td>{item.descricao}</td>
            <td>{item.quantidade_esperada}</td>
            <td>{item.contagem1}</td>
            <td>{item.quantidade_esperada !== item.contagem1 ? 'SIM' : 'NÃO'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
