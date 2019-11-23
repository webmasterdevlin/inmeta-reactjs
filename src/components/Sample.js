import React, { Component } from 'react';

// export default function Sample() {
//     return (<div className="here">
//         <h1>1st!</h1>
//     </div>)
// }
// ES6 way
const Sample = ({ firstName, lastName }) => {
    return <h1>{firstName + ' ' + lastName}</h1>
}
export default Sample;
// class Sample extends Component {
//     render() {
//         return (<h1>3rd!</h1>)
//     }
// }
// export default Sample;