import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import Stack from 'react-bootstrap/esm/Stack';
import { QUESTIONS_MAX } from '../../utils/questions';
import SearchableDropdown from '../../UserInfo/SearchableDropdown/SearchableDropdown';
import Button from 'react-bootstrap/esm/Button';


export default function StartModal({setQuizLength}) {


    const[ showModal, setShowModal] = useState(true);

    const [value, setValue] = useState("Select question amount...");
    const navigate = useNavigate();

    const onSubmit = () => {

      if (!value || isNaN(parseInt(value))) {

        setQuizLength(1);
        setShowModal(false)
      } else {


        setQuizLength(parseInt(value.split(" ")[0]));
        setShowModal(false)

      }


    }

    const onCancel =() => {

        setShowModal(false)
    }

    

    const onLeave =() => {

      setShowModal(false)
      navigate("/");


    }
    return (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          show={showModal}
          onHide={() => navigate("/")}
     >
       <Modal.Header closeButton="true">
       <h4>Begin Quiz</h4>
       </Modal.Header>
       <Modal.Body>
        <Stack>
            <SearchableDropdown 
            options={QUESTIONS_MAX}
            label="name"
            selectedVal={value}
            handleChange={(val) => setValue(val)}
            />
        </Stack>
        
         
       </Modal.Body>
       <Modal.Footer > 
       <Stack style={{width: "100%"}} direction="horizontal" gap={3}>
            <Button onClick={onLeave}  variant="outline-dark" className="p-2">Back Home</Button>
            <Button onClick={onCancel} variant="outline-danger" className="p-2 ms-auto">Quiz Anyway</Button>
            <Button onClick={onSubmit} variant="dark" className="p-2">Start Quiz</Button> 
        </Stack>
  
       </Modal.Footer>
     </Modal>
    )
}