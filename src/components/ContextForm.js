
import React, { useState } from 'react'

const ContextForm = ({ createContext }) => {
    const [context, setContext] = useState('')

    const addContext = (event) => {
        event.preventDefault()

        createContext({
            context: context,
        }, context)

        setContext('')
    }


    return (
        <div className='formDiv'>
            <form onSubmit={addContext}>
                Context: <input
                    id='context'
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ContextForm