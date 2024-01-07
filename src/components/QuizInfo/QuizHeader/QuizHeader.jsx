import check from "./check.svg"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/esm/Button";


export default function QuizHeader() {

    const currentWindow = window.location.pathname;


return (


    <Navbar style={{borderBottom: "10px black solid"}} data-bs-theme="light" fixed="top" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" style={{fontWeight: "bold"}}>
                    <img alt="logo" width="50" height="50" src={check} className="d-inline-block align top" />{' '}
                    Quiz Blank___

                </Navbar.Brand>
                <DropdownButton as={Button} variant="dark" data-bs-theme="dark" title="Navigate" 
               
                placement="end">
             {currentWindow !== "/" && ( <Dropdown.Item href="/">
                
               Home
              
              </Dropdown.Item> )}
             { currentWindow !== "/quiz_table" && ( <Dropdown.Item href="/quiz_table">
                Quick Quiz
              </Dropdown.Item>  )}

              { currentWindow !== "/sign-in" && (<Dropdown.Item href="/sign-in">Sign In</Dropdown.Item>)


              }
              <Dropdown.Item href="/sign-in/member_quizzes">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/logout">Log Out</Dropdown.Item>

                </DropdownButton>
            </Container>
        </Navbar>
)


}