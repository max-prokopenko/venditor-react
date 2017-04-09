import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';


//Timeline 
import {Timeline, TimelineEvent} from 'react-event-timeline'

//Material UI
import {Paper, Chip, Avatar, List, ListItem, Subheader, RaisedButton, MenuItem, Dialog, SelectField, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton, TextField, CircularProgress} from 'material-ui';

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

//Icons
import Textsms from 'material-ui/svg-icons/communication/textsms';
import More from 'material-ui/svg-icons/navigation/more-horiz';
import Paid from 'material-ui/svg-icons/action/done';
import Sent from 'material-ui/svg-icons/communication/present-to-all';
import Add from 'material-ui/svg-icons/content/add-circle';

//Fetching
import axios from 'axios'


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
      company: {
        name: '',
        businessId: ''
      },
      events: [],
      clients: [],
      billOpen: false,
      eventOpen: false,
      event: {
        title: 'title',
        type: 'email',
        info: 'testInfo',                
      },
      fetching: true

    };
  }

  //Bill Modal
  handleBillOpen = () => {
    this.setState({billOpen: true});
  };

  handleBillClose = () => {
    this.setState({billOpen: false});
  };

  //Event Modal
  handleEventOpen = () => {
    this.setState({eventOpen: true});
  };
  
  handleEventClose = () => {
    this.setState({eventOpen: false});
  };

  handleChangeType = (event, index, value) => {
    let event_base = this.state.event;
    event_base.type = value;
    this.setState({
      event: event_base
    });
  }

  fetchInfo = () => {
    let that = this;
    axios.get('http://localhost:8000/api/v1/clients/12345-6')
    .then(function (response) {
      let company = {
        name: response.data.clients.name,
        businessId: response.data.clients.businessId
      };
      that.setState({
        company: company
      });
      console.log(that.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetchClients = () => {
    let that = this;
    let clients = [];

    axios.get('http://localhost:8000/api/v1/clients/')
    .then(function (response) {
      console.log(response);
      for (var i = response.data.clients.length - 1 ; i >= 0 ; i--) {
        console.log(response.data.clients);
        clients[i] =  {
          name: response.data.clients[i].name,
          businessId: response.data.clients[i].businessId
        };
        console.log(clients[i]); 
      }
      that.setState({
        clients: clients
      });
      console.log(that.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetchEvents = () => {
    console.log("fetching events...");
    let that = this;
    axios.get('http://localhost:8000/api/v1/events')
    .then(function (response) {
      console.log(response.data);

      let events = [];
      for (var i = response.data.events.length - 1 ; i >= 0 ; i--) {
        events[i] =  {
          client_id: response.data.events[i].client_id,
          created_at: response.data.events[i].created_at,
          title: response.data.events[i].title,
          type: response.data.events[i].type,
          info: response.data.events[i].info
        };
      }
      that.setState({
        events: events,
        fetching: false
      });
      console.log(that.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  clientClick(id) {
    browserHistory.push('/client/' + id);
  }

  componentDidMount() {
    this.fetchInfo();
    this.fetchEvents();
    this.fetchClients();
    //this.generateInvoice();
  }


  render() {
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    }); 
    const actionsBill = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleBillClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleBillClose}
      />,
    ];
    const actionsEvent = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleEventClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addEvent}
      />,
    ];

    const events = this.state.events.map((event, index) =>
      <TimelineEvent title={event.title}
        createdAt={event.created_at}
        iconColor={"#005C97"}
        icon={<Textsms className='timelineIcon' />}
        key={index}
      >
           {event.info}
      </TimelineEvent>
    );
    const clients = this.state.clients.map((client) =>
      <TableRow hoverable={true} key={client.businessId} onTouchTap={(e) => {e.preventDefault(); this.clientClick(client.businessId)}}>
        <TableRowColumn>{client.businessId}</TableRowColumn>
        <TableRowColumn>{client.name}</TableRowColumn>
        <TableRowColumn>In Progress</TableRowColumn>
      </TableRow>
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div id="app">
          <Container className="MainContainer">
              <Row>
                <Col sm={2} className="sideMenu">
                  <MenuItem className="sideMenuItem">My information</MenuItem>
                  <MenuItem className="sideMenuItem">Companies</MenuItem>
                  <Link to="/client/12345-6"><MenuItem className="sideMenuItem">My clients</MenuItem></Link>
                  <MenuItem className="sideMenuItem">Bills</MenuItem>
                </Col>
                <Col sm={6} className="centerColumn">
                  <Row>
                    <Col sm={12}>
                      <Paper zDepth={1} className="infoCard">
                         <Row>
                           <Col sm={6}>
                              <p className="inputHeader">Company name</p>
                              <h3>                              
                                  <TextField
                                    id="companyName"
                                    value={this.state.company.name}
                                  /><br />
                              </h3>
                              <p className="inputHeader">Y-tunnus:</p>
                              <h3>                              
                                  <TextField
                                    id="companyBisId"
                                    value={this.state.company.businessId}
                                  /><br />
                              </h3>
                          </Col>
                          <Col sm={6}>
                                <p className="inputHeader">Address</p>
                                <h3>
                                  <TextField
                                      id="companyAddress"
                                      value="Katu 1 
                                      00001 Kaupunki"
                                  /><br />
                                </h3>                                    
                                <p className="inputHeader">Phone</p>
                                <h3>
                                  <TextField
                                      id="companyPhone"
                                      value="0401223654"
                                  /><br />
                                </h3>                                
                          </Col>
                        </Row>
                          <p className="companyInfo">
                            Yhtiö aloitti liiketoimintansa vuonna 1968 Espoossa nimellä Tietotehdas Oy. Alkuvuosina Tietotehdas toimi pääasiassa omistajiensa tietokonekeskuksena. Tietojärjestelmiä kehitettiin ja ylläpidettiin lähinnä Yhdyspankille ja sen asiakkaille sekä muutamalle metsäyhtiölle.
                         </p>
                          <RaisedButton label="Add event" className="addButton" primary={true} onTouchTap={this.handleEventOpen}/>
                          <RaisedButton label="Add new bill" className="addButton" primary={true} onTouchTap={this.handleBillOpen}/>
                      </Paper>
                    </Col> 
                    <Col sm={12} className="clientsCol">
                       <Table >
                        <TableHeader>
                          <TableRow>
                            <TableHeaderColumn>Y-tunnus</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clients}
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4} className="timelineCol">
                  <div className="timeline"> 
                  {this.state.events.length > 0 ? (
                    <Timeline className="timeline">
                      {events}
                   </Timeline> 
                  ) : (
                    "No events yet"
                  )}    
                                         
                 </div>
               </Col>
            </Row>
          </Container>
     
         {this.state.fetching && <CircularProgress size={60} thickness={7} className="loading"/>}
      </div>
    </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);