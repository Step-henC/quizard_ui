import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GET_QUIZZES, UPSERT_QUIZ } from "../../../gql/userRequest";

export default function SaveQuizAsNameModal({ sendQuiz, inputAnswers }) {
  const [showModal, setShowModal] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [dateForId, setDateForId] = useState(""); //had to make client side id to write accurate data to cache
  const navigate = useNavigate();
  const [res, setRes] = useState(sendQuiz.responses || [])

  const [savingQuiz] = useMutation(UPSERT_QUIZ, {
    variables: {
      input: { userId: localStorage.getItem("email"), responses: inputAnswers, name: quizName, id: dateForId },
    },

    update: (cache, { data: { sendQuiz } }) => {
      const data = cache.readQuery({
        query: GET_QUIZZES,
        variables: { email: localStorage.getItem("email") },
      });

      cache.writeQuery({
        query: GET_QUIZZES,
        variables: { email: localStorage.getItem("email") },
        data: {
          quizzes: [
            {
              userId: localStorage.getItem("email"),
              responses: inputAnswers,
              name: quizName,
              __typename: "SavedQuiz",
              id: dateForId,
            },
            ...data.quizzes,
          ],
        },
      });
    },
    onCompleted: () => navigate("/sign-in/member_quizzes"),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    setDateForId(formatDate());
  }, [sendQuiz]);

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      //if no user reroute to sign in
      navigate("/sign-in");
    }
  }, [sendQuiz, navigate]);

  const onSubmit = () => {

    console.log(sendQuiz)
    console.log(dateForId)
   
    savingQuiz()
    
      .catch((err) => console.log(err))
      .then(() => console.log("done"));
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
    navigate("/sign-in/member_quizzes")
  };

  const formatDate = (date = new Date()) => {
    let year, month, day, hours, minutes, seconds, milliseconds;

    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    milliseconds = date.getMilliseconds();

    month = month.toString().padStart(2, 0);
    day = day.toString().padStart(2, 0);
    hours = hours.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    seconds = seconds.toString().padStart(2, 0);
    milliseconds = milliseconds.toString().padStart(2, 0);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={showModal}
      onHide={() => navigate("/sign-in/member_quizzes")}
    >
      <Modal.Header closeButton="true">
        <h4>Save as...</h4>
      </Modal.Header>
      <Modal.Body>
        <Stack>
          <InputGroup>
            <Form.Control
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="name this quiz..."
            ></Form.Control>
          </InputGroup>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Stack style={{ width: "100%" }} direction="horizontal" gap={3}>
          <Button
            onClick={onCancel}
            variant="outline-danger"
            className="p-2 ms-auto"
          >
            Forget Quiz
          </Button>
          <Button onClick={onSubmit} variant="dark" className="p-2">
            Save Quiz
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
