import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $, { data } from 'jquery';

class LoginForm extends Component {
    componentDidMount() {
        var self = this;
        $("#password").keydown(function (key) {
            if (key.keyCode === 13) {
                self.onLoginClick();
            }
        })
    }
    onRegisterClick = () => {
        this.props.onRegisterClick();
    }
    onInputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({
            [name]: value
        })
    }
    onLoginClick = () => {
        if (!this.state || !this.state.userName || !this.state.password) {
            alert("Vui lòng nhập đầy đử thông tin.");
        }
        else {
            this.props.onLoginClick(this.state);
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row p-0">
                    <div className="display-4 col text-center p-3 text-muted">NTT CHAT</div>
                </div>
                <div className="row justify-content-center mt-3 p-0">
                    <div className="col-12  col-xl-4 col-sm-8 col-md-6">
                        <div className="card">
                            <div className="box">
                                <h1>Đăng Nhập</h1>
                                <p className="text-muted"> Please enter your login and password!</p>
                                <input onChange={this.onInputChange} type="text" name="userName" placeholder="tên đăng nhập" />
                                <input id="password" onChange={this.onInputChange} type="password" name="password" placeholder="mật khẩu" />
                                <a className="forgot text-muted">Quên mật khẩu?</a>
                                <hr />
                                <Link to="/register.html"><div onClick={this.onRegisterClick} className="btn btn-warning mr-2">Đăng Ký</div></Link>
                                <button onClick={this.onLoginClick} className="btn btn-primary">Đăng Nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;