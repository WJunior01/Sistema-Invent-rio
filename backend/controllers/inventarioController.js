const db = require('../models/db');
const excelExporter = require('../utils/excelExporter');

exports.salvarContagem = async (req, res) => {
  const { id } = req.params;
  const contagens = req.body;

  for (let c of contagens) {
    await db.query(`INSERT INTO contagens (inventario_id, produto_id, contagem1, contagem2)
                    VALUES ($1, $2, $3, $4)`, [id, c.produto_id, c.contagem1, c.contagem2]);
  }
  res.sendStatus(201);
};

exports.obterDivergencias = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(\`SELECT p.sku, p.descricao, p.localizacao, p.quantidade_esperada,
    c.contagem1, c.contagem2 FROM contagens c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.inventario_id = $1\`, [id]);

  const divergentes = rows.filter(r => r.quantidade_esperada !== r.contagem1);
  res.json(divergentes);
};

exports.calcularMetricas = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(\`SELECT p.quantidade_esperada, c.contagem1, p.localizacao
    FROM contagens c JOIN produtos p ON c.produto_id = p.id
    WHERE c.inventario_id = $1\`, [id]);

  const total = rows.length;
  const ira = rows.filter(r => r.quantidade_esperada === r.contagem1).length / total;
  const ila = rows.filter(r => r.localizacao IS NOT NULL).length / total;

  res.json({ IRA: ira, ILA: ila });
};

exports.exportarExcel = async (req, res) => {
  const { id } = req.params;
  const data = await db.query(\`SELECT p.sku, p.descricao, p.localizacao, p.quantidade_esperada,
    c.contagem1, c.contagem2 FROM contagens c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.inventario_id = $1\`, [id]);

  const filePath = await excelExporter.gerarExcel(data.rows, id);
  res.download(filePath);
};
