import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getEmployeeDetails, deleteEmployee } from '../actions/employeeActions'

function EmployeeDeleteScreen({ match, history }) {
    const employeeId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const employeeDetails = useSelector(state => state.employeeDetails)
    const { loading, error, employee } = employeeDetails

    const employeeDelete = useSelector(state => state.employeeDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = employeeDelete

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
            return
        }
        if (successDelete) {
            history.push('/')
            return
        }
        dispatch(getEmployeeDetails(employeeId))
    }, [dispatch, history, userInfo, employeeId, successDelete])

    const confirmDeleteHandler = () => {
        dispatch(deleteEmployee(employeeId))
    }

    return (
        <div>
            <h1>Delete Employee</h1>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Card className='mt-3 p-4'>
                    <Card.Body>
                        <Card.Title>Confirm Deletion</Card.Title>
                        <Card.Text>
                            Are you sure you want to delete employee record{' '}
                            <strong>{employee.first_name} {employee.last_name}</strong>{' '}
                            ({employee.employee_id})?
                            This action cannot be undone.
                        </Card.Text>

                        <Button
                            variant='danger'
                            className='mr-3'
                            onClick={confirmDeleteHandler}
                            disabled={loadingDelete}
                        >
                            <i className='fas fa-trash'></i> Yes, Delete
                        </Button>

                        <LinkContainer to='/'>
                            <Button variant='secondary'>
                                Cancel
                            </Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}

export default EmployeeDeleteScreen
