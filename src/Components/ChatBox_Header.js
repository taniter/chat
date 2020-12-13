import React, { Component } from 'react';

class ChatBox_Header extends Component {
    render() {
        return (
            <div className="chatbox_header d-flex bg-white d-flex">
                <div className="chatbox_header_user d-flex dropright" >
                    <img className="user_img"
                        src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" data-toggle="dropdown"></img>
                    <div class="dropdown-menu">
                        <a class="dropdown-item"><i style={{ color: "red" }} className="fa fa-minus-circle"></i> Chặn</a>
                        <a class="dropdown-item"><i className="fa fa-trash-o" ></i> Xóa Bạn</a>
                    </div>
                    <div className="user_info">
                        <h5 className="m-0">{this.props.friendSelected.name}</h5>
                        <span>Truy cap 2 gio truoc</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatBox_Header;