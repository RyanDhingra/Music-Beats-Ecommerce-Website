import React, { Component } from "react";
import { MenuItems } from "./MenuItems"
import './index.css'
import Logo from "../../assets/yunginzLogo.png"
import { Link } from 'react-scroll'

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="nav-items">
                <img className="logo-img" src={Logo} alt="Yunginz"/>
                <h5 className="beats-by">BEATS BY</h5>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times fa-xl" : "fas fa-bars fa-xl"}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index} className="hover-link">
                                <Link className={item.cName} to={item.url} spy={true} smooth={true} offset={item.offset} duration={500}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar