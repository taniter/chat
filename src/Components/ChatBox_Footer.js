import React, { Component } from 'react';
import $, { data } from 'jquery';

class ChatBox_Footer extends Component {

    componentDidMount() {
        var self = this;
        $("#inputMessage").keydown(function (key) {
            if (key.keyCode === 13) {
                self.onSendMessage();
                $("#inputMessage").val("");
            }
        })
    }
    onSendMessage = () => {
        if (this.state && this.state.content) {
            this.props.onSendMessage(this.state.content)
            $("#inputMessage").val("");
        }
    }
    onInputMessageChange = (ev) => {
        const val = ev.target.value;
        this.setState({
            content: val
        })
    }
    render() {
        return (
            <div className="chatbox_footer d-flex flex-column">
                <div className="d-flex footer_funtion pl-2">
                    <div className="btn chatbox_item btn-outline-secondary">
                        <i class="fa fa-ticket"></i>
                    </div>
                    <div className="btn chatbox_item btn-outline-secondary">
                        <i class="fa fa-picture-o"></i>
                    </div>
                    <div className="btn chatbox_item btn-outline-secondary">
                        <i class="fa fa-link"></i>
                    </div>
                    <div className="btn chatbox_item btn-outline-secondary">
                        <i class="fa fa-id-card-o"></i>
                    </div>
                    <div className="btn chatbox_item btn-outline-secondary">
                        <i class="fa fa-exclamation"></i>
                    </div>
                </div>
                <div className="chatbox_input d-flex">
                    <input id="inputMessage" onChange={this.onInputMessageChange} className="col" name="content_chat" placeholder="Nhap tin nhan..."></input>
                    <div onClick={this.onSendMessage} className="p-3 btn btn-outline-primary">
                        <i class="fa fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatBox_Footer;