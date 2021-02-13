import {useCallback, useEffect, useState} from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

import LeftTable from '../left-table';
import RightTable from '../right-table';
import ErrorHeader from '../error-header';

import getBlockByNumber from '../../services/etherium-api';

// Hook for getting data from server
const useRequest = (request) => {

  // initial satate
  const [dataState, setDataState] = useState({
     block: {transactions:[]},
     error: {isError:false, message:""},
     last: true,
     loading : true
   });

  // when our block number change
  useEffect(()=>{
    let canceled = false
    setDataState({
      block: {transactions:[]},
      error: {isError:false, message:""},
      last: true,
      loading : true
    });

    //call request for getting data
    request().then(
      (res) => {if(!canceled) {
                                                          //if it didn't canceled check that there is result
                                                          if ('result' in res){
                                                              // if there is result but it is null, we got nothing
                                                              if(res.result) {
                                                                          setDataState({
                                                                            block: res.result,
                                                                            error: {isError:false, message: ''},
                                                                            loading: false  
                                                                          })
                                                      

                                                                          }
                                                              else setDataState({
                                                                block: {transactions:[]},
                                                                error:{isError:true, message: 'Nothing was founded!'},
                                                                loading: false}
                                                                )
                                                          //if there isn't result we got error
                                                          }else setDataState({
                                                                            block: {transactions:[]},
                                                                            error:{isError:true, message: res.error.message},
                                                                            loading: false});
                              }
                                                          
                })
                                                      // it is error of function "request"
                                                      .catch(error =>
                                                        setDataState({
                                                          block: {transactions:[]},
                                                          error:{isError:true, message: error },
                                                          loading: false}) 
                                                      );
    //we shpuld return it for track cancellation
    return ()=> canceled =true;  
  }, [request]);
  // return what we set
  return dataState;
};

// Hook fot calling previouse Hook
const useBlock = (number) => {
  // we should make new function and get data inly if number was changed
  const request = useCallback((() => getBlockByNumber(number)), [number]);
  // use our hook
  return useRequest(request);
};

function App() {
  //current block, we will pass it to exact component below
  const [block_number, setBlockNumber] = useState('latest');

  //get data
  const {block, error, loading} = useBlock(block_number);

  //main page has two colomns and header for errors
  return (
    
      <Jumbotron id='app'>
        <Container fluid>
          {error.isError?
                          <ErrorHeader message={error.message}/>
                          :undefined
                          }
          <Row>
            <Col><LeftTable {...block} setBlockNumber={setBlockNumber} loading={loading}/></Col>
            <Col><RightTable {...block} loading={loading}/></Col>
          </Row>
        </Container>
      
      </Jumbotron>
    
  );
}

export default App;
