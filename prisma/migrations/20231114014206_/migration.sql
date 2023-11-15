-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('LECTOR', 'ESCRITOR', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "descripcion" TEXT,
    "rol" "Rol" NOT NULL DEFAULT 'LECTOR',
    "edad" INTEGER,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facturacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "altura" INTEGER NOT NULL,
    "cpostal" INTEGER NOT NULL,
    "provincia" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" BIGINT NOT NULL,

    CONSTRAINT "Facturacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
