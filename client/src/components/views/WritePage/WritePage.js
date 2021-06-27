import React from 'react';
import {useDispatch} from 'react-redux';
import {registerBoard} from '../../../_actions/board_action';
import {auth} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

let body = {};

function WritePage(props) {

    const dispatch = useDispatch();

    const [Title, setTitle] = React.useState("")
    const [Contents, setContents] = React.useState("")

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        body.title = Title;
        body.contents = Contents

        dispatch(auth())
        .then(response => {
            body.email = response.payload.email;

            dispatch(registerBoard(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/boardlist')
                } else {
                    alert('Failed to upload your board')
                }
            });
        });
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>

                <label>Title</label>
                <input type="title" size="50" value={Title} onChange={onTitleHandler}/>   
                
                <label>Contents</label>
                <textarea width="300" rows="10" value={Contents} onChange={onContentsHandler}></textarea>

                <br/>
                <button>올리기</button>
            </form>

        </div>
    )
}

export default withRouter(WritePage)