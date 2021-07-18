/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html} from 'lit-element';
import {PageViewElement} from './page-view-element.js';
// These are the shared styles needed by this element.
import {SharedStyles} from './shared-styles.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import {download, upload} from '../restclient/client.js';
import {digioSubmit} from '../clientsdk/digio';
import {saveAs} from "./FileSaver";

class MyView1 extends PageViewElement {
    static get styles() {
        return [
            SharedStyles
        ];
    }

    static get properties() {
        return {
            _documentId: {type: String},
            _identifier: {type: String},
            _submissionResponse: {type: Object},
        }
    }

    render() {
        return html`
<div>     
   <input accept=".pdf, application/pdf"
    id="fileChooser" @change="${(e) => this._onFileSelection(e)}" type="file" style="visibility:hidden; width:0px" />
  <paper-input style="margin:10px;" @change="${(e) => {
            this._identifier = e.target.value;
        }}" label="Identifier"></paper-input>
   <paper-button 
    @click="${(e) => this.shadowRoot.getElementById('fileChooser').click()}" raised>Upload Pdf</paper-button>
    <div style="padding: 20px;">${this._documentId}</div>
    <div style="padding: 20px;">
     <div>Submit response</div>
     ${this._submissionResponse === undefined ? html`<div>No Submission</div>` : (this._submissionResponse.hasOwnProperty("error_code") ? html`<div>Failed Submission</div>` : html`<div>Success Submission</div>`)}
     <div>${JSON.stringify(this._submissionResponse)}</div>
    <paper-button 
    .hidden="${this._submissionResponse === undefined || !this._submissionResponse.hasOwnProperty("error_code")}"
    @click="${(e) => {
            this._submit();
        }})}" raised>Retry Submission</paper-button>
    <paper-button 
    .hidden="${this._submissionResponse === undefined}"
    @click="${(e) => {
            this._download();
        }})}" raised>Download</paper-button>
    
    </div>
</div>
    `;
    }

    _onFileSelection(e) {
        let files = this.shadowRoot.getElementById("fileChooser").files;
        if (files.length > 0) {
            let file = files[0];
            upload(file, this._identifier).then(function (res) {
                this._documentId = res.data.id;
                this._submit();
            }.bind(this)).catch((err) => {
                console.log(err);
            });
        }
        this.shadowRoot.getElementById("fileChooser").value = null;
    }

    _submit() {
        if (this._documentId === undefined) return;
        digioSubmit(this._documentId, "omprakashsrv@gmail.com")
            .then(function (res) {
                this._submissionResponse = res;
            }.bind(this))
            .catch(function (err) {
                this._submissionResponse = err;
            }.bind(this));
    }

    _download() {
        download(this._documentId).then(function (res) {
            saveAs(res, this._documentId + ".pdf");
        }.bind(this)).catch((err) => {
            console.log(err);
        });
    }
}

window.customElements.define('my-view1', MyView1);
