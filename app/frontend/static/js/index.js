import React from 'react';
import ReactDOM from 'react-dom';

import App from '../react/App';



class IndexPage {
    constructor() {
        const contextElement = document.getElementById('context-data');
        this.context = JSON.parse(contextElement.getAttribute("json", "{}")); // Parse the JSON string
        console.log("Index Page Constructor", this.context);
    }

    init() {
        console.log("Index Page Init");
        ReactDOM.render(<App  {...this.context} />, document.getElementById('react-component'));
        console.log("Index Page Init Done");
    }
}


const indexPage = new IndexPage()
indexPage.init()

export default indexPage