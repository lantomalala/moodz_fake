async function get_all_produit() {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "_shopify_s=b6b13ba4-ba56-49fd-a63a-5d796922e346; _shopify_y=b107a66d-333f-4339-9e9e-22664326178f; cart_currency=EUR; secure_customer_sig=");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch("https://moodz.co/products.json", requestOptions);
    const result = await response.text();
    return result;
}
get_all_produit()