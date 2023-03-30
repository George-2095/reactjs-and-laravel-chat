import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Chat() {
    const { id } = useParams();
    const [authUser, setAuthUser] = useState([]);
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);

    const [sendMessage, setSendMessage] = useState('');
    const [messageError, setMessageError] = useState('')
    const isTextareaEmpty = sendMessage.trim().length === 0;

    useEffect(() => {
        axios.get("/authuser").then(response => {
            setAuthUser(response.data);
        }).catch(error => console.log(error));

        axios.get("/users").then(response => {
            setUser(response.data);
        }).catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`/chatapi/${authUser[0]?.id}/${id}`).then(response => {
            setMessages(response.data);
        }).catch(error => console.log(error));
    });

    const handleSendMessage = (event) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append("receivebyid", id)
        formData.append("message", sendMessage)
        axios.post('/sendmessage',
            formData,
            {
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
                }
            }).then(response => {
                setSendMessage('')
                setMessageError('')
            }).catch(error => {
                setMessageError(error.response.data.errors.message[0]);
            });
    };

    return (
        <>
            <Card>
                <Card.Header>
                    {
                        (id !== undefined) ? (
                            (user.filter(item => item.id == id).length !== 0) ? (
                                user.filter(item => item.id == id).map(useritem => (
                                    <b key={useritem.id}>{useritem.name} {useritem.surname}</b>
                                ))
                            ) : (
                                <b>User does not exist.</b>
                            )
                        ) : (
                            <b>Please go to the home page and select a user.</b>
                        )
                    }
                </Card.Header>
                <Card.Body>
                    <div className="chatlist">
                        {
                            messages.map((message) => (
                                <div className="message" key={message.id}>
                                    <div className={message.sendbyid == authUser[0].id ? "sent" : "received"}>
                                        <b dangerouslySetInnerHTML={{ __html: message.message }}></b>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Form onSubmit={handleSendMessage}>
                        <Form.Group className="mb-3 chatinput">
                            <textarea id="message" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} rows="5" className="form-control"></textarea>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <b className="text-danger">{messageError}</b>
                        </Form.Group>
                        <Button variant="success" type="submit" disabled={isTextareaEmpty}>Send</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default Chat;