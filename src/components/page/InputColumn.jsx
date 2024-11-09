import { CloseButton, Input } from "@chakra-ui/react"



export default function InputColumn({handleInputs, removeColumn, nameColumn}) {
    return (
        <div className='flex items-center'>
            <Input className="dark:text-white" value={nameColumn} name='columns' onChange={handleInputs} placeholder='Name' />
            <CloseButton className="dark:text-white" onClick={removeColumn} />
        </div>
    )
}