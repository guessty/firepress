import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
import Link from 'next-spa/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//

export default () => (
  <Flex gutter="2rem">
    <Flex gutter="0.5rem">
      <h1>Firestudio</h1>
      <strong>Get ready to play with fire! <FontAwesomeIcon icon={['far', 'grin-tongue-squint']} /></strong>
    </Flex>
    <hr />
    <h2>Develop and host web apps without the configuration.</h2>
    <Link to="/about"><a>Find out more!</a></Link>
  </Flex>
)
