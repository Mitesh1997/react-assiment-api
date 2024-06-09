import { Form } from 'react-bootstrap';
const UserFilter = ({onFilterChange}) => {
          const handleChange = (e) => {
            onFilterChange(e.target.value);
          };
    return (
        <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter name or email"
              onChange={handleChange}
            />
        </Form.Group>
    )
}


export default UserFilter;