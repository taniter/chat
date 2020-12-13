import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    onCanelClick = () => {
        this.props.onCanelClick();
    }
    onInputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({
            [name]: value
        })
    }
    onRegisterClick = () => {
        if (!this.state || !this.state.userName || !this.state.password || !this.state.name) {
            alert("Vui lòng điền đầy đử thông tin!");
        }
        else {
            this.props.onRegisterClick(this.state);
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row p-0">
                    <div className="display-3 col text-center p-3 text-muted">NTT CHAT</div>
                </div>
                <div className="row justify-content-center mt-3 p-0">
                    <div className="col-12  col-xl-4 col-sm-8 col-md-4">
                        <div className="card">
                            <form className="box">
                                <h1>Đăng Ký</h1>
                                <p className="text-muted"> Please enter your login and password!</p>
                                <input onChange={this.onInputChange} type="text" name="userName" placeholder="tên đăng nhập" />
                                <input onChange={this.onInputChange} type="password" name="password" placeholder="mật khẩu" />
                                <input onChange={this.onInputChange} type="text" name="name" placeholder="họ và tên" />
                                <hr />
                                <Link to="/"><div onClick={this.onCanelClick} className="btn btn-secondary mr-2">Hủy Bỏ</div></Link>
                                <div onClick={this.onRegisterClick} className="btn btn-primary">Đăng Ký</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;