import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null); // État pour l'image principale
  const id = location.href.split('/').pop();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://moodz.co/products/${id}.js`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setMainImage(`https:${data.images[0]}`); // Initialiser l'image principale avec la première image
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="px-4" style={{ display: 'flex', flexDirection: 'column' }}>
      <Row style={{ display: 'flex' }}>
        <Col md={2} style={{ marginRight: '100px', display: 'grid' }} className='carossel'>
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={`https:${image}`}
              alt={image.split('/').pop().split('.')[0]}
              style={{ width: '150px', cursor: 'pointer', marginBottom: '10px' }}
              onClick={() => setMainImage(`https:${image}`)} // Mettre à jour l'image principale au clic
            />
          ))}
        </Col>

        {/* Image principale */}
        <Col md={4} style={{ marginRight: '100px' }} className='image_principale'>
          <Image src={mainImage} alt={product.title} fluid />
        </Col>

        {/* Détails du produit */}
        <Col md={4} className='detail_produit'>
          <h1>{product.title}</h1>
          <h2>{product.price / 100} €</h2>
          <p style={{ marginBottom: "15px" }}>Taille:</p>
          <div style={{ display: 'flex' }}>

            {product.variants.map((variant, index) => {
              return (
                <div key={index} style={{ width: 'auto', minWidth: '30px', height: '30px', padding: '5px 5px', marginRight: '15px', border: '1px solid black', display: 'inline-block', textAlign: 'center', backgroundColor: variant.available ? '#ffffff' : '#e0e0e0', color: variant.available ? '#000000' : '#a0a0a0', pointerEvents: variant.available ? 'auto' : 'none', opacity: variant.available ? 1 : 0.6 }}>
                  {variant.available ? (
                    <p style={{ margin: 0 }} alt ="dispo">{variant.public_title}</p>
                  ) : (
                    <p style={{ margin: 0, color: '#a0a0a0' }} alt ="indispo">{variant.public_title}</p>
                  )}
                </div>
              );
            })}

          </div>

          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <div className="mt-4">
            <Button variant="primary" size="lg">Ajouter au panier</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
