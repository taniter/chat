import React, { Component } from 'react';
import ChatBox from './ChatBox';
import GetStart from './GetStart';
import Sidebar from './Sidebar';

class Homepage extends Component {

    render_Getstart = () => {
        if (!this.props.friendSelected) {
            return (
                <GetStart></GetStart>
            )
        }
    }
    render_Chatbox = () => {
        if (this.props.friendSelected) {
            return (
                <ChatBox
                    listMessage={this.props.listMessage}
                    onSendMessage={this.props.onSendMessage}
                    friendSelected={this.props.friendSelected}
                    userLogin={this.props.userLogin}
                ></ChatBox>
            )
        }
    }

    render() {
        return (
            <div className="container-fluid d-flex home-page">
                <Sidebar
                    allMessage={this.props.allMessage}
                    friendList={this.props.friendList}
                    onAddFriendClick={this.props.onAddFriendClick}
                    onLogoutClick={this.props.onLogoutClick}
                    userLogin={this.props.userLogin}
                    UpdateImageProfile={this.props.UpdateImageProfile}
                    searchFriend={this.props.searchFriend}
                    showSidebar={this.props.showSidebar}
                    onSeacrhClick={this.props.onSeacrhClick}
                ></Sidebar>
                {this.render_Getstart()}
                {this.render_Chatbox()}
            </div>
        );
    }
}

export default Homepage;