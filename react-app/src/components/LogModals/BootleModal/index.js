import React from "react";


const BottleModal = ({type}) => {

    return (
        <form>
            <label htmlFor='amount' type='number'>Amount</label>
            <input id='amount'></input>
            <label htmlFor='oz'>Oz</label>
            <input type='checkbox' id='oz'/>
            <label htmlFor='ml'>Ml</label>
            <input type='checkbox' id='ml' />
            <button>save</button>
        </form>
    )
}

export default BottleModal