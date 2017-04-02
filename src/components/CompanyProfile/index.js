import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Timeline 
import {Timeline, TimelineEvent} from 'react-event-timeline'

//Material UI
import {Paper, Chip, Avatar, List, ListItem, Subheader, RaisedButton} from 'material-ui';

//styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import allroundersBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import  './CompanyProfile.css';

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

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: '',
        businessId: ''
      },
      events: []
    };
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
    let that = this;
    axios.get('http://localhost:8000/api/v1/events/' + this.props.params.id)
    .then(function (response) {

      let events = [];
      for (var i = 0; i < response.data.events.length; i++) {
        events[i] =  {
          type: response.data.events[i].type,
          info: response.data.events[i].info
        };
      }
      that.setState({
        events: events
      });
      console.log(events);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.fetchInfo();
    this.fetchEvents();
  }
  render() {
    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    }); 
    const events = this.state.events.map((event, index) =>
      <TimelineEvent title="DB test"
        createdAt="2016-09-12 10:06 PM"
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
            <Paper zDepth={1} className="infoCard">
                <h1>{this.state.company.name}</h1>
                <h3>Y-tunnus: {this.state.company.businessId}</h3>
                <p className="companyInfo">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum est eu risus mattis dapibus. 
                  In pulvinar dolor quis nibh euismod, a bibendum nisi congue. Duis convallis tempor sem eget hendrerit. 
               </p>
               <p className="companyInfo">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum est eu risus mattis dapibus. 
                  In pulvinar dolor quis nibh euismod, a bibendum nisi congue. Duis convallis tempor sem eget hendrerit. 
               </p>
               <p className="companyInfo">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum est eu risus mattis dapibus. 
                  In pulvinar dolor quis nibh euismod, a bibendum nisi congue. Duis convallis tempor sem eget hendrerit. 
               </p>
                <RaisedButton label="Add event" className="addButton" primary={true}/>
                <RaisedButton label="Add new bill" className="addButton" primary={true}/>
            </Paper>
            <div className="timeline">
            
              <Timeline>
                 {events}
             </Timeline>
             
          </div>
          <Paper zDepth={1} className="bills">
            <List>
              <Subheader>Latest bills</Subheader>
              <ListItem primaryText="Lasku ei oo maksettu 1" />
              <ListItem primaryText="Lasku ei oo maksettu 2" />
              <ListItem primaryText="Lasku maksettu 3" rightIcon={<Paid color="green"/>} />
              <ListItem primaryText="Lasku maksettu 4" rightIcon={<Paid color="green"/>} />
            </List>
          </Paper>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);