import { css, LitElement, html } from 'lit-element';

class TrackItem extends LitElement {

  static get styles() {
    return [
      css`
        li {
          display: flex;
          border-radius: 12px;
          border: solid 1px lightgrey;
          width: 30em;
          height: 200px;
          align-items: center;
        }

        li img {
          height: 5em;
          width: 5em;
          border-radius: 50px;
          margin: 1em;
        }

        li h3 {
          margin-bottom: 0;
          margin-top: 0;
          font-size: 1.6em;
          width: 11em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        li #username {
          margin-top: 0;
          color: grey;
        }

        li #desc {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 21em;
        }

        li #listItemButtons button {
          color: white;
          font-size: 18px;
          font-weight: bold;
          border: none;
          border-radius: 22px;
          padding-left: 2em;
          padding-right: 2em;
          padding-bottom: 8px;
          padding-top: 8px;
          outline: none;
          cursor: pointer;
        }

        li #listItemButtons #playButton {
          background: var(--app-secondary-color);
        }

        li #listItemButtons #faveButton {
          background: var(--app-primary-color);
        }
      `
    ]
  }

  static get properties() {
    return {
      track: { type: Object },
      playing: { type: Boolean }
    };
  }

  play() {
    console.log('hello world');
    /*const audioEl = this.shadowRoot.querySelector('audio');
    audioEl.src = `${this.track.stream_url}?client_id=a7Ucuq0KY8Ksn8WzBG6wj4x6pcId6BpU`;*/

    console.log('here');
    let event = new CustomEvent('trackPlaying', {
      detail: {
        message: 'playing',
        track: this.track,
        playURL: `${this.track.stream_url}?client_id=a7Ucuq0KY8Ksn8WzBG6wj4x6pcId6BpU`
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <li>
        <img src='${this.track && this.track.artwork_url ? this.track.artwork_url : ' https://picsum.photos/200/300/?random'}'
          alt='track artwork'>
      
        <div id='listItemContent'>
          <h3>${this.track ? this.track.title : 'Loading...'}</h3>
          <p id='username'>Posted by ${this.track ? this.track.user.username : 'Loading...'}</p>
          <p id='desc'>${this.track && this.track.description ? this.track.description : 'No description available'}</p>
      
          <div id='listItemButtons'>
            <button id='playButton' @click="${() => this.play()}">Play</button>
            <button id='faveButton'>Favorite</button>
          </div>
        </div>
      </li>
    `;
  }
}

window.customElements.define('track-item', TrackItem);
