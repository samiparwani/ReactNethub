import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Card, CardBody, Spinner, Alert } from 'reactstrap';
import axios from 'axios';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://your-laravel-api.com/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data.data || response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`http://your-laravel-api.com/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchProducts(); // Refresh the list
            } catch (err) {
                setError('Failed to delete product');
            }
        }
    };

    if (loading) {
        return (
            <div className="page-content">
                <Container fluid>
                    <div className="text-center mt-5">
                        <Spinner color="primary" />
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="card-title mb-0">Products</h4>
                                        <Link to="/products/create">
                                            <Button color="primary">Add New Product</Button>
                                        </Link>
                                    </div>
                                    
                                    {error && <Alert color="danger">{error}</Alert>}
                                    
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.category}</td>
                                                    <td>
                                                        <Link to={`/products/edit/${product.id}`}>
                                                            <Button color="warning" size="sm">Edit</Button>
                                                        </Link>
                                                        {' '}
                                                        <Link to={`/products/view/${product.id}`}>
                                                            <Button color="info" size="sm">View</Button>
                                                        </Link>
                                                        {' '}
                                                        <Button 
                                                            color="danger" 
                                                            size="sm"
                                                            onClick={() => handleDelete(product.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProductsList;