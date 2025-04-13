const enum AuthenticationType {
  Bearer = 'Bearer',
  ApiKey = 'ApiKey',
  Session = 'Session',
  None = 'None',
}

const enum AuthenticationEncoding {
  Base64 = 'base64',
  Ascii = 'ascii',
}

export { AuthenticationType, AuthenticationEncoding };
