import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizButtonLayout from "../../QuizInfo/QuizButtonLayout/QuizButtonLayout";
import TimerToast from "../../QuizInfo/TimerToast/TimerToast";
import { useMutation } from "@apollo/client";
import {
  DELETE_QUIZ,
  GET_QUIZZES,
  UPSERT_QUIZ,
} from "../../../gql/userRequest";
export default function SavedMemberQuiz({ savedQuiz }) {
  const [activeQuiz, setActiveQuiz] = useState(savedQuiz.responses);
  const [grade, setGrade] = useState("0%");
  const [showGrade, setShowGrade] = useState(false);
  const [sendQuiz, setSendQuiz] = useState({
    userId: savedQuiz.userId,
    id: savedQuiz.id,
    responses: activeQuiz,
    name: savedQuiz.name,
  });
  const navigate = useNavigate();

  const [deleteButton, SetDeleteButton] = useState(false);
  const [savingQuiz] = useMutation(UPSERT_QUIZ, {
    variables: {
      input: {
        userId: savedQuiz.userId,
        name: savedQuiz.name,
        responses: activeQuiz,
        id: savedQuiz.id,
      },
    },
  });

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      navigate("/sign-in"); //no user email then leave
    }
  }, [savedQuiz, navigate]);

  const [deleteQuiz] = useMutation(DELETE_QUIZ, {
    variables: { input: sendQuiz },
    update: (cache, { data: { sendQuiz } }) => {
      const data = cache.readQuery({
        query: GET_QUIZZES,
        variables: { email: localStorage.getItem("email") },
      });

      const filteredQuiz = [...data.quizzes];
      const temp = filteredQuiz.filter((quiz) => quiz.id !== savedQuiz.id);

      cache.writeQuery({
        query: GET_QUIZZES,
        variables: { email: localStorage.getItem("email") },
        data: {
          quizzes: temp,
        },
      });
    },
  });


  const correctClick = (i) => {
    const temp = activeQuiz.map((item, index) => {
      if (index === i) {
        item = { ...item, correct: true };

        return item;
      } else {
        return item;
      }
    });

    setActiveQuiz(temp);
  };

  const addAnswerOnChange = (e, i) => {
    const temp = activeQuiz.map((item, index) => {
      if (index === i) {
        item = { ...item, notes: e.target.value };

        return item;
      } else {
        return item;
      }
    });

    setActiveQuiz(temp);
  };

  const wrongClick = (i) => {
    const temp = activeQuiz.map((item, index) => {
      if (index === i) {
        item = { ...item, correct: false };

        return item;
      } else {
        return item;
      }
    });

    setActiveQuiz(temp);
  };

  const calculateGrade = () => {
    let sum = 0;

    activeQuiz.forEach((item) => {
      if (item.correct) {
        sum++;
      }
    });

    return parseFloat((sum / activeQuiz.length) * 100).toFixed(2);
  };

  const updateQuiz = () => {
    savingQuiz()
      .catch((err) => console.log(err))
      .finally(() => navigate("/sign-in/member_quizzes"));
  };

  const submitChange = () => {
    setSendQuiz({
      userId: savedQuiz.userId,
      responses: activeQuiz,
      id: savedQuiz.id,
      name: savedQuiz.name,
    });

    //call  method with sendquiz in variable

    const grade = calculateGrade();
    setGrade(grade.toString() + "%");
    setShowGrade(true);
  };

  const clearAll = () => {
    const temp = activeQuiz.map((item) => {
      return { ...item, notes: "", correct: null };
    });
    setActiveQuiz(temp);
    setShowGrade(false);
    SetDeleteButton(true);
  };

  const deleteAll = () => {
    setSendQuiz({
      name: savedQuiz.name,
      id: savedQuiz.id,
      responses: activeQuiz,
      userId: localStorage.getItem("email"),
    });

    deleteQuiz().finally(() => navigate("/sign-in/member_quizzes"));
  };

  const onLeave = () => {
    clearAll();
    navigate("/sign-in/member_quizzes");
  };

  return (
    <>
      <div style={{ paddingTop: "100px", margin: "auto", width: "90%" }}>
        <TimerToast />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={3}>Your Answer</th>
              <th>Correct</th>
              <th>Incorrct</th>
            </tr>
          </thead>
          <tbody>
            {activeQuiz.map((item, index) => {
              return (
                <tr key={index} style={{ color: "green" }}>
                  <td>{index + 1}</td>
                  <td colSpan={3}>
                    <Form.Control
                      type="text"
                      value={item.notes}
                      aria-label="Your answer here"
                      onChange={(e) => addAnswerOnChange(e, index)}
                    ></Form.Control>
                  </td>
                  <td>
                    <Button
                      onClick={() => wrongClick(index)}
                      variant={
                        item.correct === false ? "danger" : "outline-danger"
                      }
                      size="lg"
                    >
                      Wrong
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => correctClick(index)}
                      variant={
                        item.correct === true ? "success" : "outline-success"
                      }
                      size="lg"
                    >
                      Right
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </Table>
        <QuizButtonLayout
          justLeaveName={"Return Dashboard"}
          cancelName={deleteButton ? "Delete" : "Clear All"}
          submitName={showGrade ? "Save Quiz" : "Grade Quiz"}
          onLeave={onLeave}
          onCancel={deleteButton ? deleteAll : clearAll}
          onSubmit={showGrade ? updateQuiz : submitChange}
          showGrade={showGrade}
          grade={grade}
        />
      </div>
    </>
  );
}
