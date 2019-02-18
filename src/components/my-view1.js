/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import './track-item.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import { getTracks } from '../services/data.js';

class MyView1 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        ul {
          list-style: none;
          display: grid;
          grid-template-columns: auto auto;
          grid-gap: 1em;
        }

        #bottomPlayer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          background: white;
          padding: 1.4em;
          height: 2em;
          animation-name: slideUp;
          animation-duration: 200ms;
          animation-timing-function: ease-out;
          justify-content: space-between;
          flex-direction: row;
          width: 89vw;
          box-shadow: 0px -5px 10px 0px rgba(0,0,0,0.19);
        }

        #bottomPlayer #bottomPlayerTitle {
          font-size: 1.2em;
          font-weight: bold;
        }

        #bottomPlayer img {
          height: 3.6em;
          width: 3.6em;
          border-radius: 12px;
          margin-right: 1em;
        }

        #bottomPlayer #contentBlock {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
        }

        #bottomPlayer #buttonBlock {
          flex: 1;
        }

        #bottomPlayer #buttonBlock button {
          border: none;
          background: none;
        }

        #bottomPlayer #contentBlock #bottomPlayerTitle {
          width: 12em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0.4;
          }

          to {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      tracks: { type: Array },
      playingTrack: { type: Object },
      playing: { type: Boolean }
    };
  }

  async firstUpdated() {
    this.tracks = await getTracks();
    console.log(this.tracks);
  }

  constructor() {
    super();
  }


  play(ev) {
    const audioEl = this.shadowRoot.querySelector('audio');

    if (!this.playing) {
      this.playing = true;
    }

    console.log(this.playingTrack);
    console.log(ev.detail.track);

    if ( ev.detail.track && this.playingTrack !== ev.detail.track) {
      console.log(ev.detail);
      this.playingTrack = ev.detail.track;

      audioEl.src = ev.detail.playURL;
    }
    else {
      console.log('already have song')
      audioEl.play();
    }
  }

  pause() {
    const audioEl = this.shadowRoot.querySelector('audio');
    audioEl.pause();

    this.playing = false;
  }

  render() {
    return html`
      <section>
        <h2>Latest Tracks</h2>
      
        <ul>
          ${this.tracks ? this.tracks.map((track) => {
            return html`
                <track-item @trackPlaying=${this.play} .track='${track}'></track-item>
                `
            }) : null}
        </ul>
      </section>

      ${this.playingTrack ? html`<div id='bottomPlayer'>
        <div id='contentBlock'>
          <img .src=${this.playingTrack.artwork_url} alt='track artwork'>
          <span id='bottomPlayerTitle'>${this.playingTrack ? this.playingTrack.title : null}</span>
        </div>

        <div id='buttonBlock'>
          <button>prev</button>
            ${!this.playing ? html`<button @click=${this.play}><img src='images/icons/play.svg'></button>` : html`<button @click=${this.pause}><img src='images/icons/pause.svg'></button>`}
          <button>next</button>
        </div>

        <div>
          <button>share</button>
        </div>

      </div>` : null}

      <audio autoplay></audio>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
