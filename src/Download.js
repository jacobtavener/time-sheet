import React from "react"
import {Button} from  'react-bootstrap'
import ReactExport from "react-export-excel";


import 'bootstrap/dist/css/bootstrap.css'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data: []
    }
  }

  render(){
    return (
      <ExcelFile 
        element={<Button bg='#282c34' variant='dark' id="export">Export to Excel</Button>}
        filename={"DailyBreakdown"}
      >
        <ExcelSheet data={this.props.timesheetCodes} name="Daily Breakdown">
          <ExcelColumn label = "Timesheet Code" value="code" />
          <ExcelColumn label = "Time Exact (ms)" value="time_ms" />
          <ExcelColumn label = "Time (mins)" value="time_mins" />
          <ExcelColumn label = "Number of 15 Min chunks" value="time_fifteen" />
        </ExcelSheet>
      </ExcelFile>
    )
  }
}

export default Download