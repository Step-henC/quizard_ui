import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizButtonLayout from '../QuizButtonLayout/QuizButtonLayout';
import TimerToast from '../TimerToast/TimerToast';
import StartModal from '../StartModal/StartModal';

export default function QuizTable() {

    
const [quizLength, setQuizLength] = useState(1);
const [inputAnswers, setInputAnswers] = useState(JSON.parse(localStorage.getItem("answ")) || Array(quizLength).fill({input: "", correct: null}));

const [isDisabled, setIsDisabled] = useState(true);

const [grade, setGrade] = useState("0%");
const [showGrade, setShowGrade] = useState(false);


const navigate = useNavigate();


useEffect(() => {
    setIsDisabled(inputAnswers.some((elem) => elem.input === ""))
}, [inputAnswers, quizLength])


useEffect(() => {

    localStorage.setItem("answ", JSON.stringify(inputAnswers))
}, [inputAnswers])


useEffect(() => {
    setInputAnswers(Array(quizLength).fill({input: "", correct: null}))
}, [quizLength])

const addAnswerOnChange = (e, i) => {
    const temp = inputAnswers.map((item, index) => {

            if (index === i) {
                item = {...item, input: e.target.value}
                
                return  item
                
            } else {
                return item
            }
         } )

   
    setInputAnswers(temp)
    
   
   
}

const correctClick = (i) => {

    const temp = inputAnswers.map((item, index) => {

        if (index === i) {

          item = {...item, correct: true}
           
            return item 
        } else {
            return item
        }

    })

    setInputAnswers(temp)
}

const wrongClick = (i) => {
    const temp = inputAnswers.map((item, index) => {

        if (index === i) {
            item = {...item, correct: false}
            
            return item
        } else {
            return item
        }

    })

    setInputAnswers(temp)

}
 
const clearAll = () => {

    const temp = inputAnswers.map((item) => {

      return  {...item, input: "", correct: null}

    }
        
    )

   

    setInputAnswers(temp)

    setShowGrade(false)
}

const onLeave = () => {

    clearAll();
    navigate("/");
}

const calculateGrade = () => {

    let sum = 0; 

    inputAnswers.forEach((item) => {
        if (item.correct) {
        
            sum++;
        }
    })
    
  return parseFloat((sum/inputAnswers.length) * 100).toFixed(2);

}
const submitChange = () => {


    const grade = calculateGrade();
    setGrade(grade.toString() + "%");
    setShowGrade(true);
}
 


    return (
        
        <>
       <StartModal setQuizLength={setQuizLength} />
  
        <div style={{paddingTop: "100px", margin: "auto", width:"90%"}}>
         <TimerToast /> 
    
        <Table striped bordered hover>
                <thead>
                    <tr >
                        <th>#</th>
                        <th colSpan={3}>Your Answer</th>
                        <th>Correct</th>
                        <th>Incorrct</th>
                    </tr>
                </thead>
                <tbody>
                    {inputAnswers.map((item, index) => {

                        return (
                            <tr style={{color: "green"}} >
                                <td>{index + 1}</td>
                                <td colSpan={3}><Form.Control type="text"
                                    value={item.input}
                                    aria-label="Your answer here"
                                    onChange={(e) => addAnswerOnChange(e, index)}></Form.Control></td>
                                                                <td><Button disabled={isDisabled} onClick={() => wrongClick(index)} variant={item.correct === false ? "danger" : "outline-danger"} size="lg">Wrong</Button></td>
                                <td><Button onClick={() => correctClick(index)} disabled={isDisabled} variant={item.correct === true ? "success" : "outline-success"} size="lg">Right</Button></td>

                            </tr>
                            );

                    })}

                </tbody>
                <tfoot>

                </tfoot>
            </Table>
            <QuizButtonLayout 
          justLeaveName={"Back Home"} 
          cancelName={"Clear All"} 
          submitName={"Grade Quiz"} 
          onLeave={onLeave} 
          onCancel={clearAll} 
          onSubmit={submitChange}
          showGrade={showGrade}
          grade={grade}
          />

            </div>
           
        </>
    )
}