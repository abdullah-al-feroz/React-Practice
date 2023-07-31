
import React, { useReducer } from 'react'
import { NavLink } from "react-router-dom";


const initialState = {
  contactInfo: {
    firstName: '',
    lastName: '',
    fullName: ''
  },
  othersInfo: {
    email: "",
    phoneNumber: 0,
    address: ""
  }
}

const ACTION_TYPE = {
  SET_FIRST_NAME: "SET_FIRST_NAME",
  SET_LAST_NAME: "SET_LAST_NAME",
  SET_FULL_NAME: "SET_FULL_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  SET_ADDRESS: "SET_ADDRESS",
  RESET : "RESET"
}

const stateReducer = (state, action) => {
  switch (action.type) {

    case ACTION_TYPE.SET_FIRST_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, firstName: action.payload }
      }

    case ACTION_TYPE.SET_LAST_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, lastName: action.payload }
      }

    case ACTION_TYPE.SET_FULL_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, fullName: action.payload }
      }

    case ACTION_TYPE.SET_EMAIL:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, email: action.payload }
      }

    case ACTION_TYPE.SET_PHONE_NUMBER:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, phoneNumber: action.payload }
      }

    case ACTION_TYPE.SET_ADDRESS:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, address: action.payload }
      }

    case ACTION_TYPE.RESET:
      return {
        ...state,
      }

    default:
      break;
  }
}

function UserInfo() {

  const [state, dispatch] = useReducer(stateReducer, initialState)
  const { contactInfo, othersInfo } = state

  const reset = () => {
    dispatch({ type: ACTION_TYPE.RESET, payload: null })
  }

  function validateEmail(val) {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return filter.test(val);
  }

  const isValid = () => {
    contactInfo.firstName.length > 0 &&
      contactInfo.lastName.length > 0 &&
      contactInfo.fullName.length > 0 &&
      validateEmail(othersInfo.email) &&
      othersInfo.phoneNumber.length > 0 &&
      othersInfo.address.length > 0

  }


  const handleSubmit = () => {
    if (!isValid) {
      console.log("not valid")
      return;
    }
    let data = {
      "firstName": contactInfo.firstName,
      "lastName": contactInfo.lastName,
      "fullName": contactInfo.fullName,
      "email": othersInfo.email,
      "phoneNumber": othersInfo.phoneNumber,
      "address": othersInfo.address
    }
    localStorage.setItem('dataKey', JSON.stringify(data));
    reset();
    <NavLink to="ViewUserInfo/" />
  }

  return (
    <div class="container">
      <div>
        <h3>Contact Us</h3>
      </div>

      <div class="row mt-5">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            aria-label="FirstName"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_FIRST_NAME, payload: e.target.value })}
          />
        </div>

        <div class="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            aria-label="LastName"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_LAST_NAME, payload: e.target.value })}
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="Full Name"
            aria-label="FullName"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_FULL_NAME, payload: e.target.value })}
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_EMAIL, payload: e.target.value })}
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="Phone Number"
            aria-label="PhoneNumber"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_PHONE_NUMBER, payload: e.target.value })}
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="Address"
            aria-label="address"
            onChange={(e) => dispatch({ type: ACTION_TYPE.SET_ADDRESS, payload: e.target.value })}
          />
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12" style={{ display: 'flex', justifyContent: "flex-end" }}>
          <button
            type="button"
            class="btn btn-success"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
