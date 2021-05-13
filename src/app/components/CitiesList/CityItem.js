import React, {Component} from 'react';

export default class CityItem extends Component {
    onClick = () => {
        const {onSelect, city} = this.props;
        onSelect(city);
    }
    render() {
        const {city, isSelected, onDelete} = this.props;
        return (
            <li
                key={city.id}
                className={`list-item ${isSelected ? 'is-selected' : ''}`}>
                    <p onClick={this.onClick}>{city.name}</p>
                    <div className="list-delete" onClick={onDelete}><img src="icons/delete.svg" alt="delete"/></div>
            </li>
        );
    }
}