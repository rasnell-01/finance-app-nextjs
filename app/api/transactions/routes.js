import {data} from "autoprefixer";

await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        ...data,
        created_at: `${data.created_at}T00:00:00`
    })
});
