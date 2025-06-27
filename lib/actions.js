'use server'
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import {redirect} from "next/navigation";
import {transactionSchema} from "@/lib/validation";

/*
* transaction functions
*/

// creating a transaction
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

// fetching all transactions
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

// transaction updating for page refresh
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

// fetching transaction by id for editing
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

// deleting a transaction
export async function deleteTransaction(id) {
    const supabase = await createClient()
    const {error} = await supabase.from('transactions')
        .delete()
        .eq('id', id)
    if (error) throw new Error(`Could not delete the transaction ${id}: ${error.message}`)
    revalidatePath('/dashboard')
}

//----------------------------------------------------------------------------------------------------------------------

/**
 * User Metadata
 **/

// Ensures user_metadata exists with all your desired keys
export async function ensureUserMetadata(supabase) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return;

    const defaultMetadata = {
        fullName: "",
        currency: "",
        dateFormat: "",
        timeFormat: "",
        theme: "",
        defaultView: "",
        avatar: "",
        // add any others you want as defaults!
    };

    const current = user.user_metadata || {};
    // Only update if a key is missing
    const needsUpdate = Object.keys(defaultMetadata).some(key => !(key in current));
    if (!needsUpdate) return;

    await supabase.auth.updateUser({
        data: { ...defaultMetadata, ...current },
    });
}

//----------------------------------------------------------------------------------------------------------------------

/*
* Login/out
*/

// logging in to the app
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

// logging out of the app
export async function logout() {
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if (error) {
        throw new Error('Failed to logout')
    }
    redirect('/login')
}

//----------------------------------------------------------------------------------------------------------------------

/*
* Avatars Bucket functions
*/

// upsert the avatar
export async function uploadAvatar(prevState, formData) {
    const supabase = await createClient()
    const file = formData.get('file')
    const fileExtension = file.name.split('.').pop().toLowerCase();

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) {
        return { error: true, message: 'User not authenticated' }
    }

    const fileName = `${userData.user.id}.${fileExtension}`;
    const { error: avatarError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
            contentType: file.type,
            upsert: true,
    })
    if (avatarError) {
        return { error: true, message: `Failed to upload the avatar: ${avatarError.message}` }
    }

    const { error: dataUpdateError } = await supabase.auth
        .updateUser({
            data: {
                avatar: fileName
            }
        })
    if (dataUpdateError) {
        return {
            error: true,
            message: `Error associating the avatar with the user: ${dataUpdateError.message}`
        }
    }
    return {
        message: 'Updated the user avatar'
    }
}

// delete the avatar
export async function deleteAvatar() {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user?.id) {
        return { error: true, message: 'User not authenticated' }
    }

    // Get the file name from the user's profile metadata
    const fileName = userData.user.user_metadata?.avatar;

    if (!fileName) {
        return { error: true, message: 'No avatar file to delete' }
    }

    // Delete the file from the bucket
    const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([fileName]);

    if (deleteError) {
        return { error: true, message: `Failed to delete the avatar: ${deleteError.message}` }
    }

    // Remove the avatar metadata from the user
    const { error: dataUpdateError } = await supabase.auth
        .updateUser({
            data: {
                avatar: null
            }
        });

    if (dataUpdateError) {
        return {
            error: true,
            message: `Error removing the avatar metadata: ${dataUpdateError.message}`
        }
    }

    return {
        message: 'Avatar deleted successfully'
    }
}

//----------------------------------------------------------------------------------------------------------------------

/*
* Setting functions
*/

// default view of the history
export async function updateDefaultView(prevState, formData) {
    const supabase = await createClient();
    const updates = {};
    if (formData.get('defaultView')) updates.defaultView = formData.get('defaultView');

    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) return { error: true, message: error.message };
    return { message: 'Default view updated.' };
}

// Profile (Name, Email, Password)
export async function updateProfile(prevState, formData) {
    const supabase = await createClient();
    const updates = {};

    if (formData.get('fullName')) {
        updates.data = { ...updates.data, fullName: formData.get('fullName') };
        updates.display_name = formData.get('fullName');
    }
    if (formData.get('email')) updates.email = formData.get('email');
    if (formData.get('password')) updates.password = formData.get('password');

    const { error } = await supabase.auth.updateUser(updates);

    if (error) return { error: true, message: error.message };
    return { message: "Profile updated." };
}

// Preferences (Theme, Currency, Currency Symbol)
export async function updatePreferences(prevState, formData) {
    const supabase = await createClient();
    const updates = {};

    if (formData.get('theme')) updates.theme = formData.get('theme');
    if (formData.get('currency')) updates.currency = formData.get('currency');
    if (formData.get('currencySymbol')) updates.currencySymbol = formData.get('currencySymbol');

    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) return { error: true, message: error.message };
    return { message: "Preferences updated." };
}

// Date/Time Settings
export async function updateDateTimeSettings(prevState, formData) {
    const supabase = await createClient();
    const updates = {};

    if (formData.get('dateFormat')) updates.dateFormat = formData.get('dateFormat');
    if (formData.get('timeFormat')) updates.timeFormat = formData.get('timeFormat');
    // Convert checkbox value for time24h, if present
    if (formData.get('time24h') !== null) {
        updates.time24h = formData.get('time24h') === "on";
    }

    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) return { error: true, message: error.message };
    return { message: "Date/time settings updated." };
}

// Calendar Display
export async function updateCalendarSettings(prevState, formData) {
    const supabase = await createClient();
    const newData = {};
    for (let key of [
        "showWeekNumbers", "showWeekends", "showToday", "showWeek",
        "showMonth", "showYear", "showQuarter", "showDecade", "showCentury"
    ]) {
        const value = formData.get(key);
        // For checkboxes, formData returns "on" if checked, otherwise it's absent.
        if (value !== undefined) newData[key] = value === "on";
    }
    const { error } = await supabase.auth.updateUser({ data: newData });
    if (error) return { error: true, message: error.message };
    return { message: "Calendar display updated." };
}
