import React, { Component } from 'react';
import ChatItem from './ChatItem';
import FriendItem from './FriendItem';
import ImageUploader from 'react-images-upload';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            friendList: []
        }
    }

    showSidebar = () => {
        this.props.showSidebar();
    }

    onSearchChange = (ev) => {
        const value = ev.target.value;
        this.setState({
            key: value
        })
        this.props.onSeacrhClick(value);

    }
    render_SeacrhFriend = () => {
        if (this.props.searchFriend) {
            return (
                <FriendItem onAddFriendClick={this.props.onAddFriendClick} value={this.props.searchFriend}></FriendItem>
            )
        }
    }
    onLoadPicture = (pic, url) => {
        this.setState({
            picture: url.length ? url[url.length - 1] : url
        }, () => {
            this.props.UpdateImageProfile(this.state.picture);
        });

    }
    onLogoutClick = () => {
        this.props.onLogoutClick();
    }

    renderFriendList = () => {
        if (this.props.friendList) {
            const lst = [];
            lst.splice(0);
            this.props.friendList.forEach((item, key) => {
                lst.push(item);
            })
            return (
                lst.map((item, key) => {
                    const lst = [];
                    lst.splice(0);
                    if (this.props.allMessage)
                        this.props.allMessage.forEach((item1) => {
                            if (this.props.userLogin.userName === item1.val().idSend && item.val().idFriend === item1.val().idReceiver || this.props.userLogin.userName === item1.val().idReceiver && item.val().idFriend === item1.val().idSend) {
                                lst.push(item1.val());
                            }
                        })
                    return (
                        <ChatItem
                            onAddFriendClick={this.props.onAddFriendClick}
                            value={item} lastMessage={lst.length ? lst[lst.length - 1] : ''} key={key}></ChatItem>
                    )
                })
            )
        }
    }

    render() {
        return (
            <div id="sidebar" className="sidebar d-flex" >
                <div className="sidebar_nav d-flex flex-column">
                    <div className="image_profile" data-toggle="dropdown">
                        <img src={this.props.userLogin.picture ? this.props.userLogin.picture : null}></img>
                        <div className={this.props.userLogin.online ? "online" : "offline"}></div>
                        {/* <div className={!this.props.userLogin.online ? "offline" : "d-none"}></div> */}
                    </div>
                    <div class="dropdown-menu">
                        <a class="dropdown-item"><i style={{ color: "yellow" }} className="fa fa-user-circle-o"></i> Sửa Thông Tin Cá Nhân</a>
                        <a class="dropdown-item"><i className="fa fa-camera"></i>
                            <ImageUploader
                                buttonText='Đổi Ảnh Đại Diện'
                                onChange={this.onLoadPicture}
                            /></a>
                        <a onClick={this.onLogoutClick} class="dropdown-item" ><i style={{ color: "red" }} className="fa fa-sign-out"></i> Đăng Xuát</a>
                    </div>
                    <div className="sidebar_item mt-5 active btn btn-outline-primary message_icon">
                        <i class="fa fa-comment-o"></i>
                    </div>
                    <div className="sidebar_item btn btn-outline-primary message_icon">
                        <i class="fa fa-address-book-o"></i>
                    </div>
                    <div className="sidebar_item btn btn-outline-primary message_icon">
                        <i class="fa fa-star-o"></i>
                    </div>
                    <div className="sidebar_item btn btn-outline-primary message_icon">
                        <i class="fa fa-cog"></i>
                    </div>
                </div>
                <div className="sidebar_main d-flex flex-column">
                    <div className="sidebar_main_header">
                        <div onClick={this.showSidebar} className="show_menu p-3">
                            <i class="fa fa-bars" ></i>
                        </div>
                        <h6>Xin Chào - {this.props.userLogin.name}</h6>
                        <div class="form-group d-flex p-3 sidebar_main_search">
                            <input type="text"
                                class="form-control" name="search_friend" onChange={this.onSearchChange} placeholder="Tìm bạn bè..." />
                            <div className="btn btn-outline-secondary">
                                <i class="fa fa-user-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div className={!this.state.key.length ? "sidebar_main_body d-flex flex-column" : "d-none"} >
                        <div className={this.props.friendList ? "d-none" : "text-center"}>
                            <div className="spinner-grow text-muted"></div>
                            <div className="spinner-grow text-primary"></div>
                            <div className="spinner-grow text-success"></div>
                            <div className="spinner-grow text-info"></div>
                            <div className="spinner-grow text-warning"></div>
                            <div className="spinner-grow text-danger"></div>
                            <div className="spinner-grow text-secondary"></div>
                            <div className="spinner-grow text-dark"></div>
                            <div className="spinner-grow text-light"></div>

                        </div>
                        {this.renderFriendList()}
                    </div>
                    <div className={this.props.searchFriend ? "sidebar_main_body_search_friend d-flex flex-column" : "d-none"}>
                        {this.render_SeacrhFriend()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;