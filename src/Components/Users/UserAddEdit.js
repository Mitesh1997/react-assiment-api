import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';
import {  useParams,useNavigate } from "react-router-dom";
import { Get, Save } from '../../Services/UserServices';

const UserAddEdit = () => {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      Get(id).then(data => {
        setUser(data);
        setIsLoading(false);
      }).catch(error => {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Save(user);
      navigate('/');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Col>
    <Form onSubmit={handleSubmit}>
        <Col md="full">
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </Form.Group>
        </Col>
        <Col md="full">
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </Form.Group>
        </Col>
        <Col md="full">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
        </Col>
      <Button className="primary mt-3" type="submit">
        {id ? 'Update' : 'Add'} User
      </Button>
    </Form>
    </Col>

    </Container>
  );
};

export default UserAddEdit;
