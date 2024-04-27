// Your code here

function createEmployeeRecord(recordArray) {
    return {
      firstName: recordArray[0],
      familyName: recordArray[1],
      title: recordArray[2],
      payPerHour: recordArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }

 //....
  function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record));
  }

  //...
   function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return record;
  }

  //...
  function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return record;
  }

  //...
  function hoursWorkedOnDate(record, date) {
    const timeInEventsOnDate = record.timeInEvents.filter(
      (event) => event.date === date
    );
    const timeOutEventsOnDate = record.timeOutEvents.filter(
      (event) => event.date === date
    );
  
    if (timeInEventsOnDate.length === 0 || timeOutEventsOnDate.length === 0) {
      return 0;
    }
  
    const sortedEvents = [...timeInEventsOnDate, ...timeOutEventsOnDate].sort(
      (a, b) => a.hour - b.hour
    );
  
    let totalHours = 0;
    for (let i = 0; i < sortedEvents.length - 1; i += 2) {
      const timeInEvent = sortedEvents[i];
      const timeOutEvent = sortedEvents[i + 1];
      totalHours += (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
  
    return totalHours;
  }

  //...
  function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date);
    return hoursWorked * record.payPerHour;
  }

  //...
  function allWagesFor(record) {
    const datesWorked = new Set(record.timeInEvents.map(event => event.date));
    let totalWages = 0;
  
    for (const date of datesWorked) {
      totalWages += wagesEarnedOnDate(record, date);
    }
  
    return totalWages;
  }

  //...
  function calculatePayroll(employees) {
    let totalPayroll = 0;
  
    for (const employee of employees) {
      totalPayroll += allWagesFor(employee);
    }
  
    return totalPayroll;
  }



