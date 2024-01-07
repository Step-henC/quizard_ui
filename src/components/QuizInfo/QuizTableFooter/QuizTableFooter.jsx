import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/esm/Button';


export default function QuizTableFooter() {



    return (
        <Stack direction="horizontal" gap={3}>
        <div className="p-2"><Button>Continue Without Timer</Button></div>
        <div className="p-2 ms-auto"><Button>Cancel</Button></div>
        <div className="p-2"><Button>Start Timer</Button></div>
      </Stack>
    )
}
