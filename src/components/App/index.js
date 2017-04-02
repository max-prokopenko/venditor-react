import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Fetching
import axios from 'axios'

//Material UI
import {Paper, Chip, Avatar, List, ListItem, Card, CardActions, CardHeader, CardMedia, AppBar, CardTitle, CardText, MenuItem, Drawer} from 'material-ui';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './App.css';

import {Container, Row, Col} from 'react-grid-system';
//redux
import { connect } from 'react-redux';
//import { startShift } from '../../actions/shiftAction';
import { bindActionCreators } from 'redux';
import store from '../../store'


function mapStateToProps(state) {
  return {
    //shift: state.shiftReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      //startShift: (a) => { dispatch(startShift(a)) }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  fetchClients() {
    axios.get('http://localhost:8000/api/v1/clients/')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle = () => this.setState({open: !this.state.open});

  componentDidMount() {
    this.fetchClients();
  }
  render() {
    console.log(this.state);
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    }); 
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div>
            <Drawer open={true}>
              <MenuItem>Companies</MenuItem>
              <MenuItem>My clients</MenuItem>
              <MenuItem>Bills</MenuItem>
            </Drawer>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);