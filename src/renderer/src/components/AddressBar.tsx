import React from 'react'

const AddressBar = ({
  url,
  setUrl
}: {
  url: string
  setUrl: (url: string) => void
}): JSX.Element => {
  return (
    <nav className="navbar bg-primary text-white p-2 border-bottom-dark sticky-top" id="drag">
      <div className="container">
        <input
          type="text"
          className="form-control border-primary shadow-sm"
          id="no-drag"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </nav>
  )
}

export default AddressBar