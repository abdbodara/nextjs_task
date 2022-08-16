export const saveCookie = async (props) => {
    return fetch("/api/save_cookies", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
    });
}
