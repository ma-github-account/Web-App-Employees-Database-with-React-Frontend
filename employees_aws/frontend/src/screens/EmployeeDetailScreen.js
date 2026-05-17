import React, { useEffect } from 'react'
import { Row, Col, Table, Button, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getEmployeeDetails } from '../actions/employeeActions'

function EmployeeDetailScreen({ match, history }) {
    const dispatch = useDispatch()
    const employeeId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const employeeDetails = useSelector(state => state.employeeDetails)
    const { loading, error, employee } = employeeDetails

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getEmployeeDetails(employeeId))
        }
    }, [dispatch, history, userInfo, employeeId])

    return (
        <div>
            <LinkContainer to='/'>
                <Button variant='light' className='my-3'>
                    <i className='fas fa-arrow-left'></i> Back to Employees
                </Button>
            </LinkContainer>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Row className='align-items-center mb-3'>
                        <Col>
                            <h1>{employee.first_name} {employee.last_name}</h1>
                        </Col>
                        <Col className='text-right'>
                            <LinkContainer to={`/employees/${employee._id}/edit`}>
                                <Button variant='primary' className='mr-2'>
                                    <i className='fas fa-edit'></i> Edit
                                </Button>
                            </LinkContainer>
                            <LinkContainer to={`/employees/${employee._id}/delete`}>
                                <Button variant='danger'>
                                    <i className='fas fa-trash'></i> Delete
                                </Button>
                            </LinkContainer>
                        </Col>
                    </Row>

                    {employee.photo && (
                        <Row className='mb-3'>
                            <Col md={3}>
                                <Image
                                    src={employee.photo}
                                    alt={employee.first_name}
                                    rounded
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', display: 'block' }}
                                />
                            </Col>
                        </Row>
                    )}

                    <Table striped bordered responsive>
                        <tbody>
                            <tr>
                                <th>Employee ID</th>
                                <td>{employee.employee_id}</td>
                            </tr>
                            <tr>
                                <th>First Name</th>
                                <td>{employee.first_name}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{employee.last_name}</td>
                            </tr>
                            <tr>
                                <th>Company Branch</th>
                                <td>{employee.company_branch}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>{employee.department}</td>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <td>{employee.position}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{employee.personal_phone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{employee.personal_mail}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{employee.address}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td>{employee.date_of_birth}</td>
                            </tr>
                            <tr>
                                <th>Nationality</th>
                                <td>{employee.nationality}</td>
                            </tr>
                            <tr>
                                <th>Level of English</th>
                                <td>{employee.level_of_english}</td>
                            </tr>
                            <tr>
                                <th>Native Language</th>
                                <td>{employee.native_language}</td>
                            </tr>
                            <tr>
                                <th>Created</th>
                                <td>{employee.createdAt && employee.createdAt.substring(0, 10)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default EmployeeDetailScreen
