import React, { Component } from 'react';
import ChatBox_Body from './ChatBox_Body';
import ChatBox_Footer from './ChatBox_Footer';
import ChatBox_Header from './ChatBox_Header';

class ChatBox extends Component {
    render() {
        return (
            <div className="chatbox p-0 col d-flex flex-column">
                <ChatBox_Header friendSelected={this.props.friendSelected}></ChatBox_Header>
                <ChatBox_Body userLogin={this.props.userLogin} friendSelected={this.props.friendSelected} listMessage={this.props.listMessage}></ChatBox_Body>
                <ChatBox_Footer onSendMessage={this.props.onSendMessage}></ChatBox_Footer>
            </div>
        );
    }
}

export default ChatBox;