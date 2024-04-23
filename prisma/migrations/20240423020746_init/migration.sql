-- AlterTable
ALTER TABLE "ingressos" ALTER COLUMN "quantidade" SET DATA TYPE TEXT,
ALTER COLUMN "preco_unitario" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "lotes" ALTER COLUMN "quantidade" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "vendas" ALTER COLUMN "quantidade" SET DATA TYPE TEXT,
ALTER COLUMN "valor_total" SET DATA TYPE TEXT,
ALTER COLUMN "valor" SET DATA TYPE TEXT;
