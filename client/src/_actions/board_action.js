import Axios from 'axios';

export function registerBoard(dataTosubmit){
    const request = Axios.post('api/boards/register', dataTosubmit)
        .then(response => response.data);

    return {
        type: '',
        payload: request
    };
}

export function loadBoardsAll(dataTosubmit){
    const request = Axios.get('api/boards/loadall', dataTosubmit)
        .then(response => response.data);

    return {
        type: '',
        payload: request
    };
}

export function loadBoardInfo(dataTosubmit){
    const request = Axios.get('api/boards/loadinfo', dataTosubmit)
        .then(response => response.data);

    return {
        type: '',
        payload: request
    };
}