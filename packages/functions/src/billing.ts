import Stripe from "stripe";
import { Config } from "sst/node/config";
import handler from "@notes/core/handler";
import { calculateCost } from '../../core/src/cost'       //Determina cuanto cobrar

export const main = handler(async (event) => {

    //storage: Cantidad de billete que el cliente desea almacenar
    //source: token de Stripe de la tarjeta que vamos a cobrar
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key
  const stripe = new Stripe(Config.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

  await stripe.charges.create({         //Metodo para cobrar al usuario y responder a la solicitud si todo se realizo correctamente
    source,
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({ status: true });
});