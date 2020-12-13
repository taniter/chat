import React, { Component } from 'react';
import $, { data } from 'jquery';

class ChatItem extends Component {
    onAddFriendClick = () => {
        $('.chat_item').click(function (ev) {
            $('.chat_item').removeClass('selected');
            $(ev.currentTarget).addClass('selected');
        })
        this.props.onAddFriendClick(this.props.value);
    }
    render() {
        return (
            <div onClick={this.onAddFriendClick} className="chat_item d-flex">
                <div className="img_profile">
                    <img src={this.props.value.val().picture}></img>
                </div>
                <div className="body_item col-xl-8 col-8 col-md-8">
                    <h6 className="body_name">
                        {this.props.value.val().name}
                    </h6>
                    <div className="body_content">{this.props.lastMessage ? this.props.lastMessage.content : ''}</div>
                </div>
                <div className="time_unread col-xl-2 col-2 col-md-2">
                    <span>6:00</span>
                    <div className="unread"></div>
                </div>
            </div>
        );
    }
}

export default ChatItem;