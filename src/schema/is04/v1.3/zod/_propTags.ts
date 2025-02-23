import { z } from "zod"

export const tags = z
.record(z.array(z.string()))
.superRefine((value, ctx) => {
    for (const key in value) {
        if (key.match(new RegExp(''))) {
            const result = z.array(z.string()).safeParse(value[key])
            if (!result.success) {
                ctx.addIssue({
                    path: [...ctx.path, key],
                    code: 'custom',
                    message: `Invalid input: Key matching regex /${key}/ must match schema`,
                    params: {
                        issues: result.error.issues,
                    },
                })
            }
        }
    }
})