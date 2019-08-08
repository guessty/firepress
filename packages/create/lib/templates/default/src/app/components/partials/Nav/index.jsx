import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Flex, Clickable, Container, Hr,
} from '@firepress/ui';
//
import firebase from '@config/firebase';
import Drawer from '@elements/Drawer';
import SignInButton from '@elements/SignInButton';

export default class Nav extends PureComponent {
  state = {
    isReady: false,
  }

  unregisterAuthObserver = null

  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(() => {
      this.setState({
        isReady: true,
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  static renderLink(to, text, options) {
    return (
      <Drawer.Trigger
        target="menu"
        render={({ toggleDialog }) => (
          <Clickable
            {...options}
            href={to}
            as="a"
            className="flex h-full items-center mx-4 hover:text-blue-600"
            onClick={toggleDialog}
          >
            {text}
          </Clickable>
        )}
      />
    );
  }

  renderSignOutButton() {
    const { isReady } = this.state;

    if (!isReady) {
      return null;
    }

    return firebase.auth().currentUser && (
      <Flex className="flex-grow gap-between-6">
        <Hr />
        <Drawer.Trigger
          target="menu"
          render={({ toggleDialog }) => (
            <Clickable
              styledAs="a"
              className="flex h-full items-center mx-4 hover:text-blue-600"
              onClick={() => {
                toggleDialog();
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </Clickable>
          )}
        />
      </Flex>
    );
  }

  render() {
    return (
      <nav className="nav h-20 bg-white text-black font-medium border-b">
        <Container className="flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Clickable
              href="/"
              as="a"
              styledAs="none"
              className="flex h-full items-center text-2xl font-bold mr-4"
            >
              Firepress
            </Clickable>
            <div className="flex-grow" />
            <div className="flex h-full items-center">
              <SignInButton />
            </div>
            <div className="flex h-full items-center">
              <div className="block border-r border-black w-1 h-10" />
            </div>
            <Drawer.Trigger
              target="menu"
              render={({ toggleDialog }) => (
                <Clickable
                  className="flex h-full text-black hover:text-gray-500 p-0"
                  onClick={toggleDialog}
                >
                  <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
                </Clickable>
              )}
            />
          </Flex>
        </Container>
        <Drawer
          name="menu"
        >
          <Drawer.Trigger
            target="menu"
            render={({ toggleDialog }) => (
              <Clickable
                className="absolute top-0 right-0 w-20 h-20 p-0 hover:text-gray-500"
                onClick={toggleDialog}
              >
                <FontAwesomeIcon icon={['fas', 'times']} size="2x" />
              </Clickable>
            )}
          />
          <Flex className="flex-grow gap-between-6">
            <Hr />
            {Nav.renderLink('/', 'Home')}
            {Nav.renderLink('https://firepress.gitbook.io/documentation/', 'Documentation', {
              isExternal: true,
              target: '_blank',
            })}
            {this.renderSignOutButton()}
          </Flex>
        </Drawer>
      </nav>
    );
  }
}
