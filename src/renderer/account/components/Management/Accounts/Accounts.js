import React from 'react';
import { objectOf, string } from 'prop-types';
import { map } from 'lodash';

import instanceShape from 'shared/shapes/instanceShape';

import Account from '../Account';
import styles from './Accounts.scss';

export default class Accounts extends React.PureComponent {
  static propTypes = {
    encryptedMnemonic: string.isRequired,
    instances: objectOf(instanceShape).isRequired, // TODO remove instanceShape
    secretWord: string.isRequired
  };

  render() {
    const { encryptedMnemonic, instances, secretWord } = this.props;

    return (
      <div className={styles.accounts}>
        <div className={styles.heading}>
          <div className={styles.title}>My Account</div>
          <div className={styles.link} role="button" tabIndex={0} onClick={this.handleAddAccount}>
            New Address
          </div>
        </div>
        <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
        <div>
          <div className={styles.subtitle}>Accounts generated from Keychain</div>
          {map(instances, (instance) => (
            <Account
              instance={instance}
              key={`${instance.type}-${instance.index}`}
              secretWord={secretWord}
            />
          ))}
        </div>
      </div>
    );
  }

  handleAddAccount = () => {
    this.props.addAccount({ chainType: 'ETH' });
  };
}