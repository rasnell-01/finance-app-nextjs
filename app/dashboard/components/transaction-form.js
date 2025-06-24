'use client'
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import {createTransaction} from "@/lib/actions";
import {transactionSchema} from "@/lib/validation";
import FormError from "@/components/form-error";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function TransactionForm({ defaultValues, onSubmit: onSubmitProp, submitLabel = "Save" }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(transactionSchema),
        defaultValues,
    })
    const router = useRouter()
    const [isSaving, setSaving] = useState(false)
    const [lastError, setLastError] = useState(null)
    const type = watch("type")

    const onSubmit = async (data) => {
        setSaving(true)
        setLastError(null)
        try {
            await (onSubmitProp ? onSubmitProp(data) : createTransaction(data))
            router.push('/dashboard')
        } catch (error) {
            setLastError(error)
        }
        finally {
            setSaving(false)
        }
    }

    return <form className="space-y-4"
                 onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label className="mb-1">Type</Label>
                <Select {...register("type", {
                    onChange: (e) => {
                        if (e.target.value !== 'Expense') {
                            setValue('category', undefined)
                        }
                    }
                })}>
                    {types.map(type => <option key={type}>
                        {type}
                    </option>)}
                </Select>
                <FormError error={errors.type} />
            </div>

            <div>
                <Label className="mb-1">Category</Label>
                <Select {...register("category")} disabled={type !== 'Expense'}>
                    <option value="">Select a category</option>
                    {categories.map(group => (
                        <optgroup key={group.group} label={group.group}>
                            {group.items.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </Select>
                <FormError error={errors.category} />
            </div>

            <div>
                <Label className="mb-1">Date</Label>
                <Input type="date" {...register("created_at")} />
                <FormError error={errors.created_at} />
            </div>

            <div>
                <Label className="mb-1">Amount</Label>
                <Input type="number" {...register("amount")} />
                <FormError error={errors.amount} />
            </div>

            <div className="col-span-1 md:col-span-2">
                <Label className="mb-1">Description</Label>
                <Input {...register("description")} />
                <FormError error={errors.description} />
            </div>
        </div>

        <div className="flex justify-between items-center">
            <div>
                {lastError && <FormError error={lastError} />}
            </div>
            <Button type="submit" variant="ghost" disabled={isSaving}>
                {isSaving ? (submitLabel === "Save" ? "Saving..." : "Updating...") : submitLabel}
            </Button>
        </div>
    </form>
}
