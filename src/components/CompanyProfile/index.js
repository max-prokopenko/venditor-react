import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';


//Timeline 
import {Timeline, TimelineEvent} from 'react-event-timeline'

//Material UI
import {Paper, Chip, Avatar, List, ListItem, Subheader, RaisedButton, MenuItem, Dialog, SelectField, FlatButton, TextField, CircularProgress} from 'material-ui';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './CompanyProfile.css';

import {Container, Row, Col} from 'react-grid-system';

//PDF
import jsPDF from 'jspdf';

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

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: '',
        businessId: ''
      },
      events: [],
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

  addEvent = () => {
    let that = this;
    let businessId = this.state.company.businessId;
    let title = this.state.event.title;
    let type = this.state.event.type;
    let info = this.state.event.info;
    axios.post('http://localhost:8000/api/v1/events', {
      businessId: businessId,
      title: title,
      type: type,
      info: info
    })
    .then(function (response) {
      console.log(response);
      that.setState({
        fetching: true
      });
      that.fetchEvents();
      //that.postSpot(response.data.last_insert_id);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.handleEventClose();
  }
  fetchInfo = () => {
    let that = this;
    axios.get('http://localhost:8000/api/v1/clients/' + this.props.params.id)
    .then(function (response) {
      let company = {
        name: response.data.clients.name,
        businessId: response.data.clients.businessId
      };
      that.setState({
        company: company
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  fetchEvents = () => {
    console.log("fetching events...");
    let that = this;
    axios.get('http://localhost:8000/api/v1/events/' + this.props.params.id)
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
      console.log(events);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  generateInvoice() {
    var doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
  }


  componentDidMount() {
    this.fetchInfo();
    this.fetchEvents();

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

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div id="app">
          <Container className="MainContainer">
              <Row>
                <Col sm={2} className="sideMenu">
                  <MenuItem className="sideMenuItem"><Link to="/home">My information </Link> </MenuItem>
                  <MenuItem className="sideMenuItem">Companies</MenuItem>
                  <MenuItem className="sideMenuItem">My clients</MenuItem>
                  <MenuItem className="sideMenuItem">Bills</MenuItem>
                </Col>
                <Col sm={6} className="centerColumn">
                  <Row>
                    <Col sm={12}>
                      <Paper zDepth={1} className="infoCard">
                          <h1>{this.state.company.name}</h1>
                          <h3>Y-tunnus: {this.state.company.businessId}</h3>
                          <p className="companyAddress">
                            Katu 1 <br />
                            00001 Kaupunki
                         </p>
                          <p className="companyInfo">
                            Yhtiö aloitti liiketoimintansa vuonna 1968 Espoossa nimellä Tietotehdas Oy. Alkuvuosina Tietotehdas toimi pääasiassa omistajiensa tietokonekeskuksena. Tietojärjestelmiä kehitettiin ja ylläpidettiin lähinnä Yhdyspankille ja sen asiakkaille sekä muutamalle metsäyhtiölle.
                         </p>
                          <RaisedButton label="Add event" className="addButton" primary={true} onTouchTap={this.handleEventOpen}/>
                          <RaisedButton label="Add new bill" className="addButton" primary={true} onTouchTap={this.handleBillOpen}/>
                      </Paper>
                    </Col>
                    <Col sm={12}>
                       <Paper zDepth={1} className="bills">
                          <List>
                            <Subheader>Latest bills</Subheader>
                            <ListItem primaryText="Lasku ei oo maksettu 1" />
                            <ListItem primaryText="Lasku ei oo maksettu 2" />
                            <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku ei oo maksettu 1" />
                            <ListItem primaryText="Lasku ei oo maksettu 2" />
                            <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku ei oo maksettu 1" />
                            <ListItem primaryText="Lasku ei oo maksettu 2" />
                            <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku ei oo maksettu 1" />
                            <ListItem primaryText="Lasku ei oo maksettu 2" />
                            <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku ei oo maksettu 1" />
                            <ListItem primaryText="Lasku ei oo maksettu 2" />
                            <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
                            <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
                          </List>
                        </Paper>
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
                    <p className="noEvents">No events with this company yet</p>
                  )}    
                   
                  </div>
              </Col>
            </Row>
          </Container>
          <Dialog
            title="Dialog With Actions"
            actions={actionsBill}
            modal={false}
            open={this.state.billOpen}
            onRequestClose={this.handleBillClose}
          >
            Bill modal
          </Dialog>
          <Dialog
            title="New event"
            actions={actionsEvent}
            modal={false}
            open={this.state.eventOpen}
            onRequestClose={this.handleEventClose}
          >
             <TextField
                hintText="Add title for new event"
                floatingLabelText="Title for event"
              /><br />
              <SelectField
                floatingLabelText="Type"
                value={this.state.event.type}
                onChange={this.handleChangeType}
              >
                <MenuItem value={1} primaryText="Email" />
                <MenuItem value={2} primaryText="Phone call" />
                <MenuItem value={3} primaryText="Bill" />
                <MenuItem value={4} primaryText="Meeting" />
              </SelectField>
              <TextField
                hintText="Information about new event"
                floatingLabelText="Information"
                multiLine={true}
                fullWidth={true}
                rows={1}
              /><br />
         </Dialog>
         {this.state.fetching && <CircularProgress size={60} thickness={7} className="loading"/>}
      </div>
    </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);