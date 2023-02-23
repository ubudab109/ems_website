import React from 'react'

const CardLeft = () => {
  return (
    <div className="col-xl-3">
    <div className="card mb-3 p-3">
      <div className="text-center">
        <img
          className="rounded-circle mb-4"
          style={{ width: "100px", height: "100px" }}
          src="https://via.placeholder.com/150"
          alt=""
        />
        <p style={{ color:"#00617F" }} size={15}><b>Clone Strome Burmeh Sugiono</b></p>
        <p>Manager</p>
        <p>ID 45645645</p>
      </div>
    </div>
    <div className="card mb-3 p-3">
      <div class="d-grid gap-2">
        <button class="btn btn-link" type="button">
          General
        </button>
        <button class="btn btn-link" type="button">
          Attendance
        </button>
        <button class="btn btn-link" type="button">
          Time Management
        </button>
        <button class="btn btn-link" type="button">
          Finance
        </button>
        <button class="btn btn-link" type="button">
          Warning Letter
        </button>
      </div>
    </div>
  </div>
  )
}

export default CardLeft