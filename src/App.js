import React, { Component } from 'react';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import { Database } from './Database/FirebaseConnection'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Alerts from './Components/Alerts';
import Homepage from './Components/Homepage';
import $, { data } from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isRegister: false,
      userLogin: null,
      searchFriend: null,
      friendSelected: null,
      allMessage: null,
      friendList: null,
      listMessage: []
    }
  }
  componentWillMount() {

  }

  render_Login_Form = () => {
    if (!this.state.isRegister && !this.state.userLogin) {
      return (
        <LoginForm
          onRegisterClick={() => { this.setState({ isRegister: !this.state.isRegister }) }}
          onLoginClick={this.onLoginClick}
        ></LoginForm>
      )
    }
  }

  onLoginClick = (data) => {
    Database.ref('chat/user/' + data.userName).on('value', (value) => {
      this.setState({
        userLogin: value
      })
      if (!this.state.isLogin) {
        if (value.val() && value.val().password === data.password) {
          this.setState({
            userLogin: value,
            isLogin: true
          }, () => {
            const val = value.val();
            Database.ref('chat/user/' + val.userName).set({
              name: val.name,
              userName: val.userName,
              password: val.password,
              online: true,
              picture: val.picture ? val.picture : '',
              friendList: val.friendList ? val.friendList : []
            })
            this.getFriendMessage();
          })
        }
        else {
          alert("Sai pass");
        }
      }
    })
  }



  render_Register_Form = () => {
    if (this.state.isRegister) {
      return (
        <RegisterForm
          onCanelClick={() => { this.setState({ isRegister: !this.state.isRegister }) }}
          onRegisterClick={this.onRegisterClick}
        ></RegisterForm>
      )
    }
  }
  onRegisterClick = (data) => {
    Database.ref('chat/user/' + data.userName).on('value', (value) => {
      if (this.state.isRegister) {
        if (!value.val()) {
          Database.ref('chat/user/' + data.userName).set({
            name: data.name,
            userName: data.userName,
            password: data.password,
            online: false,
            picture: '',
            friendList: []
          }, () => {
            alert('Đăng Ký Thành Công!');
            this.setState({
              isRegister: !this.state.isRegister
            })
          })
        }
        else
          alert('Tên đăng nhập đã được sử dụng.');
      }
    })
  }

  render_Homepage = () => {
    if (this.state.userLogin) {
      return (
        <Homepage
          onLogoutClick={this.onLogoutClick}
          showSidebar={this.showSidebar}
          onSeacrhClick={this.onSeacrhClick}
          searchFriend={this.state.searchFriend}
          UpdateImageProfile={this.UpdateImageProfile}
          userLogin={this.state.userLogin.val()}
          friendSelected={this.state.friendSelected}
          onAddFriendClick={this.onAddFriendClick}
          onSendMessage={this.onSendMessage}
          listMessage={this.state.listMessage}
          friendList={this.state.friendList}
          allMessage={this.state.allMessage}
        ></Homepage>
      )
    }
  }
  UpdateImageProfile = (pic) => {
    const val = this.state.userLogin.val();
    Database.ref('chat/user/' + val.userName).set({
      name: val.name,
      userName: val.userName,
      password: val.password,
      online: false,
      picture: pic,
      friendList: val.friendList ? val.friendList : []
    })
  }

  showSidebar = () => {
    if ($(".sidebar_nav").css("display") === "none")
      $(".sidebar_nav").attr('style', 'display: unset !important');
    else
      $(".sidebar_nav").attr('style', 'display: none');
  }

  onSeacrhClick = (data) => {
    if (data.length)
      Database.ref('chat/user/' + data).on('value', (value) => {
        if (data.length)
          if (value.val()) {
            this.setState({
              searchFriend: value
            })
          }
          else {
            this.setState({
              searchFriend: null
            })
          }
      })
    else {
      this.setState({
        searchFriend: null
      })
    }
  }

  onLogoutClick = () => {
    const val = this.state.userLogin.val();
    Database.ref('chat/user/' + val.userName).set({
      name: val.name,
      userName: val.userName,
      password: val.password,
      online: false,
      picture: val.picture,
      friendList: val.friendList
    }, () => {
      this.setState({
        isLogin: false,
        isRegister: false,
        userLogin: null,
        searchFriend: null,
        friendSelected: null
      })
    })
  }

  getMessage = () => {
    Database.ref('chat/message/').on('value', (value) => {
      const listMessage = [];
      listMessage.splice(0);
      if (this.state.friendSelected) {
        const idSend = this.state.userLogin.val().userName;
        const idReceiver = this.state.friendSelected.userName;
        value.forEach((item) => {
          if (idSend === item.val().idSend && idReceiver === item.val().idReceiver ||
            idSend === item.val().idReceiver && idReceiver === item.val().idSend) {
            listMessage.push(item.val());
          }
        })
      }
      this.setState({
        listMessage: listMessage,
        allMessage: value
      })
    })

  }

  onAddFriendClick = (data) => {
    this.setState({
      friendSelected: data.val(),
      searchFriend: null
    }, () => {
      this.getMessage()
    })
    Database.ref('chat/user/' + this.state.userLogin.val().userName + '/friendList/' + data.key).set({
      block: false,
      name: data.val().name,
      online: data.val().online,
      idFriend: data.key,
      userName: data.key,
      picture: data.val().picture ? data.val().picture : ''
    });
  }

  onSendMessage = (content) => {
    var date = new Date();
    const idSend = this.state.userLogin.val().userName;
    const idReceiver = this.state.friendSelected.userName;
    const day = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    Database.ref('chat/message/').push({
      idSend: idSend,
      idReceiver: idReceiver,
      content: content,
      date: day,
      time: time
    })
  }

  getFriendMessage = () => {
    console.log(this.state.userLogin)
    if (this.state.userLogin && this.state.userLogin.val().friendList)
      Database.ref('chat/user/' + this.state.userLogin.val().userName + '/friendList/').on('value', (value) => {
        if (value.val())
          this.setState({
            friendList: value
          })
        this.getMessage();
      })
  }

  render() {
    return (
      <Router>
        <div>
          {this.render_Login_Form()}
          {this.render_Register_Form()}
          {this.render_Homepage()}
        </div >
      </Router>
    );
  }
}

export default App;