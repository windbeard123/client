import { createActions } from 'spunky';

import { getDeviceInfo, getPublicKey } from '../util/NEO/NeoLedger';

export const ID = 'ledger';

export default createActions(ID, () => async () => {
  const deviceInfo = await getDeviceInfo();
  const publicKey = await getPublicKey();

  return { publicKey, deviceInfo };
});
