import React, { Component } from 'react';
import MessageReceiver from './MessageReceiver';
import MessageSend from './MessageSend';
import $, { data } from 'jquery';

class ChatBox_Body extends Component {

    renderMessage = () => {
        const userLogin = this.props.userLogin;
        return (
            this.props.listMessage.map((item, key) => {
                if (item.idSend === userLogin.userName) {
                    return (
                        <MessageSend value={item} userLogin={userLogin} key={key}></MessageSend>
                    )
                }
                else {
                    return (
                        <MessageReceiver value={item} friendSelected={this.props.friendSelected} key={key}></MessageReceiver>
                    )
                }
            })
        )
    }
    componentDidMount(){
        $('.chatbox_body').scrollTop($('.chatbox_body')[0].scrollHeight + 20);
    }
    componentDidUpdate() {
        $('.chatbox_body').scrollTop($('.chatbox_body')[0].scrollHeight + 20);
    }

    render() {
        return (
            <div className="chatbox_body card-body msg_card_body">
                {
                    this.renderMessage()
                }
            </div>
        );
    }
}

export default ChatBox_Body;