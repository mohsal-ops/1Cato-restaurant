import { cache as reactCache } from "react"
import { unstable_cache as nextCache } from "next/cache"


type Callback  = (...arg: any[])=>Promise <any>
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false, tags?: string[] } = {}
) {
  return nextCache(cb, keyParts, options)
}
