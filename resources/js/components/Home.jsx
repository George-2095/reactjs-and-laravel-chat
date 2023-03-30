import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('./users').then(response => {
            setUsers(response.data)
        })
    })

    return (
        <div className="userslist">

            {
                (users.length) ? (
                    <>
                        <h1 className="text-center">Select an user.</h1>
                        <ListGroup>
                            {
                                users.map(item => (
                                    <ListGroup.Item key={item.id}>
                                        <Link to={"/chat/" + item.id}>
                                            <b>{item.name} {item.surname}</b>
                                        </Link>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </>
                ) : (
                    <div>
                        <h1 className="text-center">Users don't exist.</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Home