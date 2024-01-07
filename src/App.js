import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizTable from "./components/QuizInfo/QuizTable/QuizTable";
import QuizHeader from "./components/QuizInfo/QuizHeader/QuizHeader";
import HomePage from "./components/HomePage/HomePage";
import SignInForm from "./components/UserInfo/SignInForm/SignInForm";
import MemberDashboard from "./components/UserInfo/MemberDashboard/MemberDashboard";
import { useState } from "react";
import SavedMemberQuiz from "./components/UserInfo/SavedMemberQuiz/SavedMemberQuiz";
import LogOut from "./components/UserInfo/LogOut";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTH } from "./gql/userRequest";
import CreateQuizTable from "./components/QuizInfo/CreateQuizTable/CreateQuizTable";
import SignUpForm from "./components/UserInfo/SignUpForm";
import { LoginProvider } from "./components/LogInContext/LoginContext";

function App() {
  const [loggedUser, setLoggedUser] = useState({
    email: "",
    isLoggedIn: false,
  });
  const [savedQuiz, setSavedQuiz] = useState({ notes: "", correct: null });

  const { error, data: token } = useQuery(GET_AUTH);

  useEffect(() => {
    if (!token || error) return;

    localStorage.setItem("jwToken", token.getAuth);
  }, [error, token]);

  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <QuizHeader />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/quiz_table" element={<QuizTable />}></Route>
            <Route
              exact
              path="/sign-in"
              element={<SignInForm setLoggedUser={setLoggedUser} />}
            ></Route>
            <Route
              exact
              path={"/sign-in/member_quizzes"}
              element={
                <MemberDashboard
                  loggedUser={loggedUser}
                  setSavedQuiz={setSavedQuiz}
                />
              }
            ></Route>
            <Route
              path="sign-in/quiz/:idandname"
              element={<SavedMemberQuiz savedQuiz={savedQuiz} />}
            />
            <Route
              exact
              path="/logout"
              element={<LogOut/>}
            />
            <Route exact path="/sign-in/create" element={<CreateQuizTable />} />
            <Route
              exact
              path="/sign-up"
              element={<SignUpForm setLoggedUser={setLoggedUser} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
