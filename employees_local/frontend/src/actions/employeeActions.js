import axios from 'axios'
import {
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_LIST_SUCCESS,
    EMPLOYEE_LIST_FAIL,

    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_FAIL,

    EMPLOYEE_CREATE_REQUEST,
    EMPLOYEE_CREATE_SUCCESS,
    EMPLOYEE_CREATE_FAIL,

    EMPLOYEE_UPDATE_REQUEST,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,

    EMPLOYEE_DELETE_REQUEST,
    EMPLOYEE_DELETE_SUCCESS,
    EMPLOYEE_DELETE_FAIL,
} from '../constants/employeeConstants'


export const listEmployees = () => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/employees/', config)

        dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getEmployeeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/employees/${id}/`, config)

        dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createEmployee = (employee) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const isFormData = employee instanceof FormData

        const config = {
            headers: {
                ...(isFormData ? {} : { 'Content-type': 'application/json' }),
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/employees/create/', employee, config)

        dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data })

    } catch (error) {
        const errData = error.response && error.response.data
        dispatch({
            type: EMPLOYEE_CREATE_FAIL,
            payload: errData
                ? (errData.detail || JSON.stringify(errData))
                : error.message,
        })
    }
}


export const updateEmployee = (employee) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const isFormData = employee instanceof FormData
        const id = isFormData ? employee.get('_id') : employee._id

        const config = {
            headers: {
                // Let axios set Content-Type automatically for FormData
                // (it must include the multipart boundary in the header value)
                ...(isFormData ? {} : { 'Content-type': 'application/json' }),
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/employees/update/${id}/`,
            employee,
            config
        )

        dispatch({ type: EMPLOYEE_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteEmployee = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/employees/delete/${id}/`, config)

        dispatch({ type: EMPLOYEE_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: EMPLOYEE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
