import React, { useState, useEffect } from 'react'
import Commands from './components/Command'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import ContextForm from './components/ContextForm'
import commandService from './services/commands'
import loginService from './services/login'

const App = () => {
    const [commands, setCommands] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('error')
    const [user, setUser] = useState(null)

    useEffect(() => {
        let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if (user === null) return
            setUser(user)
            console.log(user)
            commandService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            console.log(window.localStorage.getItem('loggedBlogappUser'))

            commandService.setToken(user.token)
            setUser(user)
            console.log(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationType('error')
            setNotification('Wrong credentials')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleLogOut = () => {
        window.localStorage.setItem(
            'loggedBlogappUser', null
        )
        setUser(null)
    }

    const addCommand = (blogObject, contextId) => {

        commandService
            .create(blogObject, contextId)
            .then(returnedCommands => {
                setCommands(returnedCommands)
                setUser(user)
                setNotificationType('notification')
                setNotification('New command added')
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    useEffect(() => {
        commandService.getAll().then(commands => {
            console.log(commands)
            setCommands(commands)
        })
    }, [])

    return (
        <div>
            <Notification message={notification} className={notificationType}/>
            {user === null ?
                <div>
                    <h2>Please log in</h2>
                    {loginForm()}
                </div>:
                <div>
                    <h2>Programming commands</h2>
                    {`${user.username} logged in`} <button onClick={handleLogOut}>Log you out</button>
                    <br></br>
                    <br></br>
                    {commands.map(command =>
                        <Commands
                            key={command.id}
                            datakey={command.id}
                            context={command.context}
                            commands={command.commands}
                            addCommand={addCommand} />
                    )}
                </div>
            }
        </div>
    )
}

export default App