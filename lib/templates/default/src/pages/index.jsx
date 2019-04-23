import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
import Clickable from '@atoms/Clickable';
import Link from '@atoms/Link';
import Flex from '@atoms/Flex';

export default class extends PureComponent {
  render() {
    return (
      <Flex className="flex-around-8">
        <Flex className="flex-between-2">
          <h1>Firestudio</h1>
          <strong>
            Get ready to play with fire!
            <FontAwesomeIcon icon={['far', 'grin-tongue-squint']} />
          </strong>
        </Flex>
        <hr />
        <h2>Develop and host web apps without the configuration.</h2>
        <Clickable
          href="/about"
          as={Link}
          styledAs="a"
          asNextLink
        >
          Find out more!
        </Clickable>
      </Flex>
    );
  }
}