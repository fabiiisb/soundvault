import { respMsg } from '../respMsg'

export function dbError (err, pool) {
  if (pool === undefined) {
    return respMsg('Unexpected error', true, 500)
  } else {
    return respMsg(err.message, true, 409)
  }
}
