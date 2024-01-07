import Button from "react-bootstrap/esm/Button"
import Card from 'react-bootstrap/Card';
import cardIm from'./qui.jpg';
import signIn from './signin.jpg'
import Stack from "react-bootstrap/esm/Stack";
import { useNavigate } from 'react-router-dom';


export default function HomePage() {

  const navigate = useNavigate();

  const takeQuiz = (e) => {
    e.preventDefault();
    navigate("/quiz_table")
  }

  const sign_in = (e) => {
    e.preventDefault();
    navigate("/sign-in")
  }


    return (
     
      <Stack style={{paddingTop: "100px"}} direction="horizontal" gap={3}>
        <Card  className="m-auto" bg="dark" text="white" style={{  width: '18rem', textAlign: "center", margin: "0 auto"}}>
      <Card.Img style={{height: "200px"}} variant="top" src={cardIm} />
      <Card.Body>
        <Card.Title>Begin Quick Quiz</Card.Title>
        <Card.Text>
          Ready for a quick study session? Skip logging in and begin a quick quiz now. 
          This option is free, but your quizzes cannot be saved for future reference. 
        </Card.Text>
        <Button variant="light" onClick={(e) => takeQuiz(e)}>Start</Button>
      </Card.Body>
    </Card>
    <Card bg="dark" text="white" style={{  width: '18rem', textAlign: "center", margin: "0 auto"}}>
      <Card.Img style={{height: "200px"}} variant="top" src={signIn} />
      <Card.Body>
        <Card.Title>Unlock Member Benefits</Card.Title>
        <Card.Text>
          Ready to unlock your potential? Sign in and receive member benefits, such as saving quizzes,
          adding notes, and a timer for your quizzes.  
        </Card.Text>
        <Button variant="light" onClick={(e) => sign_in(e)}>Sign In</Button>
      </Card.Body>
    </Card>

 
      </Stack>

       
    )
}