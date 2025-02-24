import { z } from "zod"

export const tags = z
    .record(z.array(z.string().min(1)))
