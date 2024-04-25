import React, { Component } from 'react';

class Card extends Component {
    render(){
        return (
            <div className="card" style={{width: '18rem', textAlign: 'center'}}>
                <img src={this.props.card.immagine} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.card.nome}</h5>
                    <p className="card-text">{this.props.card.livello}</p>
                </div>
            </div>
        );
    }
}

export default Card;