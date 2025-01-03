import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Card
            style={{
                width: "100%",
                backdropFilter: "blur(5px)",
                marginBottom: "2rem",
                display: 'flex !important',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Card.Img
                variant="top"
                src={product.images[0].src}
                style={{
                    objectFit: 'cover',
                    height: '400px',
                    width: '100%'
                }}
            />
            <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Prix: {product.variants[0].price}€</Card.Text>
                <Button variant="primary">
                    <Link style={{ color: "black" }} to={`/${product.handle}`}>Voir Plus</Link>
                </Button>
            </Card.Body>
        </Card>
    );
}

function GetProd() {
    const [products, setProducts] = useState([]);

    async function get_all_produit() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        try {
            const response = await fetch("https://moodz.co/products.json", requestOptions);
            const result = await response.json();
            return result.products;
        } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            const productsData = await get_all_produit();
            setProducts(productsData);
        }
        fetchProducts();
    }, []);

    return (
        <Container
            fluid
            className="px-4"
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1 className="mb-4 text-center">Produits Moodz</h1>
            {products.length > 0 ? (
                <Row
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center'
                    }}
                >
                    {products.map((product) => (
                        <Col
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            style={{
                                flex: '0 0 calc(33.333% - 20px)',
                                maxWidth: 'calc(33.333% - 20px)',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">Chargement des produits...</p>
            )}
        </Container>
    )
}

export default GetProd

