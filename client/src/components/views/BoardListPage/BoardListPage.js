import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {loadBoardsAll} from '../../../_actions/board_action'

function BoardListPage(){
  let [boardsInfo, setBoardsInfo] = useState([{empty:''}]);
  const dispatch = useDispatch();

  dispatch(loadBoardsAll(''))
  .then(response => {
    setBoardsInfo(response.payload);
  });

  const rendering = () => {
    const result = [];

    for (let i = 0; i < boardsInfo.length; i++) {
      result.push(
        <>
          <table border="1" width="350">
            <tr>
              <td>
                작성자: {boardsInfo[i].email}
              </td>
            </tr>
            <tr>
              <td>
                제목: {boardsInfo[i].title}
              </td>
            </tr>
            <tr>
              <td>
                내용: {boardsInfo[i].contents}
              </td>
            </tr>
          </table>
          <br/>
        </>
      );
    }

    return result;
  };

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', flexDirection: 'column'
    }}>
        {rendering()}
      <Link to="/write">[글쓰기]</Link>
    </div>
  );
 }

 export default withRouter(BoardListPage);

/*
    for(var i=0; i<response.payload.length; i++){
      console.log(response.payload[i].title + '\n' + response.payload[i].contents);
    }
*/