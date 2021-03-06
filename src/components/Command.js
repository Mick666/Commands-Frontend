import React, { useState } from 'react'
import Togglable from './Togglable'
import CommandForm from './CommandForms'

const CommandTogglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' , marginLeft: '10px' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <span style={{ marginLeft: '10px' }}> {props.context} </span>
                <button onClick={toggleVisibility}>View</button>
            </div>
            <br></br>
            <div style={showWhenVisible} className='revealedCommand'>
                {props.context}
                <button onClick={toggleVisibility}>Hide</button>
                {props.children}
            </div>
        </div>
    )
}

{/* <div>{commands.map((command, i) => <p key={i} className='description'>{command.description}</p>)}</div> */}
const Command = ({ commands }) => {
    return (
        <div className='commandGrid'>
            {commands.map((command, i) => <div key={i} className='commandGroup'>
                <p className='command'>{command.command}</p>
                <p className='description'>{command.description} </p>
            </div>
            )}

        </div>
    )
}

const Commands = ({ context, commands, datakey, addCommand }) => {
    console.log(commands)


    const commandForm = (newCommand, contextId) => (
        <Togglable buttonLabel='New command'>
            <CommandForm createCommand={newCommand} contextId={contextId}/>
        </Togglable>
    )

    return (
        <div className='blogStyle' id={datakey}>
            <CommandTogglable buttonLabel='View' context={context} className='togglableCommand'>
                <div className='commandParent'>
                    <Command commands={commands}/>
                </div>
                <div className='newCommand'>
                    {commandForm(addCommand, datakey)}
                </div>
            </CommandTogglable>
        </div>
    )
}

export default Commands