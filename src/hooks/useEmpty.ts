import { useMemo } from 'react'

export default function <T>(data?: T[], page: number = 1, query?: string, other?: string) {
  const isEmpty = useMemo(
    () => (!data || data.length == 0) && page === 1 && !query && !other,
    [data, page, query, other]
  )
  const isSearchEmpty = useMemo(
    () => (!data || data.length == 0) && (!!query || !!other),
    [data, query, other]
  )

  return { isEmpty, isSearchEmpty }
}
