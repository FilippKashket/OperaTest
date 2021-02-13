import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import './right-table.css';
import WithErrorBoundary from '../error-boundary';

// function for create list items from array
const rendetItems = (array) => {

    const items = array.map((item)=>
        (<ListGroup.Item key={item.hash}>
            <ListGroup>
                <ListGroup.Item variant="primary">
                    <div id='from' className="My-div">
                        <span className="My-span">from: </span>
                        {item.from}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item variant="success">
                    <div className="My-div">
                        <span className="My-span">to: </span>
                        {item.to}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                    <div className="My-div">
                        <span className="My-span">hash: </span>
                        {item.hash}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </ListGroup.Item>)
    );
    return items;
};

// if there isn't any transoctions we show this element
const Dummy =()=>{
    return (<ListGroup.Item>
                <span className="My-span">No transactions</span>
            </ListGroup.Item>);
};

//Right colomn with transactions table
const RightTable = ({transactions=[], loading}) => {
    const tableItems = transactions.length===0?<Dummy/>:rendetItems(transactions); 
    return(
        <div>
            <h1>Transactions</h1>
            <div className="My-col">
                {loading?
                <Spinner animation="border" />:
                <ListGroup>
                    {tableItems}
                </ListGroup>}
            </div>
        </div>
    );
};

export default WithErrorBoundary(RightTable);