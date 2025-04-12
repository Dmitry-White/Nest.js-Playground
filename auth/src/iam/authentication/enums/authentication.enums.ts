const enum AuthenticationType {
  Bearer = 'Bearer',
  ApiKey = 'ApiKey',
  None = 'None',
}

const enum AuthenticationEncoding {
  Base64 = 'base64',
  Ascii = 'ascii',
}

export { AuthenticationType, AuthenticationEncoding };
