var STRINGS = {};

STRINGS["ENG"] = {

  AppTitle:"Ξthereum Stealth Payments",

  CopiedOk:"Copied to clipboard.",

  AmReceiverLabel:
    ": Create a new stealth meta-address to <b>receive</b> stealth payments.",
  AmSenderLabel:
    ": Calculate the values required to <b>send</b> a stealth payment.",
  CheckIncomingLabel:
    ": Scan the Ethereum blockchain for incoming stealth payments.",

  BackLabel:": Click to return to start.",
  GenSpendKeyLabel:
    "Step 1. Click to generate a new random key.",
  StealthKeyLabel:"Receiver's Root Spending Key (m):",
  RootSpendKeySaveLabel:
    "Step 2. Save this for later and keep it <font color=red>private</font>!",
  StealthAddressLabel:"Receiver's Stealth Meta-Address (M):",
  StealthAddrShareLabel:
    "Step 3. <font color=green>Publish</font> this.",
  RxSaveStealthKeyWarning:
     "Please confirm you saved the Root Spending Key and "
   + "Stealth Meta-Address.\n\n"
   + "You cannot retrieve your payments without the Root Spending Key.\n\n"
   + "Senders need the Stealth Meta-Address to derive the Asset Address "
   + "from which you will be able to retrieve payment.",

  RxStealthMetaAddressLabel:"Receiver's Stealth Meta-Address (M):",
  EnterReceiverStealthAddrLabel:
    "Step 1: Enter this. The receiver must publicize it first.",
  GenerateEphKeyLabel:"Step 2: Click to calculate (R) and (A).",
  EphPublicKeyLabel:"Ephemeral Public Key (R):",
  PostEphPubkeyLabel:"Step 3: Publish this in any "
  + "<a href='https://etherscan.io/address/0xadd556918186b073eb51fea466e742f53f3defe5#code'>Ephemeral Public Key Registry</a>.",
  AssetAddressLabel:"Asset Address (A):",
  SendFundsToLabel:"Step 4: Send stealth payment(s) to this address.",
  SenderRWarning:
      "Please confirm you want to discard the calculations of (R) and (A).\n\n"
    + "If you send funds to Asset Address (A) and fail to post (R) then the "
    + "receiver cannot notice or retrieve payment and the funds will "
    + "be trapped.",

  NeedRxStealthMetaAddr:
      "Receiver's Stealth Meta-Address M is required first. It "
    + "must be '02' or '03' followed by 64 hex characters.",

  EnterYourRootSpendKeyLabel:
    "Step 1. Enter the key generated when making your Stealth Meta-Address.",
  EphKeyRegistryLabel: "Ephemeral Key Registry (SCA):",
  EnterEphKeyRegSCALabel:"This app was built to use this public registry.",
  StartScanDateLabel:"Scan Start Date (UTC):",
  EnterScanStartLabel:
    "Step 3. Optional. Change the search start. Default is one month ago.",
  ScanForPaymentsLabel:
      ": Step 4. Click to scan our registry for incoming "
    + "stealth payments.",
  ScanResultsLabel:"Results of Scan:",
  InvalidRootSpendKey:"Invalid Root Spend Key, should be 64 hex chars.",

  RequestInfo:"Info",
  RequestHelp:"Help",
  RequestSafety:"Safety",

  GeneralInfo:
    "This is an implementation of "
  + "'An incomplete guide to stealth addresses'"
  + "by V. Buterin, 2023 Jan 20, "
  + "https://vitalik.eth.limo/general/2023/01/20/stealth.html\n\n"
  + "This app includes free/open-source software components produced by "
  + "this and other authors.",

  GeneralHelp:
    "The stealth payment process:\n\n"
  + "a. Someone wanting to receive payments generates a Root Spending Key.\n\n"
  + "b. The receiver uses this key to generate a Stealth Meta-Address.\n\n"
  + "c. The receiver publicizes this Stealth Meta-Address somehow.\n\n"
  + "d. A sender learns the receiver's Stealth Meta-Address somehow.\n\n"
  + "e. The sender combines the receiver's Stealth Meta-Address with a new "
  +     "random key to produce an Ephemeral Public Key.\n\n"
  + "f. The sender posts this Ephemeral Public Key via some well-known public "
  +     "service called an Ephemeral Public Key Registry.\n\n"
  + "g. The sender derives an Asset Address by combining the Ephemeral Public "
  +     "Key and the receiver's Stealth Meta-Address.\n\n"
  + "h. The sender sends funds to this Asset Address. Sender is done.\n\n"
  + "i. Some time later the receiver scans the Ephemeral Public Key Registry "
  +     "to check for incoming payments.\n\n"
  + "j. The receiver combines the Root Spending Key from (a) with every "
  +     "Ephemeral Public Key in the registry to derive an Asset Address.\n\n"
  + "k. The receiver checks the balance of each Asset Address.\n\n"
  + "l. If any Asset Address has funds, the receiver uses the Root Spending "
  +     "Key and Ephemeral Public Key to calculate the Asset Spending Key.\n\n"
  + "m. The receiver uses this Asset Spending Key to move value from the Asset "
  +     "Address to somewhere else.",

  GeneralSafety:
      "General safety checklist for using this webapp:\n\n"
    + "a. Confirm the computer o/s and programs are free of malware.\n\n"
    + "b. Confirm the web browser was installed from a legitimate source, "
    +     "is latest version and has no plugins/extensions spying on you.\n\n"
    + "c. Confirm no camera is watching your screen and/or keyboard.\n\n"
    + "d. Confirm there are no superusers logged in remotely.\n\n"
    + "e. Clear the clipboard after doing any copy/paste operations.\n\n"
    + "f. Confirm you have a secure way of saving the keys and addresses "
    +     "created by this webapp.\n\n"
    + "g. If printing, confirm the printer is hardwired, not networked.\n\n"
    + "h. Post Ethereum transactions anonymously.\n\n"
    + "i. Run your own Ethereum full node rather than using some gateway.\n\n"
    + "j. Risk very small amounts at first.\n\n"
    + "k. Read V. Buterin's paper explaining this technique.\n\n"
    + "l. Read this app's source code to confirm it is not malicious.\n\n"
    + "m. Clear your browser's history and cache.\n\n"
    + "o. For best stealth, wait and then move the funds from the Asset "
    +     "Address to an address other than your own, e.g. shapeshifter."
};

