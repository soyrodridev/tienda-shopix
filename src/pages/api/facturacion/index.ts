import { emailRegex, soloNumero } from "@/utils/regex"
import { Facturacion, PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
type Errormsg = {
    msg: string
}

type facturacion = {
    nombre: string;
    apellido: string;
    calle: string;
    altura: number;
    cpostal: number;
    provincia: string;
    localidad: string;
    dni: number;
    email: string;
    telefono: number;
}
export default async function facturacionDate(req: NextApiRequest, res: NextApiResponse <Errormsg>){
    const prisma = new PrismaClient()
  const facturacion: Facturacion = req.body;

  if (Object.values(facturacion).includes("undefined"))
    return res.status(400).json({ msg: "Error! Not enough data" });

    if(!facturacion.email.match(emailRegex)) 
    return new Response("Email Invalido", {status: 400})
    if(!facturacion.altura.toString().match(soloNumero)) 
    return res.status(400).json({ msg: "Ingresa una altura valida" });
    if(!facturacion.cpostal.toString().match(soloNumero)) 
    return new Response("Por favor ingresa solo numeros", {status: 400})
    if(!facturacion.dni.toString().match(soloNumero)) 
    return new Response("Por favor ingresa solo numeros", {status: 400})
    if(!facturacion.telefono.toString().match(soloNumero)) 
    return new Response("Por favor ingresa un numero de telefono valido", {status: 400})


    const facturaAGuardar = { ...facturacion, telefono: BigInt(facturacion.telefono) }

    const facturaSubida = await prisma.facturacion.create({data: facturaAGuardar});

    if (!facturaSubida)
    return res.status(500).json({ msg: "Error de parte del servidor"})
} 