import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { User } from "../models/User";

export default function SignUpPage() {
  const [user, setUser] = useState<User>({
    authenticated: false,
    name: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<User>({
    authenticated: false,
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister(event: ChangeEvent<HTMLFormElement>) {
    event?.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return response;
    } catch (error: any) {
      console.log("HERE", error.response.data.errors);
      const { errors } = error.response.data;
      setErrors(errors);
    }
  }

  return (
    <div className="container mt-5">
      <Form className="form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <Form.Group>
          <Form.Control
            isInvalid={!!errors?.name}
            name="name"
            onChange={handleChange}
            placeholder="name"
            type="text"
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            {errors?.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            isInvalid={!!errors?.email}
            name="email"
            onChange={handleChange}
            placeholder="email"
            type="email"
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            isInvalid={!!errors.password}
            name="password"
            onChange={handleChange}
            placeholder="password"
            type="password"
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password}
          </Form.Control.Feedback>
        </Form.Group>
        <button className="btn btn-outline-dark form-control mt-3">
          Sign Up
        </button>
      </Form>
    </div>
  );
}
