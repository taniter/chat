import React, { Component } from 'react';

class MessageReceiver extends Component {
    render() {
        return (
            <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                    <img src={this.props.friendSelected.picture} className="rounded-circle user_img_msg" />
                    <span className="msg_time">{this.props.value.time}</span>
                </div>
                <div className="msg_cotainer">
                    {this.props.value.content}
                </div>
            </div>
        );
    }
}

export default MessageReceiver;