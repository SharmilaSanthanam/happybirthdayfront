import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import record from '../images/record.png';
import stop from '../images/stop.png';
import { Button } from 'react-bootstrap';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Question extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      number: '',
      text: '',
      isRecording: false,
      isRecorded: false,
      blobURL: '',
      isBlocked: false,
      isSaved: false,
    }
  }

  componentDidMount() {
    // get question details
    // axios.get('http://localhost:5000/questions/' + this.props.match.params._id)
    //   .then(response => {
    //     this.setState({
    //       id: response.data._id,
    //       number: response.data.number,
    //       text: response.data.text,
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })

    // get recording permission from browser
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  mic = () => {
    if (this.state.isRecording === false) {
      if (this.state.isBlocked) {
        console.log('Permission Denied');
      } else {
        Mp3Recorder
          .start()
          .then(() => {
            this.setState({ isRecording: true });
          }).catch((e) => console.error(e));
      }
    }
    else {
      Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob)
          this.setState({ blobURL, isRecording: false, isRecorded: true });
        }).catch((e) => console.log(e));

    }
  }

  instruction = () => {
    if (this.state.isRecorded === true) return "Press to record again and replace previous recording"
    else if (this.state.isRecording === false) return "Press to Record Your Answer";
    else return "Press to Stop Recording";
  }

  saveRecording = () => {
    const newAudio = {
      // username: this.props.user,
      filepath: this.state.blobURL,
      // question: this.state.id,
    };

    axios.post('http://localhost:5001/audios/add', newAudio)
      .then(res => console.log(res.data));
    this.setState({ isSaved: true });
  }


  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1> {this.state.text} </h1>
          <div
            className="container"
            style={this.state.isSaved === false ? { display: 'block' } : { display: 'none' }}>
            <p>
              You can answer the question using your voice.
          </p>
            <br />
            <img
              src={this.state.isRecording === false ? record : stop}
              width="50"
              onClick={this.mic}
            />
            <p>
              {this.instruction()}
            </p>
            <br />
            <br />
            <div
              className=" container"
              style={this.state.isRecorded === true ? { display: 'block' } : { display: 'none' }}>
              <audio src={this.state.blobURL} controls="controls" />
              <br />
              <br />
              <p>
                Is this ☝️ recording is okay?
            </p>
              <br />
              <Button
                variant="primary"
                onClick={this.saveRecording}>
                Save Recording
            </Button>
            </div>
          </div>
          <div
            className="container"
            style={this.state.isSaved === true ? { display: 'block' } : { display: 'none' }}>
            <p>
              Recording Saved!
          </p>
            <Link to="/add-wish" className="nav-link">
              <Button variant="primary">
                Go Back
            </Button>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}