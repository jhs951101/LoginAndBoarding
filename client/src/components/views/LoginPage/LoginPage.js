import React from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = React.useState("")
    const [Password, setPassword] = React.useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/')
            } else{
                alert(' Error')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            
            
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>   
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br />
                <button>
                    로그인
                </button>
            </form>

        </div>
    )
}

export default withRouter(LoginPage)