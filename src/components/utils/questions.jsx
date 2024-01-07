
export const QUESTIONS_MAX = Array.from(new Array(101), (_, index) => {

            if (index === 1) {

                return {id: index, name: `${index} Question`}
            } else {

                return {id: index, name: `${index} Questions`};

            }
            
   
}).filter((item) => item.id !== 0);