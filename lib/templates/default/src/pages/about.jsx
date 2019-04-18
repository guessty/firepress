import React, { PureComponent } from 'react';
//
import Clickable from '@atoms/Clickable';
import Link from '@atoms/Link';
import Flex from '@atoms/Flex';

export default class extends PureComponent {
  render() {
    return (
      <Flex className="flex-around-8">
        <h1>About</h1>
        <hr />
        <p>
          Firestudio was created with the aim of providing a &quot;zero-config&quot; solution to
          developing web applications with ReactJS and hosting them on Google Firebase.
        </p>
        <Flex className="flex-between-12">
          <Flex className="flex-between-6">
            <h2>What&apos;s in the box?</h2>
            <Flex className="flex-between-4">
              <ol>
                <li>
                  <strong>Linting Support</strong>
                  - Linting is configured and ready to go.
                </li>
                <li>
                  <strong>Static Hosting</strong>
                  - See
                  <Clickable
                    href="/pre-rendering"
                    as={Link}
                    styledAs="a"
                    asNextLink
                  >
                    pre-rendering
                  </Clickable>
                </li>
                <li>
                  <strong>Cloud Functions</strong>
                  - Extend your app further by using Google Cloud Functions.
                </li>
                <li>
                  <strong>Unstated (Context API) State Management</strong>
                  - Simple and straight forward.
                </li>
              </ol>
            </Flex>
          </Flex>
          <Flex className="flex-between-6">
            <h2>Credit where credit is due</h2>
            <Flex className="flex-between-4">
              <p>
                At its core Firestudio is essentially a re-packaged NextJS application
                that has been configured to work with Googles Firebase platform.
              </p>
              <p>
                So big thanks go out to the teams behind NextJS and Firebase for
                creating such awesome products!
              </p>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
