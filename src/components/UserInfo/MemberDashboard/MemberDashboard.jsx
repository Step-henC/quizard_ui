import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/esm/Form";
import MemberPaginate from "../MemberPaginate/MemberPaginate";
import { GET_QUIZZES } from "../../../gql/userRequest";
import {
  useState,
  useEffect,
  //useContext
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
//import { LoginContext } from '../../LogInContext/LoginContext';

export default function MemberDashboard({ setSavedQuiz }) {
  const [quizFromDB, setQuizFromDB] = useState([]);
  const [currentQuizzes, setCurrentQuizzes] = useState([]);

  // const {login} = useContext(LoginContext) //not used since it does not persist like localstorage
  //however, it does work, just not on reload
  //need redux or indexDB or store in apollo cache

  const { error: quizErr, data: quizData } = useQuery(GET_QUIZZES, {
    variables: { email: localStorage.getItem("email") },
  });

  const navigate = useNavigate();


  useEffect(() => {
    if (!quizData) return;

    if (!quizErr) {
      setQuizFromDB(quizData.quizzes);
    }
  }, [quizData, quizErr]);

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      //if no user, return to sign-in
      navigate("/sign-in");
    }
  }, [quizFromDB, navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 9;

  const lastQuizIndex = currentPage * quizzesPerPage;
  const firstQuizIndex = lastQuizIndex - quizzesPerPage;

  useEffect(() => {
    setCurrentQuizzes(quizFromDB.slice(firstQuizIndex, lastQuizIndex));
  }, [lastQuizIndex, firstQuizIndex, quizFromDB]);

  const resumeQuiz = (index) => {
    const quizToResume = currentQuizzes[index];

    setSavedQuiz(quizToResume)
    
    const idandname = `${quizToResume.id.split(" ").at(0)}#${quizToResume.name}`;

    navigate(`/sign-in/quiz/${idandname}`); //replaced useHistory
  };

  const onChangeSearch = (e) => {
    const temp = currentQuizzes.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value) ||
        item.responses.some((elem) =>
          elem.notes.toLowerCase().includes(e.target.value)
        )
    );

    setCurrentQuizzes(
      e.target.value === ""
        ? quizFromDB.slice(firstQuizIndex, lastQuizIndex)
        : temp
    );
  };

  return (
    <Container fluid="md" style={{ paddingTop: "100px", textAlign: "center" }}>
      <Row style={{ paddingBottom: "20px" }}>
        <Col>
          <Button variant="dark" onClick={() => navigate("/sign-in/create")}>
            Create Quiz
          </Button>
        </Col>
        <Col xs={6} md={4}>
          <>
            <Form.Control
              onChange={onChangeSearch}
              placeholder={"Search..."}
            ></Form.Control>
          </>
        </Col>
        <Col></Col>
      </Row>
      <Row xs={2} md={3} lg={true}>
        {currentQuizzes.length !== 0 ? (
          currentQuizzes.map((quiz, index) => (
            <Col>
              {" "}
              <Card
                bg="dark"
                key={index}
                text="white"
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Header>{quiz.id.split(" ").at(0)}</Card.Header>
                <Card.Body>
                  <Card.Title> {quiz.name}</Card.Title>
                  <Button
                    onClick={() => resumeQuiz(index)}
                    variant="light"
                    text="dark"
                  >
                    Return to Quiz
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>There are currently no quizzes</p>
        )}
      </Row>
      <Row>
        <MemberPaginate
          totalQuizzes={quizFromDB.length}
          quizzesPerPage={quizzesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Row>
    </Container>
  );
}
