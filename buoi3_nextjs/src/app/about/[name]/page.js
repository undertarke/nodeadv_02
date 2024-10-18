import React from 'react'

const page = (props) => {

    let { name } = props.params // route params
    let { email } = props.searchParams // query params

    return (
        <h1>
            {name}
            <br />
            {email}
        </h1>
    )
}

export default page