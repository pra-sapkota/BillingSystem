export const catfetch = async () => {

    const responseRaw = await fetch('http://127.0.0.1:8000/api/category/all',
        {
            method: "GET",
            headers: {
                "auth_token": localStorage.getItem("token"),
            },
        })
    const response = await responseRaw.json();
    console.log(response)
    return response

} 