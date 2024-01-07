import { useQuery } from "@apollo/client";
import "./style.css"
import {useNavigate} from "react-router-dom";



export default function MemberPaginate({
                                        totalQuizzes,
                                        quizzesPerPage,
                                        setCurrentPage,
                                        currentPage}) {

   

    const navigate = useNavigate();
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalQuizzes/quizzesPerPage); i++) {

        pages.push(i);

    }

    

    const firstArrow = () => {

        if (currentPage === 1) {


            navigate("/")
        } else {
            console.log("hey")

            setCurrentPage(currentPage -1);


        }

    }

    

    return (

       
            <div className="pagination">

              <button onClick={firstArrow}>&laquo;</button>

            {
                   pages.map((page, index) => 
                   
                   <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : ""}> {page}</button>
                   )


            }
             
             <button onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>


            </div>



       

    )
}