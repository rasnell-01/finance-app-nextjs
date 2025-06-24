'use server'
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import {redirect} from "next/navigation";

export async function createTransaction(formData) {
    const validated = transactionSchema.safeParse(formData)
    if (!validated.success) {
        throw new Error('Invalid data')
    }

    const supabase = await createClient();
    const { error } = await supabase.from('transactions')
        .insert([validated.data])

    if (error) {
        throw new Error(`Failed creating the transaction: ${error.message}`)
    }

    revalidatePath('/dashboard')
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
    const supabase = await createClient()
    let { data, error } = await supabase
        .rpc('fetch_transactions', {
            limit_arg: limit,
            offset_arg: offset,
            range_arg: range
        })
    if (error) throw new Error("We can't fetch transactions")
    return data
}

export async function updateTransaction(id, formData) {
    const validated = transactionSchema.safeParse(formData)
    if (!validated.success) {
        throw new Error('Invalid data')
    }
    const supabase = await createClient()
    const {error} = await supabase.from('transactions')
        .update(validated.data)
        .eq('id', id)
    if (error) throw new Error(`Could not update the transaction ${id}: ${error.message}`)
    revalidatePath('/dashboard')
}

export async function deleteTransaction(id) {
    const supabase = await createClient()
    const {error} = await supabase.from('transactions')
        .delete()
        .eq('id', id)
    if (error) throw new Error(`Could not delete the transaction ${id}: ${error.message}`)
    revalidatePath('/dashboard')
}

export async function login(prevState, formData) {
    const supabase = await createClient()
    const email = formData.get('email')
    const {error} = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldSendEmail: true,
        }
    })
    if (error) {
        return {
            error: true,
            message: error.message
        }
    }
    return {
        message: `Email sent to ${email}`
    }
}

export async function logout() {
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if (error) {
        throw new Error('Failed to logout')
    }
    redirect('/login')
}

export async function fetchTransactionById(id) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw new Error('Transaction not found');
    return data;
}
