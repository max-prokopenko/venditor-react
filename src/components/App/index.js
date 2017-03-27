import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

//Dashboard
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';

//Material UI
import {Paper, Chip, Avatar, List, ListItem, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui';

//Clock
import Clock from 'react-clock'
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

//CHART
import {LineChart} from 'react-chartkick';
import CountUp from 'react-countup';

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
      activePoint: null,
      tooltipTrigger: null,
    };
    window.Highcharts = require('highcharts');
    window.Chart = require('chart.js');
  }
 
  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger,
    })
  }

  render() {
    console.log(this.state);
    
    const data = [
      {"name":"Week income", "data": {"2017-03-20": 30, "2017-03-21": 70, "2017-03-22": 130, "2017-03-23": 130, "2017-03-24": 230}},
    ];

    const { className, ...props } = this.props;
    const muiTheme = getMuiTheme({}, {
      palette: {
        primary1Color: '#005C97',
      }
    }); 
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)} >
        <div>
           <Dashboard    
            theme="skin-yellow"
            sidebarChildren={
              <Sidebar.Menu header="NAVIGATION" key="1">
                <Sidebar.Menu.Item title="DASHBOARD" href="/" />
                <Sidebar.Menu.Item title="CLIENTS" href="/" />
                <Sidebar.Menu.Item title="BILLINGS/ORDERS" href="/" />
                <Sidebar.Menu.Item title="SUPPORT" href="/" />
                <Sidebar.Menu.Item title="REPORTS" href="/" />
              </Sidebar.Menu>
            }
            navbarChildren={
              <Header.UserMenu name={"Max Prokopenko"} image={"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"} signOutAction={function() {console.log("signOutAction");}}/>
            }
            logoLg={<span><b>Venditor.io</b></span>}
          > 
            <div className="userTop">
             <Paper className="cardTop" zDepth={1}>
               <h1>Dashboard</h1>
             </Paper>
            </div>
            <div className="cards">
              <Container>
                <Row>
                  <Col md={6}>
                    <Paper className="cardMain" zDepth={1}>
                      <Container>
                        <Row>
                          <Col md={4} className="cardMainSide">
                              <h2><CountUp start={0} end={230} /> Euro</h2>
                              <p className="minHeader">WEEK INCOME</p>
                          </Col>
                          <Col md={8}>
                             <LineChart data={data} colors={["#f39c12"]} />
                          </Col>
                        </Row>
                      </Container>          
                    </Paper>
                  </Col>
                  <Col md={6}>
                    <Container>
                      <Row>
                        <Col md={6}>
                          <Paper className="card dark" zDepth={1}>
                            
                              <h1><CountUp start={0} end={10} /></h1>
                              <p className="minHeader">NEW CLIENTS</p>
                            
                          </Paper>
                        </Col>
                        <Col md={6}>
                          <Paper className="card dark" zDepth={1}>
                            <h1><CountUp start={0} end={10} /></h1>
                            <p className="minHeader">NEW CLIENTS</p>
                          </Paper>
                        </Col>
                        <Col md={6}>
                          <Paper className="card dark" zDepth={1}>
                            <h1><CountUp start={0} end={3} /></h1>
                            <p className="minHeader">OPEN BILLINGS</p>
                          </Paper>
                        </Col>
                        <Col md={6}>
                          <Paper className="card dark" zDepth={1}>
                            <h1><CountUp start={0} end={10} /></h1>
                            <p className="minHeader">NEW CLIENTS</p>
                          </Paper>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
               <Container>
                <Row>
                  <Col md={6}>
                    <Card className="cardBottom">
                        <CardHeader
                          title="New Clients"
                          subtitle="List of new contacts"
                          className="cardHeader"
                          titleColor="#fff"
                          subtitleColor="#fff"
                        />
                        <CardText className="newCompanies">
                          <List className="myClients">
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                            <ListItem primaryText="Venditor.io" />
                          </List>
                        </CardText>
                    </Card>
                  </Col>
                 <Col md={6}>
                    <Card className="cardBottom">
                        <CardHeader
                          title="Recent Billing"
                          subtitle="List of 10 latest billings"
                          className="cardHeader"
                          titleColor="#fff"
                          subtitleColor="#fff"
                        />
                        <CardText className="newCompanies">
                          <List className="myClients">
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                            <ListItem primaryText="Venditor.io" rightIcon={<span>10€</span>}/>
                          </List>
                        </CardText>
                    </Card>                  
                  </Col>
                </Row>
              </Container>
            </div>
            
                            
          </Dashboard>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);