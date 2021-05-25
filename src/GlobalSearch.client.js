import {useCallback, useEffect, useState} from 'react'
import {useLocation} from './LocationContext.client'

export default function GlobalSearch() {
  const {onChange, text} = useGlobalSearch()

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={text}
        onChange={onChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  )
}

const useGlobalSearch = () => {
  const [text, setText] = useState('')
  const [, setLocation] = useLocation()
  const onChange = useCallback(e => setText(e.target.value), [])

  useEffect(() => {
    setLocation({searchText: text})
  }, [text])

  return {text, onChange}
}
