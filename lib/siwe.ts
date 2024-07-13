export interface SIWEMessage {
  domain: string; // The domain that the message is intended for
  address: string; // The Ethereum address of the user
  statement?: string; // A human-readable ASCII assertion that the user will sign, and it is optional
  uri: string; // The URI of the RPC endpoint to use for Ethereum
  version: string; // The version of the message
  chainId: number; // The EIP-155 Chain ID to which the session is bound
  nonce: string; // A randomized token used to prevent replay attacks, at least 8 alphanumeric characters
  issuedAt: string; // The ISO 8601 datetime string of the current time
  expirationTime?: string; // The ISO 8601 datetime string after which the signed message is considered invalid
  notBefore?: string; // The ISO 8601 datetime string before which the signed message is considered invalid
  requestId?: string; // A unique identifier for the login session
  resources?: string[]; // An array of URIs for resources such as terms of service or privacy policy documents
}
