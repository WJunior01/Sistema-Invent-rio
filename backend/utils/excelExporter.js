const ExcelJS = require('exceljs');
const path = require('path');

exports.gerarExcel = async (dados, inventarioId) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Inventário');

  sheet.columns = [
    { header: 'SKU', key: 'sku' },
    { header: 'Descrição', key: 'descricao' },
    { header: 'Localização', key: 'localizacao' },
    { header: 'Esperado', key: 'quantidade_esperada' },
    { header: 'Contagem 1', key: 'contagem1' },
    { header: 'Contagem 2', key: 'contagem2' },
    { header: 'Divergente?', key: 'divergente' }
  ];

  dados.forEach(item => {
    sheet.addRow({
      ...item,
      divergente: item.quantidade_esperada !== item.contagem1 ? 'SIM' : 'NÃO'
    });
  });

  const filePath = path.join(__dirname, `../../Inventario_${inventarioId}.xlsx`);
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};
