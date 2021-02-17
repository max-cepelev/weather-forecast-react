import React, {Component} from 'react';

export default class CityItem extends Component {
    onClick = () => {
        const {onSelect, city} = this.props;
        onSelect(city);
        localStorage.setItem('cityId', city.id);
    }
    render() {
        const {city, isSelected} = this.props;
        return (
            <li
                onClick={this.onClick}
                key={city.id}
                className={`list-item ${
                    isSelected ? 'is-selected' : ''}`}>
                    {city.name}
            </li>);
    }
}