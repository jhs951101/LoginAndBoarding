import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {loadBoardInfo} from '../../../_actions/board_action'

function BoardInfoPage(props){
  let [boardInfo, setBoardInfo] = useState({empty:''});
  const dispatch = useDispatch();

  dispatch(loadBoardInfo({
    ids: Number(props.location.search.split("=")[1])
  }))
  .then(response => {
    setBoardInfo(response.payload);
  });

  const rendering = () => {
    const result = [];

    result.push(
      <>
        <tr>
          <td>
            제목: {boardInfo.title}
          </td>
        </tr>
        <tr>
          <td>
            작성자: {boardInfo.email}
          </td>
        </tr>
        <tr>
          <td>
            내용: {boardInfo.contents}
          </td>
        </tr>
      </>
    );

    return result;
  };

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', flexDirection: 'column'
    }}>
      {rendering()}
    </div>
  );
 }

 export default withRouter(BoardInfoPage);