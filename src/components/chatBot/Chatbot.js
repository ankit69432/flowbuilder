import "./chatbot.css";
import { useEffect, useState } from 'react';
import React, { useRef} from 'react';

function Chatbot(props) {

    const color= useRef();
    const messageContainerRef = useRef(null);
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        document.getElementById('bimg').style.backgroundImage = props.color;
        document.getElementById('bimgg').style.backgroundImage = props.color;
    },[props.color])

    useEffect(() => {
        scrollMessageContainerToBottom();
      }, []);

    const scrollMessageContainerToBottom = () => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSendMsg = () => {
        if (content.trim() !== '') {
            const message = {
                isSender: true,
                content: content
            };
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollMessageContainerToBottom();

            const data = {
                question: content
            };

            fetch('https://b8aa-103-180-81-98.ngrok-free.app/api/v1/bot', {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log("message: " + response.reply.answer);
                    console.log(response);
                    const message = {
                        isSender: false,
                        content: response.reply.answer
                    };
                    setMessages((prevMessages) => [...prevMessages, message]);
                    scrollMessageContainerToBottom();
                })
                .catch((error) => {
                    console.log(error);
                });

            setContent('');
        }
    };




    return (
        <div>
           <div className="Chatbot-container">
                <div id="bimg" className="Chatbot-header" >
                    <div className="left"><i className="fa fa-android"></i></div>
                    <div><h2>ChatBot</h2></div>
                </div>

                <div  className="Chatbot-body">
                    <div ref={messageContainerRef} className="Chatbot-messages" id="messageContainer">
                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`message ${item.isSender ? 'sent' : 'received'}`}
                            >
                                <div className="message-content">{item.content}</div>
                            </div>
                        ))}
                    </div>
                    <div className="Chatbot-flex">
                            <div>
                                <textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    placeholder="write your message here.."
                                    name="contentInput"
                                    cols="120"
                                    rows="2"
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSendMsg();
                                        }
                                    }}
                                ></textarea>
                            </div>
                            <div>
                        <button id="bimgg" className="Chatbot-button"
                            style={{ backgroundImage: color }}
                            onClick={handleSendMsg}
                        >
                            <i
                                className="fa fa-send-o"
                                style={{ fontSize: '20px', color: 'white' }}
                            ></i>
                        </button>
                    </div>
                    </div>
               
                  
                </div>

            </div> 
        </div>
    );
}
export default Chatbot;