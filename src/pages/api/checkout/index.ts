// Importaciones de MercadoPago y tipos necesarios
import { MercadoPagoConfig, Preference } from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";

// Importaciones de Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Controlador para manejar las solicitudes de pago con MercadoPago
export default function paymentMercadoPagoHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ global: string | undefined }>
) {
  // Crear una instancia de MercadoPagoConfig con el token de acceso proporcionado
  const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });

  // Extraer datos del cuerpo de la solicitud (usuario y turno)
  //@ts-ignore
  const { facturacion, products } = req.body;

  // Configuración de las opciones de la preferencia de pago
  const preferenceOptions: CreatePreferencePayload | any = {
    binary_mode: true,
    items: [
      {
        title: `${products.title} - Nombre de la marca`,
        description: `${products.description}`,
        picture_url: `${products.image}`,
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: products.price as number,
      },
    ],
    payer: {
      name: facturacion.nombre as string,
      surname: facturacion.nombre.split(" ")[1] ?? ("TGB" as string),
      email: facturacion.email as string,
    } as PreferencePayer,
    back_urls: {
      success: "https://success.com",
      failure: "https://failure.com",
      pending: "https://pending.com",
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  // Crear una instancia de la clase Preference de MercadoPago
  const preference = new Preference(mercadopago);

  // Crear la preferencia de pago con las opciones proporcionadas
  preference
    .create(preferenceOptions)
    .then(function (response) {
      // Enviar la respuesta con el ID de la preferencia generada
      res.status(200).json({ global: response.id });
    })
    .catch((error) => {
      // Enviar una respuesta de error en caso de problemas
      res.status(500).json({ global: error });
    });
}