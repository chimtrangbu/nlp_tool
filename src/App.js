import React from 'react';
import {saveAs} from 'file-saver';
import config from './config'

const listPOS = Object.keys(config);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFile: 1,
            current: 0,
            words: [],
            result: [],
        };
        let fileName = window.location.search.substr(1);
        fetch(`/nlp_tool/files/${fileName}.json`)
            .then(res => res.json())
            .then(content => {
                if (!content.text.includes("html")) {
                    this.setState({
                        currentFile: parseInt(fileName),
                        words: this.handleContent(content.text),
                    })
                } else {
                    this.setState({
                        currentFile: -1
                    })
                }
            })
    }

    handleContent(text) {
        let words = [];
        text.split(/(?:\r|\n| )+/).map(word => {
            if (word.length > 0) {words.push(word)}
        });
        return words
    }

    setPOS(pos) {
        this.setState((prevState, props) => {
            prevState.result.push(prevState.words[prevState.current] + "\t" + pos + "\n");

            if (this.state.current === this.state.words.length - 1) {
                let blob = new Blob(this.state.result, {type: "text/plain;charset=utf-8"});
                saveAs(blob, `${this.state.currentFile}.txt`);
                let currentFile = prevState.currentFile + 1;
                try {
                    window.location.search = `?${currentFile}`;
                    fetch(`/nlp_tool/files/${currentFile}.json`)
                        .then(res => res.json())
                        .then(text => {
                            if (text.text.includes("html")) {
                                this.setState({currentFile: -1})
                            } else {
                                this.setState({words: text.text.split(" ")})
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
            (<span key={i} className={i === this.state.current
                                        ? "btn-info font-weight-bold ml-3"
                                        : "text-muted ml-3"}>
                {word}
            </span>)
        );
        let choices = listPOS.map(pos =>
            <button className="btn btn-outline-info m-2"
                    key={pos}
                    onClick={() => this.setPOS.bind(this)(pos)}>
                {config[pos]}
            </button>
        );

        return (
            <div className="container">
                <br/>
                <h5 className="text-info">
                    File: {this.state.currentFile === -1
                            ? "No more file"
                            : this.state.currentFile + ".json"}
                </h5>
                <div style={{display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap"}}>
                    {words}
                </div>
                <br/>
                <div style={{borderWidth:"2px",borderStyle:"solid",
                            position:"fixed", padding:"10px",
                            bottom:20, left:20,
                            maxWidth:"500px", zIndex:999,
                            display: "flex", flexDirection: "column",
                            flexWrap: "wrap"}}>
                    <p> Chon tu loai: </p>
                    {choices}
                </div>
            </div>
        );
    }
}


export default App;
