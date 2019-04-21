import { compose } from 'recompose';
import { withData } from 'spunky';

import claimableActions from 'shared/actions/claimableActions';
import currencyActions from 'settings/actions/currencyActions';
import authActions from 'auth/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import { withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';

import Management from './Management';
import balanceWithPricesActions from '../../actions/balanceWithPricesActions';

const mapAuthDataToProps = (auth) => ({ auth });

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(currencyActions, mapCurrencyDataToProps),
  withNetworkData(),
  withInitialCall(claimableActions, ({ net, address }) => ({ net, address })),
  withInitialCall(balanceWithPricesActions, ({ currency, net, address }) => ({
    currency,
    net,
    address
  })),

  withLoadingProp(claimableActions),
  withLoadingProp(balanceWithPricesActions),
  withErrorToast()
)(Management);
