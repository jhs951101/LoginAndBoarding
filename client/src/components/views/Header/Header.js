import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {auth} from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';

function Header(props){

    let [logined, setLoginState] = useState(false);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        axios.get('api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/login");
            }
            else {
                alert('로그아웃 하는데 실패 했습니다.');
            }
        });
    }

    useEffect(() => {
        dispatch(auth()).then(response => {
            setLoginState(response.payload.isAuth);
        })
    });

    const rendering = () => {
        const result = [];
  
        if(logined){
            result.push(
                <>
                    <Link to="/boardlist">[게시판]</Link> &emsp;
                    <Link onClick={onClickHandler}>[로그아웃]</Link>
                </>
            );
        }
        else{
            result.push(
                <>
                    <Link to="/login">[로그인]</Link> &emsp;
                    <Link to="/register">[회원가입]</Link>
                </>
            );
        }
  
        return result;
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', flexDirection: 'row',
            width: '100%', height: '10vh'
        }}>
            {rendering()}
        </div>
    );
}

export default withRouter(Header);