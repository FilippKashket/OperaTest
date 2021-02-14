import React, {useState, useRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Warning from '../warning';
import {existNumber} from '../../services/etherium-api';
import WithErrorBoundary from '../error-boundary';

import './left-table.css';

const useNext = (number) => {
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    const next_number = '0x'+(+number+1).toString(16);
    existNumber(next_number).then(({result})=> result?setIsNext(true):setIsNext(false));
  }, [number]);
  return isNext;
};

//function for creating fields on form
const FormItems = ({label, value}) => {

  return (<Form.Group as={Row}>
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col>
        <Form.Control id={label.toLowerCase()} type="text" readOnly defaultValue={value} />
      </Col>          
  </Form.Group>);

};

const InputBlock = ({currentNumber, onChangeNumber, target}) =>{
  return (<Form.Group as={Row} controlId="formBlockNumber">
          <Col sm="10">
            <Form.Control type="text" placeholder="Number of block" value={currentNumber} onChange={({target})=>onChangeNumber(target.value)} ref={target}/>
          </Col>
          <Button variant="primary" type="submit">Check</Button>
        </Form.Group>)
};

const NumberBlock = ({swithcNumber, number, disabled }) => {
  
 return (
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Number
            </Form.Label>
            <Col sm="1">
                <Button variant="outline-primary" onClick={()=>swithcNumber(number,-1)}><i className='fa fa-chevron-left' ></i></Button>
            </Col> 
            <Col sm="8" >
            <Form.Control type="text" readOnly defaultValue={number} id="number"/>
            </Col> 
            <Col sm="1">
              <Button variant="outline-primary" onClick={()=>swithcNumber(number,1)} disabled={disabled}><i className='fa fa-chevron-right'></i></Button> 
              </Col>      
          </Form.Group>
          )
};

// Left part of main page
const LeftTable = (props) => {
    // get data from main component
    const {number, hash, setBlockNumber, loading} = props;
    // set tanplate for current number in the input field
    const [currentNumber, setCurrentNumber] = useState("0x");

    // it is for validation error
    const [invalidValidation, setValidationError] = useState({show:false,message:""});
    //this constracions needs for Overlay which hides in Warning 
    const target = useRef();

    const isNext = useNext(number);

    //function for validation value in the input field
    const onChangeNumber = (value) => {
      if(value.length < 2) {
        return;
      } 
      const result = /^0[xX][0-9a-f]*$/.test(value)

      if (!result) {
        setValidationError({show:true,message:"Plesae, use only 0123456789abcdef"});
        return;}
      else {
        setValidationError({show:false,message:""});} 

      setCurrentNumber(value);
    };

    const swithcNumber = (value, shift)=>{
      const new_number_str ='0x'+(+value +shift).toString(16);
      setBlockNumber(new_number_str); 
    };

    // there are form with three filds and button submit
    // if value incorrect we show warning 
    return (
        <div>
            <h1>Current block</h1>
            <Form onSubmit={(ev)=>{
                            ev.preventDefault();
                            setBlockNumber(currentNumber);
                        }}>
              <InputBlock onChangeNumber={onChangeNumber} currentNumber={currentNumber} target={target} /> 
              
              <Warning target ={target} message ={invalidValidation.message} show={invalidValidation.show}/>
              {loading?
                <Spinner animation="border" />:
                <div>
                  <NumberBlock swithcNumber={swithcNumber} number={number} disabled ={!isNext}/>
                  <FormItems label="Hash" value={hash}/>
                </div>
              }
            </Form>
        </div>
    );
};

export default WithErrorBoundary(LeftTable);  