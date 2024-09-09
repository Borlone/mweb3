export const USER_REJECT = 4001;
export const UNAUTHORIZED = 4100;
export const UNSUPPORTED_METHOD = 4200;
export const DISCONNECTED = 4900;
export const UNRECOGNIZED_CHAIN = 4902;

export const messageByCode: { [key: string]: string } = {
    [USER_REJECT]: 'The user rejected the request.',
    [UNAUTHORIZED]: 'The requested method and/or account has not been authorized by the user.',
    [UNSUPPORTED_METHOD]: 'The Provider does not support the requested method.',
    [DISCONNECTED]: 'The Provider is disconnected from all chains.',
    [UNRECOGNIZED_CHAIN]: 'The Provider is not connected to the requested chain.'
}

export const ERROR_CODE = {
    USER_REJECT,
    UNAUTHORIZED,
    UNSUPPORTED_METHOD,
    DISCONNECTED,
    UNRECOGNIZED_CHAIN
};