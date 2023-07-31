import React, { useState } from 'react';

const withCounter = (OriginalComponent) => {
    // class NewComponent extends Component {
    //     state = {
    //         count: 0,
    //     };

    //     incrementCount = () => {
    //         this.setState((prevState) => ({ count: prevState.count + 1 }));
    //     };

    //     render() {
    //         const { count } = this.state;
    //         return <OriginalComponent count={count} incrementCount={this.incrementCount} />;
    //     }
    // }
    // return NewComponent;

    function NewComponent() {
        const [count, setCount] = useState(0);

        const incrementCount = () => {
            setCount(count + 1);
        };
        return (<OriginalComponent count={count} incrementCount={incrementCount}/>)
    }
    return NewComponent;
};
export default withCounter;