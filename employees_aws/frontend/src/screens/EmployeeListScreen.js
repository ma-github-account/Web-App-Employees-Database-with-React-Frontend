import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listEmployees, deleteEmployee } from '../actions/employeeActions'

const COLUMNS = [
    { key: '_id',           label: 'ID' },
    { key: 'employee_id',   label: 'EMPLOYEE ID' },
    { key: 'first_name',    label: 'FIRST NAME' },
    { key: 'last_name',     label: 'LAST NAME' },
    { key: 'position',      label: 'POSITION' },
    { key: 'company_branch', label: 'BRANCH' },
]

function SortIcon({ direction }) {
    if (!direction) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>
    return <span style={{ marginLeft: 4 }}>{direction === 'asc' ? '↑' : '↓'}</span>
}

function EmployeeListScreen({ history }) {
    const [filterText, setFilterText] = useState('')
    const [sortKey, setSortKey] = useState(null)
    const [sortDir, setSortDir] = useState('asc')
    const [confirmEmployee, setConfirmEmployee] = useState(null)

    const dispatch = useDispatch()

    const employeeList = useSelector(state => state.employeeList)
    const { loading, error, employees } = employeeList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const employeeDelete = useSelector(state => state.employeeDelete)
    const { success: successDelete, error: errorDelete } = employeeDelete

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listEmployees())
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (employee) => {
        setConfirmEmployee(employee)
    }

    const confirmDelete = () => {
        dispatch(deleteEmployee(confirmEmployee._id))
        setConfirmEmployee(null)
    }

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortDir('asc')
        }
    }

    const filtered = employees.filter(e => {
        const q = filterText.toLowerCase()
        return (
            String(e._id).toLowerCase().includes(q) ||
            (e.employee_id || '').toLowerCase().includes(q) ||
            (e.first_name || '').toLowerCase().includes(q) ||
            (e.last_name || '').toLowerCase().includes(q) ||
            (e.position || '').toLowerCase().includes(q) ||
            (e.company_branch || '').toLowerCase().includes(q)
        )
    })

    const filteredEmployees = sortKey
        ? [...filtered].sort((a, b) => {
            const av = String(a[sortKey] ?? '').toLowerCase()
            const bv = String(b[sortKey] ?? '').toLowerCase()
            if (av < bv) return sortDir === 'asc' ? -1 : 1
            if (av > bv) return sortDir === 'asc' ? 1 : -1
            return 0
        })
        : filtered

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Employees</h1>
                </Col>
                <Col className='text-right'>
                    <LinkContainer to='/employees/create'>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Add Employee
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>

            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Form.Control
                        type='text'
                        placeholder='Filter by ID, name, position, branch…'
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className='mb-3'
                    />

                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                {COLUMNS.map(col => (
                                    <th
                                        key={col.key}
                                        onClick={() => handleSort(col.key)}
                                        style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                                    >
                                        {col.label}
                                        <SortIcon direction={sortKey === col.key ? sortDir : null} />
                                    </th>
                                ))}
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>{employee.employee_id}</td>
                                    <td>{employee.first_name}</td>
                                    <td>{employee.last_name}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.company_branch}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <LinkContainer to={`/employees/${employee._id}`}>
                                            <Button variant='info' className='btn-sm mr-1'>
                                                <i className='fas fa-eye mr-1'></i> Details
                                            </Button>
                                        </LinkContainer>

                                        <LinkContainer to={`/employees/${employee._id}/edit`}>
                                            <Button variant='warning' className='btn-sm mr-1'>
                                                <i className='fas fa-edit mr-1'></i> Edit
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(employee)}
                                        >
                                            <i className='fas fa-trash mr-1'></i> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            <Modal centered show={!!confirmEmployee} onHide={() => setConfirmEmployee(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {confirmEmployee && (
                        <p>
                            Are you sure you want to remove employee record:{' '}
                            <strong>
                                {confirmEmployee.employee_id}, {confirmEmployee.first_name} {confirmEmployee.last_name}
                            </strong>?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setConfirmEmployee(null)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={confirmDelete}>
                        <i className='fas fa-trash mr-1'></i> Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeListScreen
