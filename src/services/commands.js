import axios from 'axios'
const baseUrl = '/api/context'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const getOne = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

const create = async (newObject, contextId) => {
    const config = {
        headers: { Authorization: token },
    }
    let context = await getOne(contextId)
    let newCommand = await axios.post('/api/commands', newObject, config)
    let updatedContext = {
        ...context,
        commands: context.commands.concat(newCommand.data.id)
    }
    await axios.put(`${baseUrl}/${contextId}`, updatedContext, config)
    return getAll()
}

const deletePost = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, create, deletePost }