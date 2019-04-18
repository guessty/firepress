import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
import Clickable from '@atoms/Clickable';
import Link from '@atoms/Link';
import Flex from '@atoms/Flex';
//

const Footer = () => (
  <footer className="h-full bg-blue-darker text-white">
    <div className="container mx-auto h-full px-8">
      <Flex className="flex-around-8 justify-center items-center">
        <Clickable
          href="/"
          as={Link}
          styledAs="none"
          isFlat
          prefetch
          asNextLink
          className="flex h-full items-center uppercase text-white font-bold mr-4"
        >
          <span className="mr-4 text-blue"><FontAwesomeIcon icon={['far', 'grin-tongue-squint']} /></span>
          <span>
            FireStudio
          </span>
        </Clickable>
      </Flex>
    </div>
  </footer>
);

export default Footer;
