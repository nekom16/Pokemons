import { LitElement, html, css } from 'lit-element';
import './components/GetData';

class TodoView extends LitElement {

  static get properties() {
      return {
          wiki: {type:String},
      }
    }

  static get styles() {
    return css`
      .card-content {
        display: inline-flex;
      }
      .card {
        width: 300px;
      }
    `;
  }

  constructor() {
    super();

    this.wiki = [];

    this.addEventListener('ApiData', (e) => {
      this._dataFormat(e.detail.data);
      console.log(e.detail.data);
    });
  }

_dataFormat(data) {
    let pokemons = [];

    data.forEach((pokemon) => {
      pokemons.push({
        img: pokemon.image,
        name: pokemon.name,
        type: pokemon.type,
      });
    });
    console.log('hole');
    this.wiki = pokemons;
    console.log(this.wiki);
  }

  render() {
    
    return html`
      <get-data url="http://localhost:3002/pokemon" method="GET"></get-data>
      ${this.paintPokemon}
    `;
  }

  updated(changedProps) {
    console.log(changedProps);
    console.log('ejecuta changedProps');
  }

  get paintPokemon() {
    console.log('entra raro', this.wiki);
    return html`
        ${this.wiki.map(pokemon => html`
          <div class='card-content'>
            <div class='card' @click="${this._handleClick}">
              <h3 label="Nombre">${ pokemon.name }</h3>
              <img width="100px" src="./images/${ pokemon.img }">
              <p label="Tipo">${ pokemon.type }</p>
            </div>
          </div>
        `)}
    `;
  }

  _handleClick(e) {
    console.log('but');
  }
}

customElements.define('todo-view', TodoView);
