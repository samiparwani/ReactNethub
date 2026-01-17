import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from '../../api/axiosConfig';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setError('');
        
        try {
            const response = await axios.post('/login', formData);
            
            // Store token and user data
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper pt-5">
            <div className="auth-one-bg-position auth-one-bg">
                {/* Your background styles */}
            </div>
            
            <div className="auth-page-content">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">Sign in to continue to Velzon.</p>
                                    </div>
                                    
                                    {error && <Alert color="danger">{error}</Alert>}
                                    
                                    <div className="p-2 mt-4">
                                        <Form onSubmit={handleSubmit}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>

                                            <FormGroup className="mb-3">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>

                                            <div className="mt-4">
                                                <Button 
                                                    color="success" 
                                                    className="btn-block w-100" 
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Signing In...' : 'Sign In'}
                                                </Button>
                                            </div>
                                        </Form>
                                        
                                        <div className="mt-4 text-center">
                                            <p className="mb-0">
                                                Don't have an account ?{' '}
                                                <Link to="/auth-register" className="fw-semibold text-primary text-decoration-underline">
                                                    Signup
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Login;