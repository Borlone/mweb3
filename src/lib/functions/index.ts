import { messageByCode } from "../constants/errors";

export function getMessageByCode(code: number) {
    return messageByCode[code] ?? 'The request failed, please try again!'
}