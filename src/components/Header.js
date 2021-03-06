import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import MediaQuery from 'react-responsive'
import ClickOutside from 'react-click-outside'
import Link from 'gatsby-link'

import BreakPoints from './BreakPoints'

import Logo from './Logo'

import ChangeLanguage from './i18n/ChangeLanguage'

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  background: transparent;
  transition: 0.35s;
  ${BreakPoints({
    padding: ['15px 0', '25px 0', '25px 0'],
  })};
  z-index: 2;
`

const HeaderContainer = styled.div`
  margin-left: ${props => (props.isMobile ? '0' : '5rem')};
  margin-right: ${props => (props.isMobile ? '0' : '5rem')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderLink = styled(Link).attrs({
  activeStyle: {
    color: props => props.color || '#7e7e7e',
  },
})`
  font-size: ${props => props.fontSize || '1rem'};
  text-decoration: none;
  margin: 10px;
  color: ${props => props.color || '#7e7e7e'};

  &:hover {
    text-decoration: underline;
  }

  transition: 0.25s;
`

const MenuDialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  top: 55px;
  padding-bottom: 20px;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  background-color: #fff;
`

const MenuIcon = () => (
  <svg fill="#9d1c1c" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

const MenuIconClose = () => (
  <svg fill="#9d1c1c" width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const Language = styled.span`
  margin: 0 5px;
`

const SelectLanguages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectedLanguage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectedLanguageDot = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: 4px;
  background-color: #942d1d;
`

const Header = ({ header, setMenuOpened, isMenuOpened, languages, language, location }) => (
  <ClickOutside onClickOutside={() => setMenuOpened(false)}>
    <MediaQuery query="(min-device-width: 1224px)">
      <HeaderWrapper>
        <HeaderContainer>
          <Logo language={language} />
          <HeaderLinkWrapper>
            <HeaderLink to={`/${language}/#projects`}>{header.projs}</HeaderLink>
            <HeaderLink to={`/${language}/about`}>{header.about}</HeaderLink>
            <HeaderLink to={`/${language}/#contact`}>{header.contact}</HeaderLink>
            <SelectLanguages>
              {languages.map((lng, index) => (
                <ChangeLanguage key={lng} to={lng} location={location}>
                  {lng === language ? (
                    <SelectedLanguage>
                      <SelectedLanguageDot />
                      <Language>{lng}</Language>
                    </SelectedLanguage>
                  ) : (
                    <Language>{lng}</Language>
                  )}
                  {index !== languages.length - 1 && ` / `}
                </ChangeLanguage>
              ))}
            </SelectLanguages>
          </HeaderLinkWrapper>
        </HeaderContainer>
      </HeaderWrapper>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <HeaderWrapper
        style={{
          backgroundColor: '#fff',
          margin: 0,
        }}
      >
        <HeaderContainer isMobile>
          {isMenuOpened ? <div /> : <Logo />}
          <button onClick={evt => setMenuOpened()}>{isMenuOpened ? <MenuIconClose /> : <MenuIcon />}</button>
        </HeaderContainer>
      </HeaderWrapper>
      {isMenuOpened && (
        <MenuDialog>
          <HeaderLink fontSize="1.5rem" to={`/${language}/#projects`} onClick={evt => setMenuOpened()}>
            {header.projs}
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" to={`/${language}/about`} onClick={evt => setMenuOpened()}>
            {header.about}
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" to={`/${language}/#contact`} onClick={evt => setMenuOpened()}>
            {header.contact}
          </HeaderLink>
          <br />
          <br />
          <Logo />
        </MenuDialog>
      )}
    </MediaQuery>
  </ClickOutside>
)

Header.propTypes = {
  header: PropTypes.shape({
    projs: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }),
  isMenuOpened: PropTypes.bool,
  setMenuOpened: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired),
  language: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

export default compose(
  withStateHandlers(
    { isMenuOpened: false },
    {
      setMenuOpened: ({ isMenuOpened }) => (newState = !isMenuOpened) => ({
        isMenuOpened: newState,
      }),
    },
  ),
)(Header)
