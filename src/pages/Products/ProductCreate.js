import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';

const ProductCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://your-laravel-api.com/api/products', formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate('/products'); // Redirect to list page
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Create New Product</h4>
                                
                                {error && <Alert color="danger">{error}</Alert>}
                                
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="name">Product Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </FormGroup>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="price">Price</Label>
                                                <Input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input
                                                    type="text"
                                                    name="category"
                                                    id="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup>
                                        <Label for="quantity">Quantity</Label>
                                        <Input
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    
                                    <div className="mt-4">
                                        <Button type="submit" color="primary" disabled={loading}>
                                            {loading ? 'Creating...' : 'Create Product'}
                                        </Button>
                                        {' '}
                                        <Button type="button" color="secondary" onClick={() => navigate('/products')}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductCreate;