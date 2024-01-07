import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";

export default function QuizButtonLayout({
    justLeaveName, 
    cancelName, 
    submitName,
    onLeave, 
    onCancel,
    onSubmit,
    showGrade,
    grade

}) {

    return (

        <Stack style={{width: "100%"}} direction="horizontal" gap={3}>
            <Button onClick={onLeave}  variant="outline-dark" className="p-2">{justLeaveName}</Button>
           {showGrade && ( <div className="p-2 m-auto"><h5>Your Grade: {grade}</h5></div> )}
            <Button onClick={onCancel} variant="outline-danger" className="p-2 ms-auto">{cancelName}</Button>
            <Button onClick={onSubmit} variant="dark" className="p-2">{submitName}</Button> 
        </Stack>
    )
}