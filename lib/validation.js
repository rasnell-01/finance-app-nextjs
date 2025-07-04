import * as z from "zod/v4";
import {allCategories, types} from "@/lib/consts";

// export const viewSchema = z.object({
//     defaultView: z.enum(dateRangeValues),
// });
//
// export const profileSchema = z.object({
//     fullName: z.string().min(2, {
//         message: "Name must be at least 2 characters"
//     }),
//     email: z.email(),
//     password: z.string().min(6, {
//         message: "Password must be at least 6 characters"
//     }),
// });
//
// export const preferencesSchema = z.object({
//     theme: z.enum(["light", "dark", "system"]),
//     currency: z.string().refine(val => {
//         return val.length === 3
//     }, {
//         message: "Currency must be 3 characters"
//     }),
//     currencySymbol: z.string().min(1,  {
//        message: "Currency symbol must be at least 1 character"
//     }),
// });
//
// export const dateTimeSchema = z.object({
//     defaultDate: z.enum(Object.keys(FORMAT_MAP)),
//     defaultTime: z.enum(["24", "12"]),
// })

export const transactionSchema = z.object({
    type: z.enum(types),
    category: z.preprocess(val => val?.length ? val : undefined, z.string().optional()),
    amount: z.coerce.number().min(1, {
        message: "Amount must be at least 1"
    }),
    description: z.string().optional(),
    created_at: z.string().refine(
        val => !isNaN(Date.parse(val)),
        {
            message: "Date needs to contain a valid date"
        }
    )
}).refine((data) => {
    if (data.type === "Expense") {
        return data.category !== undefined && allCategories.includes(data.category)
    }
    return true;
}, {
    path: ["category"],
    message: "Category is required for Expense"
});
