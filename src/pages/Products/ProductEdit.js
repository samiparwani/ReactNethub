import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import axios from 'axios';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://your-laravel-api.com/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData(response.data);
        } catch (err) {
            setError('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

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
            await axios.put(`http://your-laravel-api.com/api/products/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product');
        } finally {
            setLoading(false);
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
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Edit Product</h4>
                                
                                {error && <Alert color="danger">{error}</Alert>}
                                
                                <Form onSubmit={handleSubmit}>
                                    {/* Similar form fields as Create.js */}
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
                                    
                                    {/* Add other fields similarly */}
                                    
                                    <div className="mt-4">
                                        <Button type="submit" color="primary" disabled={loading}>
                                            {loading ? 'Updating...' : 'Update Product'}
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

export default ProductEdit;