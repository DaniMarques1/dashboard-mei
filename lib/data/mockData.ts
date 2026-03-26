import type { Transacao } from "../types";

export const MEI_LIMIT_ANUAL = 81000;
export const DAS_VALOR = 77.1;

/** Dados iniciais de transações para popular o mock */
export const MOCK_TRANSACOES: Transacao[] = [
  // Entradas - 2023
  { id: "txn-001", tipo: "entrada", data: "2023-01-15", valor: 2500, categoria: "consultoria", descricao: "Cloud Consulting", status: "pago", contraparte: "TechNova Solutions", mesAno: "2023-01" },
  { id: "txn-002", tipo: "entrada", data: "2023-02-20", valor: 3100, categoria: "consultoria", descricao: "Arquitetura AWS", status: "pago", contraparte: "Digital Corp", mesAno: "2023-02" },
  { id: "txn-003", tipo: "entrada", data: "2023-03-10", valor: 4200, categoria: "consultoria", descricao: "Migração Cloud", status: "pago", contraparte: "Startup XYZ", mesAno: "2023-03" },
  { id: "txn-004", tipo: "entrada", data: "2023-04-05", valor: 2800, categoria: "produtos_digitais", descricao: "Template E-commerce", status: "pago", mesAno: "2023-04" },
  { id: "txn-005", tipo: "entrada", data: "2023-04-18", valor: 2000, categoria: "consultoria", descricao: "Consultoria Dev", status: "pago", contraparte: "Global Logistics", mesAno: "2023-04" },
  { id: "txn-006", tipo: "entrada", data: "2023-05-12", valor: 5100, categoria: "consultoria", descricao: "Web Development", status: "pago", contraparte: "Creative Agency", mesAno: "2023-05" },
  { id: "txn-007", tipo: "entrada", data: "2023-06-08", valor: 3500, categoria: "workshops", descricao: "Workshop Next.js", status: "pago", mesAno: "2023-06" },
  { id: "txn-008", tipo: "entrada", data: "2023-06-22", valor: 2400, categoria: "consultoria", descricao: "App Maintenance", status: "pago", contraparte: "Global Logistics", mesAno: "2023-06" },
  { id: "txn-009", tipo: "entrada", data: "2023-07-14", valor: 5300, categoria: "consultoria", descricao: "Integração APIs", status: "pago", mesAno: "2023-07" },
  { id: "txn-010", tipo: "entrada", data: "2023-08-09", valor: 6500, categoria: "consultoria", descricao: "Sistema ERP", status: "pago", mesAno: "2023-08" },
  { id: "txn-011", tipo: "entrada", data: "2023-09-11", valor: 7200, categoria: "consultoria", descricao: "Cloud Consulting", status: "pago", contraparte: "TechNova Solutions", mesAno: "2023-09" },
  { id: "txn-012", tipo: "entrada", data: "2023-10-12", valor: 2400, categoria: "consultoria", descricao: "Cloud Consulting", status: "pago", contraparte: "TechNova Solutions", mesAno: "2023-10" },
  { id: "txn-013", tipo: "entrada", data: "2023-10-10", valor: 3150, categoria: "consultoria", descricao: "Web Development", status: "pendente", contraparte: "Creative Agency", mesAno: "2023-10" },
  { id: "txn-014", tipo: "entrada", data: "2023-10-08", valor: 1200, categoria: "consultoria", descricao: "App Maintenance", status: "pago", contraparte: "Global Logistics", mesAno: "2023-10" },
  { id: "txn-015", tipo: "entrada", data: "2023-10-20", valor: 383, categoria: "produtos_digitais", descricao: "Template", status: "pago", mesAno: "2023-10" },
  // Saídas - 2023
  { id: "exp-001", tipo: "saida", data: "2023-01-05", valor: 2100, categoria: "materiais", descricao: "Material de escritório", status: "pago", mesAno: "2023-01" },
  { id: "exp-002", tipo: "saida", data: "2023-01-20", valor: 77.1, categoria: "outros", descricao: "DAS Jan", status: "pago", mesAno: "2023-01" },
  { id: "exp-003", tipo: "saida", data: "2023-02-10", valor: 1850, categoria: "servicos", descricao: "Consultoria contábil", status: "pago", mesAno: "2023-02" },
  { id: "exp-004", tipo: "saida", data: "2023-02-20", valor: 77.1, categoria: "outros", descricao: "DAS Fev", status: "pago", mesAno: "2023-02" },
  { id: "exp-005", tipo: "saida", data: "2023-03-15", valor: 450, categoria: "software", descricao: "Licenças", status: "pago", mesAno: "2023-03" },
  { id: "exp-006", tipo: "saida", data: "2023-03-20", valor: 77.1, categoria: "outros", descricao: "DAS Mar", status: "pago", mesAno: "2023-03" },
  { id: "exp-007", tipo: "saida", data: "2023-04-08", valor: 1980, categoria: "materiais", descricao: "Equipamentos", status: "pago", mesAno: "2023-04" },
  { id: "exp-008", tipo: "saida", data: "2023-04-20", valor: 77.1, categoria: "outros", descricao: "DAS Abr", status: "pago", mesAno: "2023-04" },
  { id: "exp-009", tipo: "saida", data: "2023-05-12", valor: 2200, categoria: "servicos", descricao: "Design", status: "pago", mesAno: "2023-05" },
  { id: "exp-010", tipo: "saida", data: "2023-05-20", valor: 77.1, categoria: "outros", descricao: "DAS Mai", status: "pago", mesAno: "2023-05" },
  { id: "exp-011", tipo: "saida", data: "2023-06-18", valor: 2650, categoria: "materiais", descricao: "Material", status: "pago", mesAno: "2023-06" },
  { id: "exp-012", tipo: "saida", data: "2023-06-20", valor: 77.1, categoria: "outros", descricao: "DAS Jun", status: "pago", mesAno: "2023-06" },
  { id: "exp-013", tipo: "saida", data: "2023-07-10", valor: 2100, categoria: "software", descricao: "Ferramentas", status: "pago", mesAno: "2023-07" },
  { id: "exp-014", tipo: "saida", data: "2023-07-20", valor: 77.1, categoria: "outros", descricao: "DAS Jul", status: "pago", mesAno: "2023-07" },
  { id: "exp-015", tipo: "saida", data: "2023-08-14", valor: 2350, categoria: "servicos", descricao: "Marketing", status: "pago", mesAno: "2023-08" },
  { id: "exp-016", tipo: "saida", data: "2023-08-20", valor: 77.1, categoria: "outros", descricao: "DAS Ago", status: "pago", mesAno: "2023-08" },
  { id: "exp-017", tipo: "saida", data: "2023-09-05", valor: 2480, categoria: "materiais", descricao: "Material", status: "pago", mesAno: "2023-09" },
  { id: "exp-018", tipo: "saida", data: "2023-09-20", valor: 77.1, categoria: "outros", descricao: "DAS Set", status: "pago", mesAno: "2023-09" },
  { id: "exp-019", tipo: "saida", data: "2023-10-15", valor: 450, categoria: "software", descricao: "Licenças", status: "pago", mesAno: "2023-10" },
  { id: "exp-020", tipo: "saida", data: "2023-10-12", valor: 230, categoria: "materiais", descricao: "Material escritório", status: "pago", mesAno: "2023-10" },
  { id: "exp-021", tipo: "saida", data: "2023-10-10", valor: 580, categoria: "servicos", descricao: "Consultoria contábil", status: "pendente", mesAno: "2023-10" },
  { id: "exp-022", tipo: "saida", data: "2023-10-20", valor: 77.1, categoria: "outros", descricao: "DAS Out", status: "pago", mesAno: "2023-10" },
];
