import React from 'react';
import './App.css';
import {saveAs} from 'file-saver';

const listPOS = ["Noun", "Verb"];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFile: 1,
            current: 0,
            words: [],
            result: [],
        };
        fetch("/files/1.txt")
            .then(res => res.text())
            .then(sentence => {
                this.setState({
                    words: sentence.split(" "),
                })
            })
    }

    setPOS(pos) {
        this.setState((prevState, props) => {
            prevState.result.push(prevState.words[prevState.current] + "\t" + pos + "\n");

            if (this.state.current === this.state.words.length - 1) {
                let blob = new Blob(this.state.result, {type: "text/plain;charset=utf-8"});
                saveAs(blob, `${this.state.currentFile}.txt`);
                let currentFile = prevState.currentFile + 1;
                try {
                    // let sentence = require(`./files/${currentFile}.json`);
                    fetch(`/files/${currentFile}.txt`)
                        .then(res => res.text())
                        .then(text => {
                            if (text.includes("!DOCTYPE")) {
                                this.setState({currentFile: -1})
                            } else {
                                this.setState({words: text.split(" ")})
                            }
                        });
                    return {
                        currentFile: currentFile,
                        current: 0,
                        words: [],
                        result: []
                    }
                } catch (e) {
                    return {
                        currentFile: -1,
                        words: []
                    }
                }
            } else return {
                current: prevState.current + 1,
                result: prevState.result,
            }
        });
    }

    render() {
        let words = this.state.words.map((word, i) =>
            i === this.state.current
                ? <span key={i} className="text-danger ml-3">{word}</span>
                : <span key={i} className="ml-3">{word}</span>
        );
        let choices = listPOS.map(pos =>
            <button className="btn btn-primary mr-3" key={pos} onClick={() => this.setPOS.bind(this)(pos)}>
                {pos}
            </button>
        );

        return (
            <div className="container">
                <br/>
                <div>
                    File: {this.state.currentFile === -1 ? "No more file" : this.state.currentFile + ".json"}
                </div>
                Cau: <div style={{overflowWrap: "break-word"}}>{words}</div>
                <p> Chon tu loai: </p>
                {choices}
            </div>
        );
    }
}


export default App;
