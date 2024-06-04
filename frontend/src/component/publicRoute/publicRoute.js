import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../../firebase/authContext";
import { Navigate } from "react-router";

export default function PublicRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Outlet
          {...rest}
          render={(props) => {
            return !currentUser ? (
              <Component {...props} />
            ) : (
              <Navigate to="/" />
            );
          }}
        ></Outlet>
      </div>
    </Container>
  );
}