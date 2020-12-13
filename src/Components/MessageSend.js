import React, { Component } from 'react';

class MessageSend extends Component {
    render() {
        return (
            <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                    {this.props.value.content}
                </div>
                <div className="img_cont_msg">
                    <img src={this.props.userLogin.picture} className="rounded-circle user_img_msg" />
                    <span className="msg_time_send">{this.props.value.time}</span>
                </div>
            </div>
        );
    }
}

export default MessageSend;