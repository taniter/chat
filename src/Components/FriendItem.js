import React, { Component } from 'react';

class FriendItem extends Component {
    onAddFriendClick = () => {
        this.props.onAddFriendClick(this.props.value);
    }
    render() {
        const value = this.props.value ? this.props.value.val() : null;
        return (
            <div onClick={this, this.onAddFriendClick} className="chat_item d-flex">
                <div className="img_profile">
                    <img src={value.picture}></img>
                </div>
                <div className={value.online ? "online" : "d-none"}></div>
                <div className={!value.online ? "offline" : "d-none"}></div>
                <div className="body_item col-xl-8 col-8 col-md-8">
                    <h6 className="body_name">
                        {value.name}
                    </h6>
                </div>
                <div className="time_unread d-flex col-xl-2 col-2 col-md-2">
                    <i onClick={this.onAddFriendClick} class="fa fa-user-plus mr-3"></i>
                    <i class="fa fa-envelope-o"></i>
                </div>
            </div>
        );
    }
}

export default FriendItem;