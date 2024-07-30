import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import Picker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setEmojiPicker] = useState(false);

    const handleEmojiPickerHideShow = () => {
        setEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = ( emoji) => {
        let message = msg;
        console.log(emoji.emoji);
        message += emoji.emoji;
        setMsg(message);
      };
    
      const sendChat =(event) =>{
  event.preventDefault();
  if(msg.length > 0){
    handleSendMsg(msg);
    setMsg("");
  }
      }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                </div>
            </div>
            {showEmojiPicker && (
                <div className="emoji-picker" style={{ zIndex: 1000 }}>
                    <Picker onEmojiClick={(emoji)=>{handleEmojiClick(emoji)}} />
                </div>
            )}

            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input
                    type="text"
                    placeholder="Type a message"
                    className="search-box"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 1rem;
    padding-bottom: 0.3rem;
    position: relative;

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

        .emoji {
            position: relative;

            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
        }
    }

    .emoji-picker {
        position: absolute;
        bottom: 3rem; /* Adjust this value as needed */
        left: 1rem;
            background-color: #080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #9a86f3;
            .emoji-scroll-wrapper::-webkit-scrollbar {
              background-color: #080420;
              width: 5px;
              &-thumb {
                background-color: #9a86f3;
              }
            }
            .emoji-categories {
              button {
                filter: contrast(0);
              }
            }
            .emoji-search {
              background-color: transparent;
              border-color: #9a86f3;
            }
            .emoji-group:before {
              background-color: #080420;
            }
          
        
    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        background-color: #ffffff34;
        gap: 2rem;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            font-size: 1.2rem;

            &::selection {
                background-color: #9a86f3;
            }

            &:focus {
                outline: none;
            }
        }

        .search-box {
            outline-width: 0;
            border: none;
            font-size: 1.25rem;
            padding: 0.5rem 1rem;
            width: 90%;
        }

        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;

            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;
