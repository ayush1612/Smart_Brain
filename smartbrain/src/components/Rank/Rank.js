import React from 'react';

const Rank=({name,entries}) =>{
    return(
        <div>
            <h1>{`${name} , your current rank is...`}</h1>
            <div className='white f1 '>
            {entries}
            </div>
        </div>
    )
}

export default Rank;