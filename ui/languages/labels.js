var STRINGS = {};
var LANG = "ENG";

var LABELS = (function() {
  'use strict';

  function setLabels()
  {
    $( "#AppTitle").html( STRINGS[LANG].AppTitle );

    $( "#AmReceiverLabel").html( STRINGS[LANG].AmReceiverLabel );
    $( "#AmSenderLabel").html( STRINGS[LANG].AmSenderLabel );
    $( "#CheckIncomingLabel").html( STRINGS[LANG].CheckIncomingLabel );

    $( "#BackLabel1").html( STRINGS[LANG].BackLabel );
    $( "#BackLabel2").html( STRINGS[LANG].BackLabel );
    $( "#BackLabel3").html( STRINGS[LANG].BackLabel );

    $( "#GenSpendKeyLabel").html( STRINGS[LANG].GenSpendKeyLabel );
    $( "#StealthKeyLabel").html( STRINGS[LANG].StealthKeyLabel );
    $( "#RootSpendKeySaveLabel").html( STRINGS[LANG].RootSpendKeySaveLabel );
    $( "#StealthAddressLabel").html( STRINGS[LANG].StealthAddressLabel );
    $( "#StealthAddrShareLabel").html( STRINGS[LANG].StealthAddrShareLabel );

    $( "#RxStealthMetaAddressLabel" )
      .html( STRINGS[LANG].RxStealthMetaAddressLabel )
    $( "#EnterReceiverStealthAddrLabel" )
      .html( STRINGS[LANG].EnterReceiverStealthAddrLabel )
    $( "#GenerateEphKeyLabel" ).html( STRINGS[LANG].GenerateEphKeyLabel )
    $( "#EphPublicKeyLabel" ).html( STRINGS[LANG].EphPublicKeyLabel )
    $( "#PostEphPubkeyLabel" ).html( STRINGS[LANG].PostEphPubkeyLabel )
    $( "#AssetAddressLabel" ).html( STRINGS[LANG].AssetAddressLabel )
    $( "#SendFundsToLabel" ).html( STRINGS[LANG].SendFundsToLabel )

    $( "#ScanRxRootSpendKeyLabel" ).html( STRINGS[LANG].StealthKeyLabel )
    $( "#EnterYourRootSpendKeyLabel" )
      .html( STRINGS[LANG].EnterYourRootSpendKeyLabel )
    $( "#EphKeyRegistryLabel" ).html( STRINGS[LANG].EphKeyRegistryLabel )
    $( "#EnterEphKeyRegSCALabel" ).html( STRINGS[LANG].EnterEphKeyRegSCALabel )
    $( "#StartScanDateLabel" ).html( STRINGS[LANG].StartScanDateLabel )
    $( "#EnterScanStartLabel" ).html( STRINGS[LANG].EnterScanStartLabel )
    $( "#ScanForPaymentsLabel" ).html( STRINGS[LANG].ScanForPaymentsLabel )
    $( "#ScanResultsLabel" ).html( STRINGS[LANG].ScanResultsLabel )

    $( "#RequestHelp").html( STRINGS[LANG].RequestHelp );
    $( "#RequestInfo").html( STRINGS[LANG].RequestInfo );
    $( "#RequestSafety").html( STRINGS[LANG].RequestSafety );
  }

  return {
    setLabels:setLabels
  };

})();
