import React, { Fragment } from 'react';
//import ReactModal from 'react-modal';

import Header from './Header';
import Action from './Action';
import Options from './Options.jsx';
import AddOption from './AddOption';
import OptionModal from './OptionModal';
import CustomModal from './CustomModal';


class IndecisionApp extends React.Component {
  state = {
      options: this.props.options,
      error: undefined,
      selectedOption: undefined,
      isActiveModal: false,
      isMod: false,
    };
  handleSubmit = (e) => {
    e.preventDefault();
    
    const text = e.target.elements.option.value.trim();
    
    if(!text) {
      this.setState(prevState => ({ error: 'Enter a valid value to add item' }));
      e.target.elements.option.value = '';
      return;
    }
    else if(this.state.options.find(option => option.toLowerCase() === text.toLowerCase() )) {
      return this.setState(prevState => ({ error: `Option '${text}' already exist` }));
    }
    
    this.setState(prevState => ({
      options: [...prevState.options, text],
      error: undefined,
    }));
   
    e.target.elements.option.value = '';
  };
  
  handleRemoveAll = (e) => {
    
    this.setState(prevState => ({ isActiveModal: true })); 
  };
  makeDecision = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    if(this.state.options.length) {
      const option = this.state.options[randomNum];
      
      this.setState(prevState => ({ 
      isMod: true,
      selectedOption: option,
      error: undefined,
      })); 
    }
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove),
      error: undefined,
    }))
  };
  handleSelectedOption = () => {
    this.setState(() => ({selectedOption: undefined}))
  };
  no = () => {
    this.setState(() => ({isActiveModal: false}))
  }
  okay = () => {
    this.setState(() => ({isMod: false}))
  }
  yes = () => {
    this.setState(() => ({
      isActiveModal: false,
      options: [], 
      error: undefined,
      }));
  }
  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      if(options && options.length > 0) {
      this.setState(prevState => ({ options }))
    }
    }
    catch(e) {}
  }
  componentWillUnmount(prevProps, prevState) {
    console.log('componentWillUnmount');
  }
  componentDidUpdate(prevProps, prevState) {
    const jsonOptions = JSON.stringify(this.state.options);
    if(prevState.options.length !== this.state.options.length) {
      window.localStorage.setItem('options', jsonOptions);
    }
  }
  render() {
    const subTitle = 'Put your life in the hands of a computer';
    
    return (
      <Fragment>
        { this.state.isActiveModal && (<CustomModal 
        no={this.no}
        yes={this.yes}
        />) }
        
        {this.state.isMod && <OptionModal 
        okay={this.okay}
        selectedOption={this.state.selectedOption}
        handleSelectedOption={this.handleSelectedOption}
         />}
         
        <Header
          subTitle = {subTitle}
        />
        <div className='container'>
        
          <Action 
          optionLength = 
          {this.state.options.length}
           makeDecision = {this.makeDecision} 
          />
          <div className='widget'>
            <Options 
              options = {this.state.options} 
              handleRemoveAll = {this.handleRemoveAll}
              handleDeleteOption = {this.handleDeleteOption} 
            />
            
          </div>
        </div>
        <AddOption 
              handleSubmit = {this.handleSubmit}
              error = {this.state.error}
              options = {this.state.options}
            />
      </Fragment>
    );
  }
};

IndecisionApp.defaultProps = {
  options: [
    'Recite the book of Allaah',
    'Keep coding',
    'Visit a shopping mall'
  ],
};

export default IndecisionApp;