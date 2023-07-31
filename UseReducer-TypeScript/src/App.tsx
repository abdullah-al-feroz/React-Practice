
import { useReducer } from 'react'


type InitialStateType = {
  contactInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
  },
  othersInfo: {
    email: string;
    phoneNumber: number,
    address: string
  }
};

const initialState: InitialStateType = {
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

enum ActionType {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_FULL_NAME,
  SET_EMAIL,
  SET_PHONE_NUMBER,
  SET_ADDRESS,
  RESET
}

const stateReducer = (state: InitialStateType, action: { type: ActionType, payload: any }) => {
  switch (action.type) {
    case ActionType.SET_FIRST_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, firstName: action.payload }
      }

    case ActionType.SET_LAST_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, lastName: action.payload }
      }

    case ActionType.SET_FULL_NAME:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, fullName: action.payload }
      }

    case ActionType.SET_EMAIL:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, email: action.payload }
      }

    case ActionType.SET_PHONE_NUMBER:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, phoneNumber: action.payload }
      }

    case ActionType.SET_ADDRESS:
      return {
        ...state,
        othersInfo: { ...state.othersInfo, address: action.payload }
      }

    case ActionType.RESET:
      return {
        ...initialState
      }

    default:
      return initialState
  }
}

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const { contactInfo, othersInfo }: InitialStateType = state

  function validateEmail(val: string) {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return filter.test(val);
  }

  const reset = () => {
    dispatch({ type: ActionType.RESET, payload: null })
  }

  const isValid = () => {
    contactInfo.firstName.length > 0 &&
      contactInfo.lastName.length > 0 &&
      contactInfo.fullName.length > 0 &&
      validateEmail(othersInfo.email) &&
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
  }

  return (
    <div className="container">
      <div>
        <h3>Contact Us</h3>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            aria-label="FirstName"
            onChange={(e) => dispatch({ type: ActionType.SET_FIRST_NAME, payload: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            aria-label="LastName"
            onChange={(e) => dispatch({ type: ActionType.SET_LAST_NAME, payload: e.target.value })}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            aria-label="FullName"
            onChange={(e) => dispatch({ type: ActionType.SET_FULL_NAME, payload: e.target.value })}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            onChange={(e) => dispatch({ type: ActionType.SET_EMAIL, payload: e.target.value })}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            aria-label="PhoneNumber"
            onChange={(e) => dispatch({ type: ActionType.SET_PHONE_NUMBER, payload: e.target.value })}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            aria-label="address"
            onChange={(e) => dispatch({ type: ActionType.SET_ADDRESS, payload: e.target.value })}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12" style={{ display: 'flex', justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
