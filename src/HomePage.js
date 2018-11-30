import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {loadAllMessages} from './redux/actions';
import axios from 'axios';

class Message extends Component {
    render(){
        return(
            <div className="message">
                {this.props.content}
            </div>
        );
    }
}


class HomePage extends Component {
    constructor(props){
        super(props);            
        this.sendSomeData = this.sendSomeData.blind(this);
        this.updateMessage = this.updateMessage.blind(this);
        this.state = {
            content: null, // Initial content
            messageValue: '',
        };
    }

    componentDidMount(){
        axios.get('/api/message')
        .then((res)=> {
            console.log(res.data)
            this.props.loadAllMessages(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    }
        
    updateMessage(e){
        this.setState({
            messageValue: e.target.value,
        });
    }
        
    sendSomeData(){
        axios(
            {
                method: 'POST',
                url: '/api/sendmessage',
                data:{
                    message: this.state.messageValue,
                }
            })
            
        .then((res)=>{
            console.log(res)
        }).catch((e)=>{
            console.log(e);
        });
        this.setState({
            messageValue: '',
        })
    }
    render() {
        return (
            <div className="content-area">
            {this.state.content}
                <div className="message">
                    {
                        this.props.messages.map((messageData, i) => {
                            return <Message key={i} content={messageData}/>
                        })
                        //JSON.stringify(this.props.message)
                    }

                </div>
                <input value={this.state.messageValue} onChange={this.updateMessage}></input>
                <button onClick={this.sendSomeData}>Send some post data</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message:state.testReducer.message,
    };
};

const mapDispatchToProps = {loadAllMessages};
//const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);