import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { addReport } from '../actions';
import { Form, Grid, GridRow, Icon, Label, Segment, Button, Dropdown } from 'semantic-ui-react'
import EXIF from "exif-js"

export class ReportForm extends Component {
  state = {
    poopGPS: {},
    inFile: "",
    poopSizeSelect: "",
    poopSize: [
      {key: 1, text: "Small", value: "S"},
      {key: 2, text: "Medium", value: "M"},
      {key: 3, text: "Large", value: "L"}
    ]
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     poopGPS: {}
  //   };

  //  this.handleChange = this.handleChange.bind(this);

  // }

  componentDidMount () {
    if (!this.props.userId){
      this.props.history.push('/login')
      return null
    } else {
        this.setState({
        
      })
    }
  }
  
  handleChange = ({
    target: {
      files: [file]
    }
  }) => {
    if (file && file.name) {
      this.setState({
        inFile: file
      })
    }
  }

  selectSize = (e, { value }) => {
    this.setState({
      poopSizeSelect: value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    const userID = this.props.userId
    const poopSelSize = this.state.poopSizeSelect
    EXIF.getData(this.state.inFile, function() {
      let exifData = EXIF.pretty(this);
      let gpsLat = EXIF.getTag(this, "GPSLatitude")
      let gpsLng = EXIF.getTag(this, "GPSLongitude")
      const latDec = gpsLat[0] + gpsLat[1]/60 + gpsLat[2]/3600
      const lngDec = (gpsLng[0] + gpsLng[1]/60 + gpsLng[2]/3600) * -1
      if (exifData) {
        const pGPS = {lat: latDec.toFixed(6), lng: lngDec.toFixed(6)}
        const REPORT_URL = 'http://localhost:3000/reports'
        const reqObj = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            poop_lat: latDec.toFixed(6),
            poop_lng: lngDec.toFixed(6),
            user_id: userID,
            poop_size: poopSelSize
          })
        }
        // post report with gps and size to repoarts path to add report 
        fetch(REPORT_URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
          console.log("where to go")
        // this.props.history.push('/reports')
    })
      } else {
        console.log("No EXIF data found in image '" + this.state.inFile.name + "'.")
      }
    })
  }

  closeForm = () => {
    // this function is added as a work around to the context issue with "this"
    // this will redirect to reports path and refresh data
    const reqObj = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3000/reports', reqObj)
      .then(resp => resp.json())
      .then(reports => {
        this.props.addReport(reports)
        this.props.history.push('/reports')
      })
  }
  render() {
    return (
      <div>
        <Navbar />
        <Grid>
          <GridRow centered>
          <Segment inverted color="olive">
          <Form onSubmit={this.handleOnSubmit} style={{width: 400}}>
          <Label inverted color='olive'>Picture File</Label>
            <Form.Field>
                <input
                  type="file"
                  name="pic-file"
                  id="file"
                  accept=".jpg, .png, .heif, .heic"
                  onChange={this.handleChange}
                />
            </Form.Field>
            <Label inverted color='olive'>Poop Size</Label>
            <Form.Field>
            <Dropdown 
              fluid
              selection
              search
              onChange={this.selectSize}
              options={this.state.poopSize}
              style={{width: 200}}
              size='medium'
              placeholder='Select Size'
          /> 
            </Form.Field>
            <Form.Field>
            <Button animated='fade' inverted color="grey" size='medium'>
              <Button.Content visible>
              <Icon name='check circle'/>
              </Button.Content>
              <Button.Content hidden>
                Submit
              </Button.Content>
            </Button>
           </Form.Field>
          </Form>
          <Button animated='fade' inverted color='grey' size='medium' onClick={this.closeForm}>
          <Button.Content visible>
              <Icon name='window close'/>
              </Button.Content>
              <Button.Content hidden>
                Exit
              </Button.Content>
            </Button>
          </Segment>
          </GridRow>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    userId: state.users.userId,
    reports: state.reports 
  }
}

export default connect(mapStateToProps, {addReport})(ReportForm)

