'use client'
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar, deleteAvatar } from "@/lib/actions";
import { useState } from "react";
import AlertSuccess from "@/components/alert-success";
import AlertError from "@/components/alert-error";

const initialState = {
    message: '',
    error: false
}

export default function Page() {
    const [state, setState] = useState(initialState)

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        setState(initialState); // reset state before upload
        const result = await uploadAvatar(undefined, formData);
        setState({
            message: result?.message || (result?.error ? 'Upload failed' : 'Upload succeeded!'),
            error: !!result?.error
        });
    }

    async function handleDelete() {
        setState(initialState);
        const result = await deleteAvatar();
        setState({
            message: result?.message || (result?.error ? 'Delete failed' : 'Delete succeeded!'),
            error: !!result?.error
        });
    }

    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">
                Avatar
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {state?.error && <AlertError>{state?.message}</AlertError>}
                {!state?.error && state?.message.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}
                <Input type="file" name="file" id="file" />
                <SubmitButton>Upload Avatar</SubmitButton>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="mt-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-all"
                >
                  Delete Avatar
                </button>
            </form>
        </>
    );
}
