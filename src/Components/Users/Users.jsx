import React, { useState, useEffect } from 'react';
import {
  Col,
  Container,
  Image,
  Row,
  Table,
  Button,
  Pagination
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserFilter from './UserFilter';
import { List, Delete } from '../../Services/UserServices';

const Users = () => {
  const [pepole, setPepole] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');

  const fetchData = async (page) => {
    try {
      const res = await List(page);
      console.log('Fetched data:', res.data);
      setPepole(res.data.data); 
      setFilteredPeople(res.data.data); 
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (filter) {
      const filtered = pepole.filter((item) =>
        item.first_name.toLowerCase().includes(filter.toLowerCase()) ||
        item.last_name.toLowerCase().includes(filter.toLowerCase()) 
      );
      setFilteredPeople(filtered);
    } else {
      setFilteredPeople(pepole);
    }
  }, [filter, pepole]);
// deleting
  const handleDelete = async (id) => {
    try {
      await Delete(id);
      setPepole(pepole.filter((user) => user.id !== id));
      setFilteredPeople(filteredPeople?.filter((user) => user.id !== id));
    } catch (error) {
      console.log('Error deleting USer:', error);
    }
  };
// page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(currentPage); 
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h4>User Module</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserFilter onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>
            <Link to='/user' > <Button variant="primary">Add</Button> </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople?.map((result) => (
            <tr key={result.id}>
              <td>
                <Image src={result.avatar} roundedCircle />
              </td>
              <td>{result.first_name}</td>
              <td>{result.last_name}</td>
              <td>{result.email}</td>
              <td>
                <Link to={`/user/${result.id}`}>
                  <Button variant="info">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(result.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Item
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          active={currentPage === 2}
          onClick={() => handlePageChange(2)}
        >
          2
        </Pagination.Item>
      </Pagination>
    </Container>
  );
};

export default Users;
