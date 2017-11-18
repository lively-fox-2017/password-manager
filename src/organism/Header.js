import React, { Component } from 'react';
import logo from '../logo.svg';
import { Hero, Title, Container, SubTitle, Image } from 'reactbulma';

class Header extends Component {
  render() {
    return (
      <Hero primary bold>
        <Hero.Head>
        <Title>
        <img width="80" src={logo}/>
          Password Keeper
        </Title>

        </Hero.Head>

        <Hero.Foot>
        <SubTitle>
          'You shall not pass'
        </SubTitle>
        </Hero.Foot>
      </Hero>
    )
  }
}

export default Header;
