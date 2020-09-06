import React, { useState } from 'react'

function CommandForm ({ createCommand, contextId }) {
    const [command, setCommand] = useState('')
    const [description, setDescription] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createCommand({
            command: command,
            description: description
        }, contextId)

        setCommand('')
        setDescription('')
    }


    return (
        <div className='formDiv'>
            <form onSubmit={addBlog}>
      Command: <input
                    id='commmand'
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                />
                <br />
      Description: <input
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default CommandForm