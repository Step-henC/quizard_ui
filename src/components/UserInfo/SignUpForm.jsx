import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../utils/pattern";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../gql/userRequest";

export default function SignUpForm({ setLoggedUser }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const [showUserExists, setShowUserExists] = useState(false);

  const [createUser, { data: userResult }] = useMutation(CREATE_USER, {
    variables: { input: { email: userEmail, password: userPass } },
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (
      userEmail !== "" &&
      userEmail.match(EMAIL_PATTERN) &&
      userPass !== "" &&
      userPass.match(PASSWORD_PATTERN)
    ) {
      e.preventDefault();
      e.stopPropagation();

      createUser()
        .catch((err) => console.log(err))
        .then(() => {
          if (userResult.createUser.email === "User exists") {
            setShowUserExists(true);
          } else {
            localStorage.setItem("email", userResult.createUser.email); //insert email verification system here for another day
            navigate("/sign-in");
          }
        });
    } else {
      e.preventDefault();
      e.stopPropagation();
      setUserEmail("");
      setUserPass("");
      setShowInvalidCredentials(true);
    }
  };
  return (
    <div
      style={{
        textAlign: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%",
      }}
    >
      <ToastContainer className="p-2">
        <Toast
          bg="danger"
          show={showInvalidCredentials}
          onClose={() => setShowInvalidCredentials(false)}
        >
          <Toast.Header>
            <strong className="me-auto">Invalid Credentials</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>
            The Email or Password Entered is Invalid
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer style={{ top: "-35%" }} className="p-2">
        <Toast
          bg="danger"
          show={showUserExists}
          onClose={() => setShowUserExists(false)}
        >
          <Toast.Header>
            <strong className="me-auto">User Exists</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>
            Email exists. Please choose orignal email or{" "}
            <a href="/sign-in"> sign in</a>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <h2>Sign Up</h2>

      <Form style={{ paddingTop: "100px" }} noValidate>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column>Email Address</Form.Label>

          <Col>
            <InputGroup hasValidation>
              <Form.Control
                isInvalid={userEmail !== "" && !userEmail.match(EMAIL_PATTERN)}
                isValid={userEmail.match(EMAIL_PATTERN)}
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                maxLength={50}
                type="text"
                placeholder="We will not share your email..."
                required
              />

              <Form.Control.Feedback type="invalid">
                Please Enter A Valid Email
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column>Password</Form.Label>

          <Col>
            <Form.Control
              isInvalid={userPass !== "" && !userPass.match(PASSWORD_PATTERN)}
              isValid={userPass.match(PASSWORD_PATTERN)}
              onChange={(e) => setUserPass(e.target.value)}
              value={userPass}
              maxLength={50}
              type="password"
              placeholder="Enter Password"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please Enter Valid Password with at least:
              <ul>
                <li>minimum 8 characters</li>
                <li>one upper case letter</li>
                <li>one lower case letter</li>
                <li>one number</li>
                <li>one special character</li>
              </ul>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{ padding: "50px 0px 50px 0px" }}>
          <Col>
            <Button
              variant="dark"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <p>
              Have an account? If not, then <a href="/sign-in">sign up!</a>{" "}
            </p>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
