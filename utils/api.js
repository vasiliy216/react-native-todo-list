import Axios from "../core/axios"

const Api = {
    create: postData => Axios.post('/create', postData),
    delete: itemId => Axios.delete('/delete/' + itemId),
    update: itemId => Axios.put('/update/' + itemId),
    findAll: () => Axios.get('/all')
}

export default Api