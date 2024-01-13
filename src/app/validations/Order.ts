import { z } from "zod";

export const Element = z.object({
    model_id: z.string().min(1),
    element_size: z.string().min(1),
    element_gender: z.string().min(1),
    element_quantity: z.string().min(1),
    element_description: z.string().optional(),
});

export const Order = z.object({
    order_client: z.string().min(1),
    order_stages: z.string().min(1),
    order_description: z.string().optional(),
    order_elements:Element.array().min(1),
});