import {React, useState} from 'react';
import Button from '@mui/material/Button';

import {connect, signMessage} from './SolanaUtils';

export function SolanaVault(props) {
  const [disableButton, setDisableButton] = useState(false);

  const handleUnlockVault = (event) => {
    setDisableButton(true);

    let account = connect();
    account.catch(err => {
      console.log("Failed to connect to solana:", err);
      setDisableButton(false);
    });

    let signingMessage = getSigningMessage("Dummy Message");
    account.then(() => {
      signMessage(signingMessage).then(signature => {
        props.successCallback(signature.signature);
        setDisableButton(false);
      }).catch(err => {
        console.log("Failed to sign message:", err);
        setDisableButton(false);
      });
    });
  };

  return (
    <Button fullWidth disabled={disableButton} variant="contained" onClick={handleUnlockVault}>
      Unlock Solana Vault
    </Button>
  )
}

function getSigningMessage(masterPassword) {
  return masterPassword
}
