import React from 'react'
import { useState } from 'react'
import First from './First'
import Second from './Second'
import Third from './Third'

const Form = () => {
    const [page, setPage] = useState(0)

    const PageDisplay = () => {
        if (page === 0) {
            return <First />
        } else if (page === 1){
            return <Second />
        }else{
            return <Third />
        }
      }

  return (
    <div>
        <div>
        {PageDisplay()}
        </div>
        <div className='text-center mt-2'>
        <button
        className='btn btn-outline-primary shadow-sm mr-3'
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Cancel
          </button>
          <button
          className="btn btn-primary shadow-sm"
            disabled={page === 2}
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default Form