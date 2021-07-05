import React from "react"
import { Card} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, } from "react-router-dom"

export default function Dashboard() {
  const { currentUser } = useAuth()

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-success w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/update-preferances" className="btn btn-success w-100 mt-3">
            Update Preferances
          </Link>
        </Card.Body>
      </Card>
      
    </>
  )
}
