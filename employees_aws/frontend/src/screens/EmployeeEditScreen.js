import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getEmployeeDetails, updateEmployee } from '../actions/employeeActions'
import { EMPLOYEE_UPDATE_RESET } from '../constants/employeeConstants'

const BRANCH_CHOICES = ['Chicago', 'Amsterdam', 'Bucharest']
const ENGLISH_CHOICES = ['Weak', 'Communicative', 'Fluent']

function EmployeeEditScreen({ match, history }) {
    const employeeId = match.params.id

    const [employeeIdField, setEmployeeIdField] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyBranch, setCompanyBranch] = useState('')
    const [department, setDepartment] = useState('')
    const [position, setPosition] = useState('')
    const [personalPhone, setPersonalPhone] = useState('')
    const [personalMail, setPersonalMail] = useState('')
    const [address, setAddress] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [nationality, setNationality] = useState('')
    const [levelOfEnglish, setLevelOfEnglish] = useState('')
    const [nativeLanguage, setNativeLanguage] = useState('')
    const [photoFile, setPhotoFile] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const employeeDetails = useSelector(state => state.employeeDetails)
    const { loading, error, employee } = employeeDetails

    const employeeUpdate = useSelector(state => state.employeeUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = employeeUpdate

    // Auth check, redirect on success, and fetch — does NOT depend on `employee`
    // to avoid an infinite loop: each dispatch of EMPLOYEE_DETAILS_REQUEST creates
    // a new `employee: {}` object reference, which would re-trigger the effect.
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
            return
        }
        if (successUpdate) {
            dispatch({ type: EMPLOYEE_UPDATE_RESET })
            history.push('/')
            return
        }
        dispatch(getEmployeeDetails(employeeId))
    }, [dispatch, history, userInfo, employeeId, successUpdate])

    // Populate form fields once the employee data arrives
    useEffect(() => {
        if (employee && employee._id && String(employee._id) === String(employeeId)) {
            setEmployeeIdField(employee.employee_id || '')
            setFirstName(employee.first_name || '')
            setLastName(employee.last_name || '')
            setCompanyBranch(employee.company_branch || '')
            setDepartment(employee.department || '')
            setPosition(employee.position || '')
            setPersonalPhone(employee.personal_phone || '')
            setPersonalMail(employee.personal_mail || '')
            setAddress(employee.address || '')
            setDateOfBirth(employee.date_of_birth || '')
            setNationality(employee.nationality || '')
            setLevelOfEnglish(employee.level_of_english || '')
            setNativeLanguage(employee.native_language || '')
        }
    }, [employee, employeeId])

    const photoChangeHandler = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setPhotoFile(file)
        setPhotoPreview(URL.createObjectURL(file))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('_id', employeeId)
        formData.append('employee_id', employeeIdField)
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('company_branch', companyBranch)
        formData.append('department', department)
        formData.append('position', position)
        formData.append('personal_phone', personalPhone)
        formData.append('personal_mail', personalMail)
        formData.append('address', address)
        if (dateOfBirth) formData.append('date_of_birth', dateOfBirth)
        formData.append('nationality', nationality)
        formData.append('level_of_english', levelOfEnglish)
        formData.append('native_language', nativeLanguage)
        if (photoFile) formData.append('photo', photoFile)
        dispatch(updateEmployee(formData))
    }

    return (
        <FormContainer>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <h1 className='mb-0'>Edit Employee</h1>
                <LinkContainer to='/'>
                    <Button variant='secondary'>
                        Cancel
                    </Button>
                </LinkContainer>
            </div>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='employeeId'>
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={employeeIdField}
                                    onChange={(e) => setEmployeeIdField(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='companyBranch'>
                                <Form.Label>Company Branch</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={companyBranch}
                                    onChange={(e) => setCompanyBranch(e.target.value)}
                                >
                                    <option value=''>Select branch...</option>
                                    {BRANCH_CHOICES.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='firstName'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='lastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='department'>
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='position'>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='personalPhone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={personalPhone}
                                    onChange={(e) => setPersonalPhone(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='personalMail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={personalMail}
                                    onChange={(e) => setPersonalMail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='dateOfBirth'>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='nationality'>
                                <Form.Label>Nationality</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='levelOfEnglish'>
                                <Form.Label>Level of English</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={levelOfEnglish}
                                    onChange={(e) => setLevelOfEnglish(e.target.value)}
                                >
                                    <option value=''>Select level...</option>
                                    {ENGLISH_CHOICES.map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='nativeLanguage'>
                                <Form.Label>Native Language</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={nativeLanguage}
                                    onChange={(e) => setNativeLanguage(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='photo'>
                        <Form.Label>Photo</Form.Label>
                        <div className='mb-2'>
                            {photoPreview ? (
                                <Image src={photoPreview} alt='preview' rounded
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                            ) : employee.photo ? (
                                <Image src={employee.photo} alt='current' rounded
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                            ) : (
                                <div className='photo-placeholder'>No photo</div>
                            )}
                        </div>
                        <Form.Control
                            type='file'
                            accept='image/*'
                            onChange={photoChangeHandler}
                        />
                        {photoFile && (
                            <Form.Text className='text-muted'>
                                Selected: {photoFile.name}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-2'>
                        Save Changes
                    </Button>

                    <LinkContainer to='/'>
                        <Button variant='secondary' className='mt-2 ml-2'>
                            Cancel
                        </Button>
                    </LinkContainer>
                </Form>
            )}
        </FormContainer>
    )
}

export default EmployeeEditScreen
