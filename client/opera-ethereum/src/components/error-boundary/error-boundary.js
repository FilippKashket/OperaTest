import React, {Component} from 'react';

// Class for catching errors in renders elements
class ErrorBoundary extends Component {
    
    state = { error: null, errorInfo: null };
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
 
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }


  // Make hight order componemt. It is convinient for wrap our elements
  const WithErrorBoundary = (ChildComponent)=>{
      return((props)=>
          <ErrorBoundary>
              <ChildComponent {...props}/>
          </ErrorBoundary>
      )
  };

  export default WithErrorBoundary;